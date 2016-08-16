'use strict';

export default class Clock {
	constructor() {
		this.lastUpdate = window.performance.now();
		this.deltaTime = 0;
	}
	update() {
		var now = window.performance.now();
		var delta = now - this.lastUpdate;
		this.lastUpdate = now;
		this.deltaTime = delta / 1000;
		return delta;
	}
}
