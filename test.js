'use strict';

var graphics;
var sprite, sprite2, sprite3, tile;
var texture;
var input;
var clock;
var fpsUpdate = 0;
var batch;

function start() {
	let canvas = document.getElementById('game-canvas');
	graphics = new Graphics();
	if (graphics.initialize(canvas)) {
		graphics.camera.setOrigin(canvas.width / 2, canvas.height / 2);
		input = new Input(document, canvas);
		clock = new Clock();
		texture = graphics.createTexture('img/sheet.png');
		sprite = graphics.createSprite(32, 32, texture);
		sprite2 = graphics.createSprite(16, 32, texture);
		sprite3 = graphics.createSprite(32, 16, texture);
		sprite.setColor(1.0, 0.0, 0.0, 1.0);
		sprite2.setColor(0.0, 1.0, 0.0, 1.0);
		sprite3.setColor(0.2, 0.2, 1.0, 1.0);
		sprite.setTextureCoordinates(0, 0, 0.5, 1.0);
		sprite2.setTextureCoordinates(0, 0, 0.5, 1.0);
		sprite3.setTextureCoordinates(0, 0, 0.5, 1.0);
		tile = graphics.createSprite(32, 32, texture);
		tile.setTextureCoordinates(0.5, 0, 1.0, 1.0)
		requestAnimationFrame(update);
		batch = new SpriteBatch(graphics.gl, 2048);
	}
}

function update() {
	requestAnimationFrame(update);
	let deltaTime = clock.restart() / 1000;
	fpsUpdate -= deltaTime;
	if (fpsUpdate < 0) {
		$("#game-fps").text(Math.round(10 / deltaTime) / 10);
		fpsUpdate = 0.1;
	}
	if (input.isKeyPressed(Keys.LEFT_ARROW)) {
		sprite.move(100 * deltaTime, 50 * deltaTime);
		sprite.rotate(180 * deltaTime);
		sprite2.move(105 * deltaTime, 55 * deltaTime);
		sprite2.rotate(185 * deltaTime);
		sprite3.move(110 * deltaTime, 60 * deltaTime);
		sprite3.rotate(190 * deltaTime);
	}
	//graphics.camera.move(30 * deltaTime, 10 * deltaTime);
	draw();
}

function draw() {
	graphics.clear();
	batch.reset();
	for (let x = 0; x < 48; ++x) {
		for (let y = 0; y < 32; ++y) {
			tile.setPosition(x * 32, y * 32);
			batch.append(tile);
		}
	}
	batch.append(sprite);
	batch.append(sprite2);
	batch.append(sprite3);
	batch.draw(graphics);
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
			graphics.camera.setOrigin(canvas.width / 2, canvas.height / 2);
			graphics.setViewport(0, 0, canvas.width, canvas.height);
		}
	}
}

$(function () {
	window.addEventListener('resize', resizeCanvas);
	resizeCanvas();
	start();
});

