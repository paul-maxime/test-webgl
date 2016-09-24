'use strict';

import Sprite from './sprite';

export default class SpriteSheet {
	constructor(texture, width, height) {
		this.texture = texture;
		this.width = width;
		this.height = height;
		this.spriteCoordinates = {};
	}
	register(name, x, y, width, height) {
		this.spriteCoordinates[name] = {
			x: x,
			y: y,
			width: width,
			height: height
		};
	}
	registerMany(map) {
		for (var name in map) {
			var coords = map[name];
			this.register(name, coords[0], coords[1], coords[2], coords[3]);
		}
	}
	createSprite(name) {
		let info = this.spriteCoordinates[name];
		let sprite = new Sprite(info.width, info.height, this.texture);
		sprite.setTextureCoordinates(
			info.x / this.width,
			info.y / this.height,
			(info.x + info.width) / this.width,
			(info.y + info.height) / this.height
		);
		return sprite;
	}
}
