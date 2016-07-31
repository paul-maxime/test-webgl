'use strict';

var Graphics = function () {
	this.canvas = null;
	this.gl = null;
	this.shaderProgram = null;
	this.vertexPositionAttribute = null;
	this.textureCoordinatesAttribute = null;
	this.projectionMatrixUniform = null;
	this.viewMatrixUniform = null;
	this.modelMatrixUniform = null;
	this.projectionMatrix = mat4.create();
	this.cameraMatrix = mat4.create();
	this.viewMatrix = mat4.create();
	this.boundTexture = null;
	this.whitePixelTexture = null;
	this.vertexPositionBuffer = null;
	this.textureCoordinatesBuffer = null;
};

Graphics.prototype.initialize = function (canvas) {
	if (this.initializeGl(canvas) && this.initializeShaders()) {
		this.whitePixelTexture = new Texture(this.gl);
		this.whitePixelTexture.loadWhitePixel();
		this.vertexPositionBuffer = new Buffer(this.gl);
		this.textureCoordinatesBuffer = new Buffer(this.gl);
		this.textureCoordinatesBuffer.setDataFromTextureCoordinates(0.0, 0.0, 1.0, 1.0);
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		this.setViewport(0, canvas.width, 0, canvas.height);
		this.updateViewMatrix();
		return true;
	}
	return false;
};

Graphics.prototype.clear = function () {
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
};

Graphics.prototype.setViewport = function (left, right, bottom, top) {
	mat4.ortho(this.projectionMatrix, left, right, bottom, top, -100, 100);
	this.updateProjectionMatrix();
};

Graphics.prototype.draw = function (sprite) {
	this.bindTexture(sprite.texture);
	this.vertexPositionBuffer.setDataFromSpriteVertices(sprite.width, sprite.height);
	this.gl.vertexAttribPointer(this.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);
	this.textureCoordinatesBuffer.bind();
	this.gl.vertexAttribPointer(this.textureCoordinatesAttribute, 2, this.gl.FLOAT, false, 0, 0);
	this.updateModelMatrix(sprite.matrix);
	this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
};

Graphics.prototype.createTexture = function (src) {
	var texture = new Texture(this.gl);
	var image = new Image();
	var self = this;
	image.onload = function () {
		texture.loadFromImage(image);
		self.boundTexture = texture;
	};
	image.src = src;
	return texture;
};

Graphics.prototype.createSprite = function (width, height, texture) {
	var sprite = new Sprite(this.gl);
	sprite.setSize(width, height);
	sprite.texture = texture;
	sprite.setOrigin(width / 2, height / 2);
	return sprite;
};

Graphics.prototype.initializeGl = function (canvas) {
	this.canvas = canvas;
	this.gl = null;
	try {
		this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	} catch (e) {
		this.gl = null;
	}
	
	if (!this.gl) {
		console.error('Unable to initialize WebGL. Your browser may not support it.');
		return false;
	}
	return true;
};

Graphics.prototype.initializeShaders = function () {
	var vertexShader = this.createShader(this.gl.VERTEX_SHADER,
		'attribute vec3 a_vertexPosition;' +
		'attribute vec2 a_textureCoordinates;' +
		'uniform mat4 u_projectionMatrix;' +
		'uniform mat4 u_viewMatrix;' +
		'uniform mat4 u_modelMatrix;' +
		'varying highp vec2 v_textureCoordinates;' +
		'void main(void) {' +
		'	gl_Position = u_projectionMatrix * u_viewMatrix * u_modelMatrix * vec4(a_vertexPosition, 1.0);' +
		'	v_textureCoordinates = a_textureCoordinates;' +
		'}'
	);
	var fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER,
		'varying highp vec2 v_textureCoordinates;' +
		'uniform sampler2D u_sampler;' +
		'void main(void) {' +
		'	gl_FragColor = texture2D(u_sampler, v_textureCoordinates) * vec4(1.0,1.0,1.0,0.1);' +
		'}'
	);
	
	this.shaderProgram = this.gl.createProgram();
	this.gl.attachShader(this.shaderProgram, vertexShader);
	this.gl.attachShader(this.shaderProgram, fragmentShader);
	this.gl.linkProgram(this.shaderProgram);
	
	if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
		console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shader));
		return false;
	}
	
	this.gl.useProgram(this.shaderProgram);
	
	this.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, 'a_vertexPosition');
	this.gl.enableVertexAttribArray(this.vertexPositionAttribute);

	this.textureCoordinatesAttribute = this.gl.getAttribLocation(this.shaderProgram, 'a_textureCoordinates');
	this.gl.enableVertexAttribArray(this.textureCoordinatesAttribute);

	this.projectionMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, 'u_projectionMatrix');
	this.viewMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, 'u_viewMatrix');
	this.modelMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, 'u_modelMatrix');
		
	return true;
};

Graphics.prototype.createShader = function (type, source) {
	var shader = this.gl.createShader(type);
	this.gl.shaderSource(shader, source);
	this.gl.compileShader(shader);
	if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
		console.error('An error occurred compiling the shaders: ' + this.gl.getShaderInfoLog(shader));
		return null;
	}
	return shader;
};

Graphics.prototype.updateProjectionMatrix = function () {
	this.gl.uniformMatrix4fv(this.projectionMatrixUniform, false, this.projectionMatrix);	
};

Graphics.prototype.updateViewMatrix = function () {
	mat4.invert(this.viewMatrix, this.cameraMatrix);
	this.gl.uniformMatrix4fv(this.viewMatrixUniform, false, this.viewMatrix);
};

Graphics.prototype.updateModelMatrix = function (modelMatrix) {
	this.gl.uniformMatrix4fv(this.modelMatrixUniform, false, modelMatrix);
};

Graphics.prototype.bindTexture = function (texture) {
	if (texture === null) {
		texture = this.whitePixelTexture;
	}
	if (this.boundTexture !== texture && texture.initialized) {
		this.boundTexture = texture;
		texture.bind();
	}
};
