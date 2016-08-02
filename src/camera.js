'use strict';

class Camera extends Transformable {
	constructor() {
		super();
		this.viewProjectionMatrix = mat4.create();
		this.projectionMatrix = mat4.create();
		this.viewMatrix = mat4.create();
	}
	setOrthographicProjection(left, right, top, bottom) {
		mat4.ortho(this.projectionMatrix, left, right, bottom, top, -100, 100);
		this.updateViewProjectionMatrix();
	}
	updateTransformationMatrix() {
		super.updateTransformationMatrix();
		mat4.invert(this.viewMatrix, this.transformationMatrix);
		this.updateViewProjectionMatrix();
	}
	updateViewProjectionMatrix() {
		mat4.multiply(this.viewProjectionMatrix, this.projectionMatrix, this.viewMatrix);
	}
}
