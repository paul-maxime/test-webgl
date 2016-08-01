'use strict';

class Transformable {
	constructor() {
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
	setSize(width, height) {
		this.width = width;
		this.height = height;
	}
	setPosition(x, y) {
		this.position[0] = x;
		this.position[1] = y;
		this.updateMatrix();
	}
	move(x, y) {
		this.position[0] += x;
		this.position[1] += y;
		this.updateMatrix();
	}
	setRotation(deg) {
		quat.identity(this.rotation);
		this.rotate(deg);
	}
	rotate(deg) {
		quat.rotateZ(this.rotation, this.rotation, deg * Math.PI / 180.0);
		this.updateMatrix();
	}
	setScale(x, y) {
		this.scale[0] = x;
		this.scale[1] = y;
		this.updateMatrix();
	}
	setOrigin(x, y) {
		this.origin[0] = x;
		this.origin[1] = y;
		this.updateMatrix();
	}
	updateMatrix() {
		mat4.fromRotationTranslationScaleOrigin(this.matrix, this.rotation, this.position, this.scale, this.origin);
	}
}
