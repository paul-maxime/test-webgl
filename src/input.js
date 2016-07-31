'use strict';

var Input = function (element, canvas) {
	this.pressedKeys = {};

	var self = this;
	element.addEventListener('keydown', function (e) {
		e = e || window.event;
		self.setKeyPressed(e.keyCode);
	});

	element.addEventListener('keyup', function (e) {
		e = e || window.event;
		self.setKeyReleased(e.keyCode);
	});

	element.addEventListener('blur', function (e) {
		self.setFocusLost();
	});
	
	canvas.oncontextmenu = function (e) {
		e.preventDefault();
	};
};

Input.prototype.isKeyPressed = function (key) {
	return this.pressedKeys[key] === true;
};

Input.prototype.setKeyPressed = function (key) {
	this.pressedKeys[key] = true;
};

Input.prototype.setKeyReleased = function (key) {
	delete this.pressedKeys[key];	
};

Input.prototype.setFocusLost = function (key) {
	this.pressedKeys = {};
};
