'use strict';

class Input {
	constructor(element, canvas) {
		this.pressedKeys = {};
		element.addEventListener('keydown', (e) => {
			this.onKeyPressed(e.keyCode);
		});
		element.addEventListener('keyup', (e) => {
			this.onKeyReleased(e.keyCode);
		});
		element.addEventListener('blur', (e) => {
			this.onFocusLost();
		});
		canvas.oncontextmenu = (e) => {
			e.preventDefault();
		};
	}
	isKeyPressed(key) {
		return this.pressedKeys[key] === true;
	}
	onKeyPressed(key) {
		this.pressedKeys[key] = true;
	}
	onKeyReleased(key) {
		delete this.pressedKeys[key];	
	}
	onFocusLost() {
		this.pressedKeys = {};
	}
}
