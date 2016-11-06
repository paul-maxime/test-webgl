'use strict';

export default class Random {
	static nextBoolean() {
		return Math.random() < 0.5;
	}
	static nextDouble() {
		return Math.random();
	}
	static nextInt() {
		if (arguments.length === 1) {
			return Random.nextInt1(arguments[0]);
		} else if (arguments.length === 2) {
			return Random.nextInt2(arguments[0], arguments[1]);
		}
	}
	static nextInt1(max) {
		return Math.floor(Math.random() * max);
	}
	static nextInt2(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}
