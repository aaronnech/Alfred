import Service = require('./service/Service');
import WhoIsHomeService = require('./service/WhoIsHomeService');
import MessengerService = require('./service/MessengerService');
import ChoreRotationService = require('./service/ChoreRotationService');
import DayService = require('./service/DayService');
import UpdateService = require('./service/UpdateService');
import WhatsMyIpService = require('./service/WhatsMyIpService');
import IOTCodeService = require('./service/IOTCodeService');
import DoorService = require('./service/DoorService');

var login = require("facebook-chat-api");

/**
 * Alfred is a Chatbot for home automation tasks
 */
class Alfred {
	private services: Service[];
	
	constructor() {}
	
	/**
	 * Allocates all the services of the bot
	 */
	private allocateServices() {
		this.services = [
			// new MessengerService(),
			new WhoIsHomeService(),
			new ChoreRotationService(),
			new DayService(),
			new UpdateService(),
			new WhatsMyIpService(),
			new IOTCodeService(),
			new DoorService()
		];
	}

	/**
	 * Starts the services in the bot
	 */
	private startServices() {
		for (var i = 0; i < this.services.length; i++) {
			this.services[i].start(this.services);
		}
	}

	/**
	 * Shuts down the bot safely
	 */
	public shutdown() {
		if (this.services && this.services.length) {
			for (var i = 0; i < this.services.length; i++) {
				this.services[i].removeAllListeners();
				this.services[i].shutdown();
			}

			this.services = null;
		}
	}

	/**
	 * Reboots the bot
	 */
	public reboot() {
		this.shutdown();
		this.allocateServices();
		this.startServices();
	}
}

export = Alfred;