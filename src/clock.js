'use strict';

export default class Clock {
	constructor() {
		this.lastUpdate = window.performance.now();
	}
	restart() {
		var now = window.performance.now();
		var delta = now - this.lastUpdate;
		this.lastUpdate = now;
		return delta;
	}
}
