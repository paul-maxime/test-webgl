'use strict';

var Sprite = function (gl) {
	this.gl = gl;
	this.width = 0;
	this.height = 0;
	this.texture = null;
	this.verticesBuffer = null;
	this.textureCoordinatesBuffer = null;
	this.matrix = mat4.create();
	this.position = vec3.create();
	this.rotation = quat.create();
	this.scale = vec3.create();
	this.origin = vec3.create();

	this.scale[0] = 1.0;
	this.scale[1] = 1.0;
	this.scale[2] = 1.0;
	this.origin[0] = 0;
	this.origin[1] = 0;
};

Sprite.prototype.setPosition = function (x, y) {
	this.position[0] = x;
	this.position[1] = y;
	this.updateMatrix();
};

Sprite.prototype.move = function (x, y) {
	this.position[0] += x;
	this.position[1] += y;
	this.updateMatrix();
};

Sprite.prototype.setRotation = function (deg) {
	quat.identity(this.rotation);
	this.rotate(deg);
};

Sprite.prototype.rotate = function (deg) {
	quat.rotateZ(this.rotation, this.rotation, deg * Math.PI / 180.0);
	this.updateMatrix();
};

Sprite.prototype.setScale = function (x, y) {
	this.scale[0] = x;
	this.scale[1] = y;
	this.updateMatrix();
}

Sprite.prototype.setOrigin = function (x, y) {
	this.origin[0] = x;
	this.origin[1] = y;
	this.updateMatrix();
}

Sprite.prototype.updateMatrix = function () {
	mat4.fromRotationTranslationScaleOrigin(this.matrix, this.rotation, this.position, this.scale, this.origin);
};
