'use strict';

class Input {
	constructor(element, canvas) {
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
	}
	isKeyPressed(key) {
		return this.pressedKeys[key] === true;
	}
	setKeyPressed(key) {
		this.pressedKeys[key] = true;
	}
	setKeyReleased(key) {
		delete this.pressedKeys[key];	
	}
	setFocusLost(key) {
		this.pressedKeys = {};
	}
}
