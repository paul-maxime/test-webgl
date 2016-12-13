"use strict";

export default class Sound {
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
