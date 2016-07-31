'use strict';

var Clock = function () {
	this.lastUpdate = Date.now();
};

Clock.prototype.restart = function () {
	var now = Date.now();
	var delta = now - this.lastUpdate;
	this.lastUpdate = now;
	return delta;
};
