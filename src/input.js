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
	
	static get KEYS() {
		return {
			BACKSPACE   : 8,
			TAB         : 9,
			ENTER       : 13,
			SHIFT       : 16,
			CTRL        : 17,
			ALT         : 18,
			ESCAPE      : 27,
			PAGE_UP     : 33,
			PAGE_DOWN   : 34,
			END         : 35,
			HOME        : 36,
			LEFT_ARROW  : 37,
			UP_ARROW    : 38,
			RIGHT_ARROW : 39,
			DOWN_ARROW  : 40,
			INSERT      : 45,
			DELETE      : 46
		}
	}
}
