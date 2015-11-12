/// <reference path="../../../common/def/node.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var events = require('events');
var Constant = require('../Constant');
/**
 * A Service is a encapsulated unit of functionality
 * which when composed with other services, provides the totality
 * of the Alfred functionality.
 */
var Service = (function (_super) {
    __extends(Service, _super);
    function Service() {
        _super.call(this);
        this.isDown = true;
    }
    /**
     * Shuts down the service
     */
    Service.prototype.shutdown = function () {
        this.isDown = true;
    };
    /**
     * Gets this service's string name
     * @return {string} The unique name of this service
     */
    Service.prototype.getName = function () {
        throw 'Service unnamed! Please override the getName method.';
        return 'UnNamedService';
    };
    /**
     * Called on service start up
     * @param {Service[]} peerServices [description]
     */
    Service.prototype.start = function (peerServices) {
        this.log('Starting up...');
        for (var i = 0; i < peerServices.length; i++) {
            if (peerServices[i].getName() != this.getName()) {
                this.onBindPeerService(peerServices[i]);
            }
        }
        this.isDown = false;
    };
    /**
     * Called for each peer service on startup to allow
     * binding to events, or keeping as state, those services.
     * @param {Service} service The peer service
     */
    Service.prototype.onBindPeerService = function (service) {
        // TODO: any superclass implementation?
    };
    /**
     * Asynchonously emits an event through the event queue
     * @param {string} event    The event to emit
     * @param {any[]}  ...extra The parameters of the event
     */
    Service.prototype.aEmit = function (event) {
        var _this = this;
        var extra = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            extra[_i - 1] = arguments[_i];
        }
        var args = arguments;
        this.tick(function () {
            _this.emit.apply(_this, args);
        });
    };
    /**
     * Safe way to call process.nextTick for async
     * event queue placement
     * @param {Function} fn The function to tick
     */
    Service.prototype.tick = function (fn) {
        setImmediate(function () {
            fn();
        });
    };
    /**
     * Safe setInteval function
     * @param {Function} callback The interval function
     * @param {number} time The timeout
     */
    Service.prototype.safeInterval = function (callback, time) {
        if (!this.isDown) {
            return setTimeout(callback, time);
        }
    };
    /**
     * Logs a message in a pretty way
     * @param {string} message The message to log
     */
    Service.prototype.log = function (message) {
        if (Service.LOG_WHITE_LIST.indexOf(this.getName()) == -1)
            return;
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
    };
    Service.MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    Service.LOG_WHITE_LIST = [
        Constant.SERVICE_NAMES.WHO_IS_HOME,
        Constant.SERVICE_NAMES.CHORE_ROTATION,
        Constant.SERVICE_NAMES.DAY,
        Constant.SERVICE_NAMES.MESSENGER,
        Constant.SERVICE_NAMES.UPDATE,
        Constant.SERVICE_NAMES.WHATS_MY_IP,
        Constant.SERVICE_NAMES.IOT_CODE
    ];
    return Service;
})(events.EventEmitter);
module.exports = Service;
