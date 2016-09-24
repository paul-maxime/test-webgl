'use strict';

import Sound from './sound';

export default class SoundPlayer {
	constructor() {
		this.sounds = {};
		this.isMuted = false;
	}
	register(name, path, number) {
		number = (number !== undefined) ? number : 1;
		this.sounds[name] = new Sound(path, number);
	}
	play(name) {
		if (!this.isMuted) {
			this.sounds[name].play();
		}
	}
}
