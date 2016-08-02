'use strict';

class Buffer {
	constructor(gl) {
		this.gl = gl;
		this.buffer = this.gl.createBuffer();
	}
	bind() {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);	
	}
	setData(data) {
		this.bind();
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
	}
	setDataFromSpriteVertices(width, height) {
		this.setData([
			width, height, 0.0,
			0.0, height, 0.0,
			width, 0.0, 0.0,
			0.0, 0.0, 0.0
		]);
	}
	setDataFromTextureCoordinates(startX, startY, endX, endY) {
		this.setData([
			endX, endY,
			startX, endY,
			endX, startY,
			startX, startY
		]);
	}
}
