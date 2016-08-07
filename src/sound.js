'use strict';

class SoundManager {
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

class Sound {
	constructor(path, number) {
		this.audios = [];
		for (var i = 0; i < number; ++i) {
			var audio = new Audio(path);
			this.audios.push(audio);
		}
	}
	play() {
		for (var i = 0; i < this.audios.length; ++i) {
			if (this.audios[i].paused) {
				this.audios[i].play();
				break;
			}
		}
	}
}

module.exports = { SoundManager, Sound };
