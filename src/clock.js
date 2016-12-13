'use strict';

export default class Clock {
/**
 * @constructor
 * Create an instance of Clock object.
 *
 * @example
 * clock = new Yaje.Clock();
 */
	constructor() {
		this.lastUpdate = window.performance.now();
		this.deltaTime = 0;
	}
/**
 * Calculate the new deltaTime.
 *
 * @returns {number} Returns the new deltaTime.
 *
 * @example
 * clock.update();
 */
	update() {
		var now = window.performance.now();
		var delta = now - this.lastUpdate;
		this.lastUpdate = now;
		this.deltaTime = delta / 1000;
		return this.deltaTime;
	}
}
