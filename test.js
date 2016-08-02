'use strict';

var graphics;
var sprite, sprite2, sprite3, tile;
var texture;
var input;
var clock;
var fpsUpdate = 0;

function start() {
	var canvas = document.getElementById('game-canvas');
	graphics = new Graphics();
	if (graphics.initialize(canvas)) {
		input = new Input(document, canvas);
		clock = new Clock();
		texture = graphics.createTexture('img/blob.png');
		sprite = graphics.createSprite(32, 32, texture);
		sprite2 = graphics.createSprite(16, 32, texture);
		sprite3 = graphics.createSprite(32, 16, texture);
		sprite.setColor(1.0, 0.0, 0.0, 1.0);
		sprite2.setColor(0.0, 1.0, 0.0, 1.0);
		sprite3.setColor(0.2, 0.2, 1.0, 1.0);
		sprite2.setTextureCoordinates(0.5, 0, 1, 1);
		sprite3.setTextureCoordinates(0, 0, 1, 0.5);
		tile = graphics.createSprite(6400, 4800, graphics.createTexture('img/test.png'));
		tile.setTextureCoordinates(0, 0, 180.0, 150.0)
		requestAnimationFrame(update);
	}
}

function update() {
	requestAnimationFrame(update);
	var deltaTime = clock.restart() / 1000;
	fpsUpdate -= deltaTime;
	if (fpsUpdate < 0) {
		$("#game-fps").text(1 / deltaTime);
		fpsUpdate = 0.25;
	}
	if (input.isKeyPressed(Keys.LEFT_ARROW)) {
		sprite.move(100 * deltaTime, 50 * deltaTime);
		sprite.rotate(180 * deltaTime);
		sprite2.move(105 * deltaTime, 55 * deltaTime);
		sprite2.rotate(185 * deltaTime);
		sprite3.move(110 * deltaTime, 60 * deltaTime);
		sprite3.rotate(190 * deltaTime);
	}
	if (input.isKeyPressed('J'.charCodeAt())) {
		graphics.camera.move(30 * deltaTime, 10 * deltaTime);
	}
	draw();
}

function draw() {
	graphics.clear();
	graphics.draw(tile);
	graphics.draw(sprite);
	graphics.draw(sprite2);
	graphics.draw(sprite3);
}

function resizeCanvas() {
	let canvas = document.getElementById('game-canvas');
	let width = window.innerWidth;
	let height = window.innerHeight;
	if (canvas.width != width || canvas.height != height) {
		canvas.width = width;
		canvas.height = height;
		if (graphics) {
			graphics.camera.setOrthographicProjection(0, canvas.width, 0, canvas.height);
			graphics.setViewport(0, 0, canvas.width, canvas.height);
		}
	}
}

$(function () {
	window.addEventListener('resize', resizeCanvas);
	resizeCanvas();
	start();
});

