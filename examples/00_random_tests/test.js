'use strict';

var game;
var opressed = false;
var graphics;
var sprite, sprite2, sprite3, tile;
var texture;
var input;
var clock;
var fpsUpdate = 0;
var sound;

class Game {
	constructor() {
		this.storage = new Yaje.Storage('test-game');
		if (!this.storage.foobar) {
			this.storage.foobar = 1;
		} else {
			this.storage.foobar++;
		}
		this.storage.save();
		console.log(this.storage.foobar);
	}
	start() {
		let canvas = document.getElementById('game-canvas');
		graphics = new Yaje.Graphics();
		if (graphics.initialize(canvas)) {
			input = new Yaje.Input(document, canvas);
			clock = new Yaje.Clock();
			texture = graphics.createTexture('assets/textures/sheet.png');
			sprite = graphics.createSprite(32, 32, texture);
			sprite.setColor(1.0, 0.0, 0.0, 1.0);
			sprite.setTextureCoordinates(0, 0, 0.5, 1.0);
			sprite.setScale(5.0, 5.0);
			tile = graphics.createSprite(32, 32, texture);
			tile.setTextureCoordinates(0.5, 0, 1.0, 1.0)
			requestAnimationFrame(() => this.update());
			sound = new Yaje.SoundPlayer();
			sound.register('chop', 'assets/sounds/chop.ogg', 1);
			sound.register('pot', 'assets/sounds/metalPot1.ogg', 3);
		}
	}
	update() {
		requestAnimationFrame(() => this.update());
		input.update();
		clock.update();
		fpsUpdate -= clock.deltaTime;
		if (fpsUpdate < 0) {
			$("#game-fps").text(Math.round(10 / clock.deltaTime) / 10);
			fpsUpdate = 0.1;
		}
		if (input.isKeyDown(Yaje.Keys.RIGHT_ARROW)) {
			sprite.move(100 * clock.deltaTime, 50 * clock.deltaTime);
			sprite.rotate(180 * clock.deltaTime);
		}
		if (input.isKeyDown(Yaje.Keys.DOWN_ARROW)) {
			graphics.camera.move(30 * clock.deltaTime, 10 * clock.deltaTime);
		}
		if (input.wasKeyPressed(Yaje.Keys.O)) {
			console.log('+O');
		}
		if (input.wasKeyReleased(Yaje.Keys.O)) {
			console.log('-O');
		}
		this.draw();
	}

	draw() {
		graphics.clear();
		for (let x = 0; x < 64; ++x) {
			for (let y = 0; y < 32; ++y) {
				tile.setPosition(x * 32, y * 32);
				graphics.draw(tile);
			}
		}
		graphics.draw(sprite);
		graphics.display();
	}

	resizeCanvas() {
		let canvas = document.getElementById('game-canvas');
		let width = window.innerWidth;
		let height = window.innerHeight;
		if (canvas.width != width || canvas.height != height) {
			canvas.width = width;
			canvas.height = height;
			if (graphics) {
				graphics.camera.setOrthographicProjection(0, canvas.width, 0, canvas.height);
				graphics.camera.setOrigin(canvas.width / 2, canvas.height / 2);
				graphics.setViewport(0, 0, canvas.width, canvas.height);
			}
		}
	}
}

$(function () {
	game = new Game();
	game.start();
	window.addEventListener('resize', game.resizeCanvas);
	game.resizeCanvas();
});
