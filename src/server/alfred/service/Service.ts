/// <reference path="../../../common/def/node.d.ts"/>

import events = require('events');

import Constant = require('../Constant');

/**
 * A Service is a encapsulated unit of functionality
 * which when composed with other services, provides the totality
 * of the Alfred functionality.
 */
class Service extends events.EventEmitter {
	private static MONTHS : string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	private static LOG_WHITE_LIST: string[] = [
		Constant.SERVICE_NAMES.WHO_IS_HOME,
		Constant.SERVICE_NAMES.CHORE_ROTATION,
		Constant.SERVICE_NAMES.DAY,
		Constant.SERVICE_NAMES.MESSENGER,
		Constant.SERVICE_NAMES.UPDATE,
		Constant.SERVICE_NAMES.WHATS_MY_IP,
		Constant.SERVICE_NAMES.IOT_CODE,
		Constant.SERVICE_NAMES.DOOR
	];

	private isDown: boolean;


	constructor() {
		super();
		this.isDown = true;
	}

	/**
	 * Shuts down the service
	 */
	public shutdown() {
		this.isDown = true;
	}

	/**
	 * Gets this service's string name
	 * @return {string} The unique name of this service
	 */
	public getName() : string {
		throw 'Service unnamed! Please override the getName method.';
	}

	/**
	 * Called on service start up
	 * @param {Service[]} peerServices [description]
	 */
	public start(peerServices : Service[]) {
		this.log('Starting up...');
		for (var i = 0; i < peerServices.length; i++) {
			if (peerServices[i].getName() != this.getName()) {
				this.onBindPeerService(peerServices[i]);
			}
		}
		this.isDown = false;
	}

	/**
	 * Called for each peer service on startup to allow
	 * binding to events, or keeping as state, those services.
	 * @param {Service} service The peer service
	 */
	protected onBindPeerService(service : Service) {
		// TODO: any superclass implementation?
	}

	/**
	 * Asynchonously emits an event through the event queue
	 * @param {string} event    The event to emit
	 * @param {any[]}  ...extra The parameters of the event
	 */
	protected aEmit(event : string, ...extra: any[]) {
		var args = arguments;

		this.tick(() => {
			this.emit.apply(this, args);
		});
	}

	/**
	 * Safe way to call process.nextTick for async
	 * event queue placement
	 * @param {Function} fn The function to tick
	 */
	protected tick(fn : Function) {
		setImmediate(() => {
			fn();
		});
	}

	/**
	 * Safe setInteval function
	 * @param {Function} callback The interval function
	 * @param {number} time The timeout
	 */
	protected safeInterval(callback : Function, time : number) {
		if (!this.isDown) {
			return setTimeout(callback, time);
		}
	}

	/**
	 * Logs a message in a pretty way
	 * @param {string} message The message to log
	 */
	protected log(message : string) {
		if (Service.LOG_WHITE_LIST.indexOf(this.getName()) == -1) return;

		var timeStamp = new Date();

		var month = Service.MONTHS[timeStamp.getMonth()];
		var day = timeStamp.getDate();

		var hour = '' + timeStamp.getHours();
		hour = hour.length > 1 ? hour : '0' + hour;

		var minute = '' + timeStamp.getMinutes();
		minute = minute.length > 1 ? minute : '0' + minute;

		var second = '' + timeStamp.getSeconds();
		second = second.length > 1 ? second : '0' + second;

		var result = day + ' ' + month + ' ' + hour + ':' + minute + ':' + second +
			   		 ' - ' + this.getName() + ' >>> ' + message;

		console.log(result);
	}
}

export = Service;
