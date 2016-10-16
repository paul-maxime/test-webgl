'use strict';

import Transformable from './transformable';

export default class Sprite extends Transformable {
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
		this.collider = null;
	}
	setTextureCoordinates(startX, startY, endX, endY) {
		this.textureStartX = startX;
		this.textureStartY = startY;
		this.textureEndX = endX;
		this.textureEndY = endY;
	}
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
	intersectWith(sprite) {
		if (this.collider !== null && sprite.collider !== null) {
			return this.collider.intersectWith(sprite.collider);
		}
		return false;
	}
}
