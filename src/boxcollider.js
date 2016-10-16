'use strict';

export default class BoxCollider {
	constructor(sprite, x, y, width, height) {
		this.sprite = sprite;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	intersectWith(other) {
		let selfX1 = this.sprite.position[0] + this.x;
		let selfY1 = this.sprite.position[1] + this.y;
		let selfX2 = selfX1 + this.width;
		let selfY2 = selfY1 + this.height;
		let otherX1 = other.sprite.position[0] + other.x;
		let otherY1 = other.sprite.position[1] + other.y;
		let otherX2 = otherX1 + other.width;
		let otherY2 = otherY1 + other.height;
		return !(
			selfX2 < otherX1 ||
			selfX1 > otherX2 ||
			selfY2 < otherY1 ||
			selfY1 > otherY2
		);
	}
}