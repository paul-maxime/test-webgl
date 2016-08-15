'use strict';

class Game {
	constructor() {
		this.clock = new Yaje.Clock();
		this.graphics = new Yaje.Graphics();
		if (this.graphics.initialize(document.getElementById('game-canvas'))) {
			this.batch = new Yaje.SpriteBatch(this.graphics.gl, 512);
			let texture = this.graphics.createTexture('hippo.png');
			this.sprite = this.graphics.createSprite(294, 293, texture);
		}
	}
	update() {
		requestAnimationFrame(() => this.update());
		let deltaTime = this.clock.restart() / 1000;
		
		// rotate the sprite 180 degrees per seconds
		this.sprite.rotate(180 * deltaTime);
		
		this.draw();
	}

	draw() {
		this.graphics.clear();
		this.batch.append(this.sprite);
		this.batch.draw(this.graphics);
	}
}

(function () {
	var game = new Game();
	game.update();
})();
