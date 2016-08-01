'use strict';

class Transformable {
	constructor () {
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
	}
}

Transformable.prototype.setSize = function (width, height) {
	this.width = width;
	this.height = height;
};

Transformable.prototype.setPosition = function (x, y) {
	this.position[0] = x;
	this.position[1] = y;
	this.updateMatrix();
};

Transformable.prototype.move = function (x, y) {
	this.position[0] += x;
	this.position[1] += y;
	this.updateMatrix();
};

Transformable.prototype.setRotation = function (deg) {
	quat.identity(this.rotation);
	this.rotate(deg);
};

Transformable.prototype.rotate = function (deg) {
	quat.rotateZ(this.rotation, this.rotation, deg * Math.PI / 180.0);
	this.updateMatrix();
};

Transformable.prototype.setScale = function (x, y) {
	this.scale[0] = x;
	this.scale[1] = y;
	this.updateMatrix();
}

Transformable.prototype.setOrigin = function (x, y) {
	this.origin[0] = x;
	this.origin[1] = y;
	this.updateMatrix();
}

Transformable.prototype.updateMatrix = function () {
	mat4.fromRotationTranslationScaleOrigin(this.matrix, this.rotation, this.position, this.scale, this.origin);
};