'use strict';

class Game {
	constructor() {
		this.clock = new Yaje.Clock();
		this.graphics = new Yaje.Graphics();
		if (this.graphics.initialize(document.getElementById('game-canvas'))) {
			let texture = this.graphics.createTexture('hippo.png');
			this.sprite = this.graphics.createSprite(128, 128, texture);
		}
	}
	update() {
		requestAnimationFrame(() => this.update());
		
		// retrieve the elapsed time in seconds.
		let deltaTime = this.clock.restart() / 1000;
		
		// rotate the sprite 180 degrees per seconds.
		this.sprite.rotate(180 * deltaTime);
		
		this.draw();
	}

	draw() {
		// clear the entire screen.
		this.graphics.clear();
		
		// draw the sprite.
		this.graphics.draw(this.sprite);
		
		// finalize the frame.
		this.graphics.display();
	}
}

(function () {
	var game = new Game();
	game.update();
})();
