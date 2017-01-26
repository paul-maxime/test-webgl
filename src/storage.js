"use strict";

/**
 * This class is used to store data in the browser's LocalStorage.
 *
 * Instantiate it, store information in the Storage object then call the load() method.
 *
 * @class
 * @memberof Yaje
 */
export default class Storage {
	/**
	 * Loads the object specified by its key from the LocalStorage.
	 *
	 * @param {string} keyname - Object key, should be unique to your application.
	 */
	constructor(keyname) {
		this.keyname = keyname;
		this.load();
	}
	/**
	 * Reloads the object from the LocalStorage.
	 * You do not have to call this method, the constructor already calls it.
	 */
	load() {
		var json = localStorage.getItem(this.keyname);
		if (json) {
			var data = JSON.parse(json);
			for (let key in data) {
				this[key] = data[key];
			}
		}
	}
	/**
	 * Saves the object to the LocalStorage.
	 */
	save() {
		var json = JSON.stringify(this);
		localStorage.setItem(this.keyname, json);
	}
}
