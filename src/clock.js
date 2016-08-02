'use strict';

class Clock {
	constructor() {
		this.lastUpdate = Date.now();
	}
	restart() {
		var now = Date.now();
		var delta = now - this.lastUpdate;
		this.lastUpdate = now;
		return delta;
	}
}
