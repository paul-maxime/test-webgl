'use strict';

var graphics;
var sprite, sprite2, sprite3;
var texture;
var input;
var clock;

function start() {
	var canvas = document.getElementById('glcanvas');
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
		requestAnimationFrame(update);
	}
}

function update() {
	requestAnimationFrame(update);
	var deltaTime = clock.restart() / 1000;
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
	graphics.draw(sprite);
	graphics.draw(sprite2);
	graphics.draw(sprite3);
}

$(function () {
	start();
});

