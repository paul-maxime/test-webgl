'use strict';

var Texture = function (gl) {
	this.gl = gl;
	this.texture = this.gl.createTexture();
	this.initialized = false;
	this.width = 0;
	this.height = 0;
};

Texture.prototype.bind = function () {
	this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
};

Texture.prototype.loadWhitePixel = function () {
	this.bind();
	this.initialized = true;
    var data = new Uint8Array([0xFF, 0xFF, 0xFF, 0xFF]);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
	this.width = 1;
	this.height = 1;
};

Texture.prototype.loadFromImage = function (image) {
	this.bind();
	this.initialized = true;
	this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
	this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
	this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
	this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
	this.width = image.width;
	this.height = image.height;
};
