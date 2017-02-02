"use strict";

/**
 * A clock that can be used to measure time.
 *
 * @class
 * @memberof Yaje
 */
export default class Clock {
	/**
	 * Creates an instance of Clock object.
	 *
	 * @example
	 * var clock = new Yaje.Clock();
	 */
	constructor() {
		/**
		 * Elapsed time between two calls to update(), in seconds.
		 * @member {number}
		 */
		this.deltaTime = 0;

		/**
		 * Current total time in milliseconds.
		 * @private
		 * @member {number}
		 */
		this.lastUpdate = window.performance.now();
	}
	/**
	 * Calculates the elapsed time since the last call to update.
	 *
	 * @returns {number} Returns the elapsed time, in seconds.
	 *
	 * @example
	 * // displays the elapsed time in seconds.
	 * console.log(clock.update());
	 * // displays the same value, but does not update.
	 * console.log(clock.deltaTime);
	 */
	update() {
		var now = window.performance.now();
		var delta = now - this.lastUpdate;
		this.lastUpdate = now;
		this.deltaTime = delta / 1000;
		return this.deltaTime;
	}
}
