"use strict";

import Transformable from "./transformable";

/**
 * Class representing a camera.
 * Inherits from Transformable so it can be moved, rotated and scaled.
 *
 * @class
 * @memberof Yaje
 */
export default class Camera extends Transformable {
	/**
	 * Creates a default camera with no transformation at all (identity matrix).
	 */
	constructor() {
		super();
		this.viewProjectionMatrix = mat4.create();
		this.projectionMatrix = mat4.create();
		this.viewMatrix = mat4.create();
	}
	/**
	 * Sets the internal matrix to the specified orthographic projection.
	 * Near and far are set to -100 and 100, respectively.
	 *
	 * @param {number} left - Left coordinate of the rectangle.
	 * @param {number} right - Right coordinate of the rectangle.
	 * @param {number} top - Top coordinate of the rectangle.
	 * @param {number} bottom - Bottom coordinate of the rectangle.
	 */
	setOrthographicProjection(left, right, top, bottom) {
		mat4.ortho(this.projectionMatrix, left, right, bottom, top, -100, 100);
		this.updateViewProjectionMatrix();
	}
	/**
	 * Overrides the default behavior to automatically update the view matrix (inverted matrix).
	 */
	updateTransformationMatrix() {
		super.updateTransformationMatrix();
		mat4.invert(this.viewMatrix, this.transformationMatrix);
		this.updateViewProjectionMatrix();
	}
	/**
	 * Combines the projection matrix and view matrix into a single view-projection matrix.
	 * The result can then be accessed through the viewProjectionMatrix variable.
	 */
	updateViewProjectionMatrix() {
		mat4.multiply(this.viewProjectionMatrix, this.projectionMatrix, this.viewMatrix);
	}
}
