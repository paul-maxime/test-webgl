'use strict';

export default class Storage {
	constructor(keyname) {
		this.keyname = keyname;
		this.load();
	}
	load() {
		var json = localStorage.getItem(this.keyname);
		if (json) {
			var data = JSON.parse(json);
			for (let key in data) {
				this[key] = data[key];
			}
		}
	}
	save() {
		var json = JSON.stringify(this);
		localStorage.setItem(this.keyname, json);
	}
}
