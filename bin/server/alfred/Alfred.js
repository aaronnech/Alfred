var WhoIsHomeService = require('./service/WhoIsHomeService');
var BigBrotherService = require('./service/BigBrotherService');
var MessengerService = require('./service/MessengerService');
var ChoreRotationService = require('./service/ChoreRotationService');
var UpdateService = require('./service/UpdateService');
var WhatsMyIpService = require('./service/WhatsMyIpService');
var IOTCodeService = require('./service/IOTCodeService');
var DoorService = require('./service/DoorService');
var login = require("facebook-chat-api");
/**
 * Alfred is a Chatbot for home automation tasks
 */
var Alfred = (function () {
    function Alfred() {
    }
    /**
     * Allocates all the services of the bot
     */
    Alfred.prototype.allocateServices = function () {
        this.services = [
            new MessengerService(),
            new WhoIsHomeService(),
            new ChoreRotationService(),
            // new DayService(),
            new UpdateService(),
            new WhatsMyIpService(),
            new IOTCodeService(),
            new DoorService(),
            new BigBrotherService()
        ];
    };
    /**
     * Starts the services in the bot
     */
    Alfred.prototype.startServices = function () {
        for (var i = 0; i < this.services.length; i++) {
            this.services[i].start(this.services);
        }
    };
    /**
     * Shuts down the bot safely
     */
    Alfred.prototype.shutdown = function () {
        if (this.services && this.services.length) {
            for (var i = 0; i < this.services.length; i++) {
                this.services[i].removeAllListeners();
                this.services[i].shutdown();
            }
            this.services = null;
        }
    };
    /**
     * Reboots the bot
     */
    Alfred.prototype.reboot = function () {
        this.shutdown();
        this.allocateServices();
        this.startServices();
    };
    return Alfred;
})();
module.exports = Alfred;
