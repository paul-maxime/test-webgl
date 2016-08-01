'use strict';

class Sprite extends Transformable {
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
};
