'use strict';

var Buffer = function (gl) {
	this.gl = gl;
	this.buffer = this.gl.createBuffer();
};

Buffer.prototype.bind = function () {
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);	
};

Buffer.prototype.setData = function (data) {
	this.bind();
	this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
};

Buffer.prototype.setDataFromSpriteVertices = function (width, height) {
	this.setData([
		width, height, 0.0,
		0.0, height, 0.0,
		width, 0.0, 0.0,
		0.0, 0.0, 0.0
	]);
};

Buffer.prototype.setDataFromTextureCoordinates = function (startX, startY, endX, endY) {
	this.setData([
		endX, endY,
		startX, endY,
		endX, startY,
		startX, startY
	]);
};
