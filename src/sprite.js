'use strict';

import Transformable from './transformable';

export default class Sprite extends Transformable {
/**
 * @constructor
 * Create an instance of Sprite object.
 * @param {number} width - The width of the sprite.
 * @param {number} height - The height of the sprite.
 * @param {Texture} texture - The name of the sprite.
 *
 * @example
 * sprite = new Yaje.Sprite(32,32, texture);
 */
	constructor(width, height, texture) {
		super();
		this.width = width;
		this.height = height;
		this.texture = texture;
		this.textureStartX = 0;
		this.textureStartY = 0;
		this.textureEndX = 1.0;
		this.textureEndY = 1.0;
		this.color = vec4.create();
		this.setColor(1.0, 1.0, 1.0, 1.0);
		this.vertices = [
			vec3.create(),
			vec3.create(),
			vec3.create(),
			vec3.create()
		];
		this.areVerticesDirty = true;
		this.setOrigin(width / 2, height / 2);
	}
/**
 * Change sprite size.
 * @param {number} width - The width of the sprite.
 * @param {number} height - The height of the sprite.
 *
 * @example
 * sprite.setSize(64,64);
 */
	setSize(width, height) {
		this.width = width;
		this.height = height;
		this.areVerticesDirty = true;
	}
/**
 * @private
 *
 * Set the coordinates of the sprite in the texture.
 * @param {number} startX - The start point of the sprite on x-axis.
 * @param {number} startY - The start point of the sprite on y-axis.
 * @param {number} endX - The end point of the sprite on x-axis.
 * @param {number} endY - The end point of the sprite on y-axis.
 */
	setTextureCoordinates(startX, startY, endX, endY) {
		this.textureStartX = startX;
		this.textureStartY = startY;
		this.textureEndX = endX;
		this.textureEndY = endY;
	}
/**
 * Change sprite color.
 * @param {number} r - Red color.
 * @param {number} g - Green color.
 * @param {number} b - Blue color.
 * @param {number} a - Alpha color.
 *
 * @example
 * sprite.setColor(1,1,1,1);
 */
	setColor(r, g, b, a) {
		this.color[0] = r;
		this.color[1] = g;
		this.color[2] = b;
		this.color[3] = a;
	}
	
	updateTransformationMatrix() {
		super.updateTransformationMatrix();
		this.areVerticesDirty = true;
	}
	
	updateVertices() {
		vec3.set(this.vertices[0], 0, 0, 0);
		vec3.set(this.vertices[1], 0, this.height, 0);
		vec3.set(this.vertices[2], this.width, 0, 0);
		vec3.set(this.vertices[3], this.width, this.height, 0);
		for (let i = 0; i < 4; ++i) {
			vec3.transformMat4(this.vertices[i], this.vertices[i], this.transformationMatrix);
		}
		this.areVerticesDirty = false;
	}
}
