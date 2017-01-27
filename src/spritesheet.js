"use strict";

import Sprite from "./sprite";

export default class SpriteSheet {
	/**
	 * Creates an instance of the SpriteSheet object.
	 *
	 * @param {Texture} texture - The name of the sprite.
	 * @param {number} width - The width of the texture.
	 * @param {number} height - The height of the texture.
	 *
	 * @example
	 * texture = graphics.createTexture('assets/spritesheet.png');
	 * spriteSheet = new Yaje.SpriteSheet(texture, 128, 128);
	 */
	constructor(texture, width, height) {
		/**
		 * The texture used by this spritesheet.
		 * @member {Texture}
		 */
		this.texture = texture;

		/**
		 * Total width of the texture.
		 * @member {number}
		 */
		this.width = width;

		/**
		 * Total height of the texture.
		 * @member {number}
		 */
		this.height = height;

		/**
		 * @private
		 * A map of all known sprite coordinates.
		 * @member {map}
		 */
		this.spriteCoordinates = {};
	}

	/**
	 * Associates a sprite name with its rectangle.
	 *
	 * @param {string} name - The name of the sprite.
	 * @param {number} x - The x-position of the sprite in the texture.
	 * @param {number} y - The y-position of the sprite in the texture.
	 * @param {number} width - The width of the sprite.
	 * @param {number} height - The height of the sprite.
	 *
	 * @example
	 * spriteSheet.register("mySprite",0,0,32,32);
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
	 * Associates several sprite names with their rectangles.
	 * This is identical to calling register() for each element.
	 *
	 * @param {object} map - The sprites map.
	 *
	 * @example
	 * this.spritesheet.registerMany({
	 *   "Front" : [0, 0, 32, 32],
	 *   "Left" : [0, 32, 32, 32],
	 *   "Right" : [0, 64, 32, 32],
	 *   "Back" : [0, 96, 32, 32]
	 *});
	 */
	registerMany(map) {
		for (var name in map) {
			var coords = map[name];
			this.register(name, coords[0], coords[1], coords[2], coords[3]);
		}
	}

	/**
	 * Creates a new sprite initialized with the correct texture and texture coordinates.
	 *
	 * @param {string} name - The name of the sprite, as specified in register() or registerMany().
	 *
	 * @returns {Sprite} Returns the newly created sprite.
	 *
	 * @example
	 * sprite = spriteSheet.createSprite("spriteName");
	 */
	createSprite(name) {
		let info = this.spriteCoordinates[name];
		let sprite = new Sprite(info.width, info.height, this.texture);
		this.setSpriteTextureFromCoordinates(sprite, info);
		return sprite;
	}

	/**
	 * Changes the texture coordinates of a sprite with the specified texture coordinates.
	 *
	 * @param {Sprite} sprite - The sprite which will be changed.
	 * @param {string} name - The name of the sprite, as specified in register() or registerMany().
	 *
	 * @example
	 * spriteShhet.setSpriteTexture(sprite, "spriteName");
	 */
	setSpriteTexture(sprite, name) {
		let info = this.spriteCoordinates[name];
		this.setSpriteTextureFromCoordinates(sprite, info);
	}

	/**
	 * @private
	 *
	 * Sets the texture coordinates of the specified sprite,
	 * after converting them into the [0-1] range.
	 *
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
