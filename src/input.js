'use strict';

export default class Input {
	constructor(element, canvas) {
		this.pressedKeys = {};
		this.framePressedKeys = {};
		this.previousPressedKeys = {};
		element.addEventListener('keydown', (e) => {
			this.pressedKeys[e.keyCode] = true;
		});
		element.addEventListener('keyup', (e) => {
			this.pressedKeys[e.keyCode] = false;
		});
		element.addEventListener('blur', (e) => {
			this.pressedKeys = {};
		});
		canvas.oncontextmenu = (e) => {
			e.preventDefault();
		};
	}
	update() {
		for (var key in this.framePressedKeys) {
			this.previousPressedKeys[key] = this.framePressedKeys[key];
		}
		for (var key in this.pressedKeys) {
			this.framePressedKeys[key] = this.pressedKeys[key];
		}
	}
	wasKeyPressed(key) {
		return this.framePressedKeys[key] && !this.previousPressedKeys[key];
	}
	wasKeyReleased(key) {
		return !this.framePressedKeys[key] && this.previousPressedKeys[key];
	}
	wasAnyKeyReleased() {
		for (var key in this.previousPressedKeys) {
			if (!this.framePressedKeys[key] && this.previousPressedKeys[key]) {
				return true;
			}
		}
		return false;
	}
	isKeyDown(key) {
		return this.pressedKeys[key] === true;
	}
}
