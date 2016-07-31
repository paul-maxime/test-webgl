'use strict';

var graphics;
var sprite, sprite2;
var texture;
var input;
var clock;

function start() {
	var canvas = document.getElementById('glcanvas');
	graphics = new Graphics();
	if (graphics.initialize(canvas)) {
		input = new Input(document, canvas);
		clock = new Clock();
		texture = graphics.createTexture('blob.png');
		sprite = graphics.createSprite(32, 32, texture);
		sprite2 = graphics.createSprite(32, 32, texture);
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
	}
	draw();
}

function draw() {
	graphics.clear();
	graphics.draw(sprite);
	graphics.draw(sprite2);
	
}

$(function () {
	start();
});

