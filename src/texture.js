"use strict";

/**
 * Encapsulates a WebGL texture.
 *
 * @class
 * @memberof Yaje
 */
export default class Texture {
	/**
	 * Creates the internal WebGL texture.
	 * @param {WebGLRenderingContext} gl - Current WebGL context.
	 */
	constructor(gl) {
		this.gl = gl;
		this.texture = this.gl.createTexture();
		this.initialized = false;
		this.width = 0;
		this.height = 0;
	}
	/**
	 * Binds the texture if its different than the current texture.
	 */
	bind() {
		if (this.gl.boundTexture !== this) {
			this.gl.boundTexture = this;
			this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		}
	}
	/**
	 * Creates a 1x1 texture containing a single white pixel (#FFFFFFFF).
	 */
	loadWhitePixel() {
		this.bind();
		this.initialized = true;
		var data = new Uint8Array([0xFF, 0xFF, 0xFF, 0xFF]);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		this.width = 1;
		this.height = 1;
	}
	/**
	 * Loads the specified image into the internal texture.
	 * @param {Image} image - Image to load.
	 */
	loadFromImage(image) {
		this.bind();
		this.initialized = true;
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		this.width = image.width;
		this.height = image.height;
	}
}
