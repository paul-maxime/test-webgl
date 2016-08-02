'use strict';

class Buffer {
	constructor(gl) {
		this.gl = gl;
		this.buffer = this.gl.createBuffer();
	}
	bind() {
		if (this.gl.boundBuffer !== this) {
			this.gl.boundBuffer = this;
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);	
		}
	}
	setFloat32Array(data) {
		this.bind();
		this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
	}
	setArray(data) {
		this.setFloat32Array(new Float32Array(data));
	}
	setDataFromSpriteVertices(width, height) {
		this.setArray([
			width, height, 0.0,
			0.0, height, 0.0,
			width, 0.0, 0.0,
			0.0, 0.0, 0.0
		]);
	}
	setDataFromTextureCoordinates(startX, startY, endX, endY) {
		this.setArray([
			endX, endY,
			startX, endY,
			endX, startY,
			startX, startY
		]);
	}
	setDataFromColor(r, g, b, a) {
		this.setArray([
			r, g, b, a,
			r, g, b, a,
			r, g, b, a,
			r, g, b, a
		]);
	}
}
