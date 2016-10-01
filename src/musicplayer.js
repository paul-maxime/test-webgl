'use strict';

export default class MusicPlayer {
	constructor() {
		this.musics = {};
		this.currentMusic = null;
	}
	register(name, path) {
		this.musics[name] = new Audio(path);
	}
	play(name) {
		var music = this.musics[name];
		if (this.currentMusic != music) {
			if (this.currentMusic != null) {
				this.currentMusic.pause();
				this.currentMusic.currentTime = 0;
			}
			this.currentMusic = music;
			if (music != null) {
				music.play();
				music.loop = true;
			}
		}
	}
	pause() {
		if (this.currentMusic != null) {
			this.currentMusic.pause();
		}
	}
	resume() {
		if (this.currentMusic != null) {
			this.currentMusic.play();
		}
	}
	stop() {
		this.play(null);
	}
}
