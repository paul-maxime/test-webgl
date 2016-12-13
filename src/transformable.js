"use strict";

export default class Transformable {
	constructor() {
		this.transformationMatrix = mat4.create();
		this.position = vec3.create();
		this.positionRounded = vec3.create();
		this.rotation = quat.create();
		this.scale = vec3.create();
		this.origin = vec3.create();
		this.scale[0] = 1.0;
		this.scale[1] = 1.0;
		this.scale[2] = 1.0;
		this.origin[0] = 0;
		this.origin[1] = 0;
	}
	setPosition(x, y) {
		this.position[0] = x;
		this.position[1] = y;
		vec3.round(this.positionRounded, this.position);
		this.updateTransformationMatrix();
	}
	move(x, y) {
		this.position[0] += x;
		this.position[1] += y;
		vec3.round(this.positionRounded, this.position);
		this.updateTransformationMatrix();
	}
	setRotation(deg) {
		quat.identity(this.rotation);
		this.rotate(deg);
	}
	rotate(deg) {
		quat.rotateZ(this.rotation, this.rotation, deg * Math.PI / 180.0);
		this.updateTransformationMatrix();
	}
	setScale(x, y) {
		this.scale[0] = x;
		this.scale[1] = y;
		this.updateTransformationMatrix();
	}
	setOrigin(x, y) {
		this.origin[0] = x;
		this.origin[1] = y;
		this.updateTransformationMatrix();
	}
	updateTransformationMatrix() {
		mat4.fromRotationTranslationScaleOrigin(this.transformationMatrix, this.rotation, this.positionRounded, this.scale, this.origin);
	}
}
