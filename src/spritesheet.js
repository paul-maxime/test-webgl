'use strict';

import Sprite from './sprite';

/**
 * @constructor
 * Create an instance of SpriteSheet object.
 * @param {Texture} texture - The name of the sprite.
 * @param {number} width - The width of the texture.
 *
 * @example
 * spritesheet = new Yaje.SpriteSheet(texture, 128, 128);
 */
export default class SpriteSheet {
	constructor(texture, width, height) {
		this.texture = texture;
		this.width = width;
		this.height = height;
		this.spriteCoordinates = {};
	}
/**
 * Associate one spriteName with its rectangle.
 * @param {string} name - The name of the sprite.
 * @param {number} x - The x-position of the sprite in the texture.
 * @param {number} y - The y-position of the sprite in the texture.
 * @param {number} width - The width of the sprite.
 * @param {number} height - The height of the sprite.
 *
 * @example
 * SpriteSheet.register('mySprite',0,0,32,32);
 */
	register(name, x, y, width, height) {
		this.spriteCoordinates[name] = {
			x: x,
			y: y,
			width: width,
			height: height
		};
	}
/**
 * Associate several spritesNames with their rectangle on spritesheet texture.
 * @param {object} map - The sprites map.
 *
 * @example
 * this.spritesheet.registerMany({
 *			"Front" : [0, 0, 32, 32],
 *			"Left" : [0, 32, 32, 32],
 *			"Right" : [0, 64, 32, 32],
 *			"Back" : [0, 96, 32, 32]
 *		});
 */
	registerMany(map) {
		for (var name in map) {
			var coords = map[name];
			this.register(name, coords[0], coords[1], coords[2], coords[3]);
		}
	}
/**
 * Get sprite from texture with spriteName.
 * @param {string} name - The name of the sprite.
 *
 * @returns {Sprite} Returns the sprite of the spriteName.
 *
 * @example
 * sprite = spritesheet.createSprite('spriteName');
 */
	createSprite(name) {
		let info = this.spriteCoordinates[name];
		let sprite = new Sprite(info.width, info.height, this.texture);
		this.setSpriteTextureFromCoordinates(sprite, info);
		return sprite;
	}
/**
 * Change sprite of an element with new spriteName.
 * @param {Sprite} sprite - The sprite which will be changed.
 * @param {string} name - The name of the sprite.
 *
 * @example
 * spritesheet.setSpriteTexture(sprite, 'spriteName');
 */
	setSpriteTexture(sprite, name) {
		let info = this.spriteCoordinates[name];
		this.setSpriteTextureFromCoordinates(sprite, info);
	}
/**
 * @private
 *
 * Change sprite of an element width new sprite coordinates.
 * @param {Sprite} sprite - The sprite which will be changed.
 * @param {object} info - The coordinates of the new sprite in the texture.
 */
	setSpriteTextureFromCoordinates(sprite, info) {
		sprite.setTextureCoordinates(
			info.x / this.width,
			info.y / this.height,
			(info.x + info.width) / this.width,
			(info.y + info.height) / this.height
		);
	}
}
