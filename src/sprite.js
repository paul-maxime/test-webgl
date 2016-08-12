'use strict';

var Transformable = require('./transformable');

export default class Sprite extends Transformable {
	constructor() {
		super();
		this.width = 0;
		this.height = 0;
		this.texture = null;
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
}
