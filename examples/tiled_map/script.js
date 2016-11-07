'use strict';

class Game {
	constructor() {
		this.clock = new Yaje.Clock();
		this.graphics = new Yaje.Graphics();
		if (this.graphics.initialize(document.getElementById('game-canvas'))) {
			// load the map from the json specified in 'map.js'.
			this.map = new Yaje.TiledMap(this.graphics, SampleMap);
			
			// register the texture 'sheet.png'.
			this.map.registerTexture('sheet.png', this.graphics.createTexture('sheet.png'));
		}
	}
	update() {
		requestAnimationFrame(() => this.update());
		
		// update the clock to retrieve the elapsed time in seconds.
		this.clock.update();

		// update the map (needed for animations).
		this.map.update(this.clock.deltaTime);
		
		this.draw();
	}

	draw() {
		// clear the entire screen.
		this.graphics.clear();
		
		// draw the map.
		this.map.draw();
		
		// finalize the frame.
		this.graphics.display();
	}
}

(function () {
	var game = new Game();
	game.update();
})();
