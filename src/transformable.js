"use strict";

/**
 * Abstract class for all transformable objects (sprite, camera).
 *
 * @class
 * @memberof Yaje
 */
export default class Transformable {
	/**
	 * Initializes the Transformable object and the internal matrix.
	 */
	constructor() {
		/**
		 * Output matrix used to apply the transformation.
		 * @member {mat4}
		 */
		this.transformationMatrix = mat4.create();
		
		/**
		 * Current position of the object.
		 * @member {vec3}
		 */
		this.position = vec3.create();
		
		/**
		 * Current rounded position of the object. Only used internally.
		 * @private
		 * @member {vec3}
		 */
		this.positionRounded = vec3.create();
		
		/**
		 * Current rotation of the object.
		 * @member {quat}
		 */
		this.rotation = quat.create();
		
		/**
		 * Current scale of the object.
		 * @member {vec3}
		 */
		this.scale = vec3.create();
		
		/**
		 * Current origin of the object.
		 * @member {vec3}
		 */
		this.origin = vec3.create();
		
		this.scale[0] = 1.0;
		this.scale[1] = 1.0;
		this.scale[2] = 1.0;
		this.origin[0] = 0;
		this.origin[1] = 0;
	}
	/**
	 * Sets the object position to the specified coordinates.
	 *
	 * @param {number} x - X coordinate.
	 * @param {number} y - Y coordinate.
	 */
	setPosition(x, y) {
		this.position[0] = x;
		this.position[1] = y;
		vec3.round(this.positionRounded, this.position);
		this.updateTransformationMatrix();
	}
	/**
	 * Adds the specified coordinates to the object position.
	 *
	 * @param {number} x - X coordinate.
	 * @param {number} y - Y coordinate.
	 */
	move(x, y) {
		this.position[0] += x;
		this.position[1] += y;
		vec3.round(this.positionRounded, this.position);
		this.updateTransformationMatrix();
	}
	/**
	 * Sets the object rotation to the specified angle in degrees.
	 *
	 * @param {number} deg - Angle in degrees.
	 */
	setRotation(deg) {
		quat.identity(this.rotation);
		this.rotate(deg);
	}
	/**
	 * Adds the specified angle to the object rotation.
	 *
	 * @param {number} deg - Angle in degrees.
	 */
	rotate(deg) {
		quat.rotateZ(this.rotation, this.rotation, deg * Math.PI / 180.0);
		this.updateTransformationMatrix();
	}
	/**
	 * Sets the object scale.
	 *
	 * @param {number} x - X scale.
	 * @param {number} y - Y scale.
	 */
	setScale(x, y) {
		this.scale[0] = x;
		this.scale[1] = y;
		this.updateTransformationMatrix();
	}
	/**
	 * Sets the object origin.
	 * The origin is the center used, for instance, when displaying or rotating the object.
	 *
	 * @param {number} x - X coordinate of the origin.
	 * @param {number} y - Y coordinate of the origin.
	 */
	setOrigin(x, y) {
		this.origin[0] = x;
		this.origin[1] = y;
		this.updateTransformationMatrix();
	}
	/**
	 * Updates the internal matrix according to the position, rotation, scale and origin.
	 */
	updateTransformationMatrix() {
		mat4.fromRotationTranslationScaleOrigin(this.transformationMatrix, this.rotation, this.positionRounded, this.scale, this.origin);
	}
}
