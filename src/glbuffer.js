'use strict';

export default class GLBuffer {
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
}
