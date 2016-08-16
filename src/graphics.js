'use strict';

import Buffer from './glbuffer';
import Camera from './camera';
import Sprite from './sprite';
import Texture from './texture';
import SpriteBatch from './spritebatch';

export default class Graphics {
	constructor () {
		this.canvas = null;
		this.gl = null;
		this.shaderProgram = null;
		this.camera = new Camera();

		this.vertexPositionAttribute = null;
		this.vertexPositionBuffer = null;
		this.vertexColorAttribute = null;
		this.vertexColorBuffer = null;
		this.textureCoordinatesAttribute = null;
		this.textureCoordinatesBuffer = null;

		this.viewProjectionMatrixUniform = null;
		this.viewProjectionMatrix = mat4.create();

		this.whitePixelTexture = null;
		this.defaultSpriteBatch = null;
	}
	initialize(canvas) {
		if (this.initializeGl(canvas) && this.initializeShaders()) {
			this.whitePixelTexture = new Texture(this.gl);
			this.whitePixelTexture.loadWhitePixel();
			this.vertexPositionBuffer = new Buffer(this.gl);
			this.vertexColorBuffer = new Buffer(this.gl);
			this.textureCoordinatesBuffer = new Buffer(this.gl);
			this.gl.enable(this.gl.BLEND);
			this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
			this.camera.setOrthographicProjection(0, canvas.width, 0, canvas.height);
			this.camera.setOrigin(canvas.width / 2, canvas.height / 2);
			this.defaultSpriteBatch = new SpriteBatch(this.gl, 256);
			return true;
		}
		return false;
	}
	setViewport(x, y, width, height) {
		this.gl.viewport(x, y, width, height);
	}
	clear() {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	}
	createTexture(src) {
		var texture = new Texture(this.gl);
		var image = new Image();
		var self = this;
		image.onload = function () {
			texture.loadFromImage(image);
			self.boundTexture = texture;
		};
		image.src = src;
		return texture;
	}
	createSprite(width, height, texture) {
		var sprite = new Sprite(this.gl);
		sprite.setSize(width, height);
		if (texture !== undefined && texture !== null) {
			sprite.texture = texture;
		} else {
			sprite.texture = this.whitePixelTexture;
		}
		sprite.setOrigin(width / 2, height / 2);
		return sprite;
	}
	initializeGl(canvas) {
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
	}
	initializeShaders() {
		var vertexShader = this.createShader(this.gl.VERTEX_SHADER,
			'attribute vec3 a_vertexPosition;' +
			'attribute vec4 a_vertexColor;' +
			'attribute vec2 a_textureCoordinates;' +
			'uniform mat4 u_viewProjectionMatrix;' +
			'varying highp vec2 v_textureCoordinates;' +
			'varying lowp vec4 v_color;' +
			'void main(void) {' +
			'	gl_Position = u_viewProjectionMatrix * vec4(a_vertexPosition, 1.0);' +
			'	v_color = a_vertexColor;' +
			'	v_textureCoordinates = a_textureCoordinates;' +
			'}'
		);
		var fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER,
			'varying highp vec2 v_textureCoordinates;' +
			'varying lowp vec4 v_color;' +
			'uniform sampler2D u_sampler;' +
			'void main(void) {' +
			'	gl_FragColor = texture2D(u_sampler, v_textureCoordinates) * v_color;' +
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

		this.vertexColorAttribute = this.gl.getAttribLocation(this.shaderProgram, 'a_vertexColor');
		this.gl.enableVertexAttribArray(this.vertexColorAttribute);

		this.textureCoordinatesAttribute = this.gl.getAttribLocation(this.shaderProgram, 'a_textureCoordinates');
		this.gl.enableVertexAttribArray(this.textureCoordinatesAttribute);

		this.viewProjectionMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, 'u_viewProjectionMatrix');

		return true;
	}
	createShader(type, source) {
		var shader = this.gl.createShader(type);
		this.gl.shaderSource(shader, source);
		this.gl.compileShader(shader);
		if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
			console.error('An error occurred compiling the shaders: ' + this.gl.getShaderInfoLog(shader));
			return null;
		}
		return shader;
	}
	bindTexture(texture) {
		if (texture === null) {
			texture = this.whitePixelTexture;
		}
		if (texture.initialized) {
			texture.bind();
		}
	}
	draw(sprite) {
		this.defaultSpriteBatch.append(sprite);
		if (this.defaultSpriteBatch.size === this.defaultSpriteBatch.capacity) {
			this.display();
		}
	}
	display() {
		this.defaultSpriteBatch.draw(this);
	}
}
