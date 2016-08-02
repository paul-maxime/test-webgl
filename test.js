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
		tile = graphics.createSprite(640, 480, graphics.createTexture('img/test.png'));
		tile.setTextureCoordinates(0, 0, 18.0, 15.0)
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
	if (input.isKeyPressed(37)) {
		sprite.move(100 * deltaTime, 50 * deltaTime);
		sprite.rotate(180 * deltaTime);
		sprite2.move(105 * deltaTime, 55 * deltaTime);
		sprite2.rotate(185 * deltaTime);
		sprite3.move(110 * deltaTime, 60 * deltaTime);
		sprite3.rotate(190 * deltaTime);
	}
	draw();
}

function draw() {
	graphics.clear();
	//for (var x = 0; x < 20; ++x) {
	//	for (var y = 0; y < 15; ++y) {
	//		tile.setPosition(x * 32, y * 32);
			graphics.draw(tile);
	//	}
	//}
	graphics.draw(sprite);
	graphics.draw(sprite2);
	graphics.draw(sprite3);
}

$(function () {
	start();
});

