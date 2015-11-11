/// <reference path="../../../common/def/node.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Service = require('./Service');
var Constant = require('../Constant');
var login = require("facebook-chat-api");
var MessengerService = (function (_super) {
    __extends(MessengerService, _super);
    function MessengerService() {
        _super.call(this);
    }
    MessengerService.prototype.getName = function () {
        return Constant.SERVICE_NAMES.MESSENGER;
    };
    MessengerService.prototype.start = function (peerServices) {
        var _this = this;
        _super.prototype.start.call(this, peerServices);
        this.messageQueue = [];
        login({
            email: MessengerService.EMAIL,
            password: MessengerService.PASSWORD,
            logLevel: 'silent'
        }, function (err, api) {
            if (err)
                return console.error(err);
            _this.api = api;
            _this.messageQueue.push('Greetings! I\'m Alfred (I just woke up).');
            _this.attemptSend();
            api.listen(function (err, message) {
                _this.onMessage(message);
            });
        });
    };
    MessengerService.prototype.onMessage = function (message) {
        if (message && message.body && "" + message.thread_id === MessengerService.THREAD_ID &&
            message.body.indexOf('#alfred') !== -1) {
            this.log('Command Recieved: ' + message.body);
            var split = message.body.split(/\s+/);
            var command = split[1].toLowerCase();
            switch (command) {
                case "whoishome":
                    this.aEmit('whoIsHome');
                    break;
                case "chores":
                    this.aEmit('chores');
                    break;
                case "update":
                    this.aEmit('update');
                    break;
            }
        }
    };
    MessengerService.prototype.attemptSend = function () {
        var _this = this;
        if (this.api && this.messageQueue.length > 0) {
            var msg = this.messageQueue.shift();
            this.api.sendMessage(msg, MessengerService.THREAD_ID);
            if (this.messageQueue.length > 0) {
                this.tick(function () {
                    _this.attemptSend();
                });
            }
        }
        else {
            setTimeout(function () {
                _this.attemptSend();
            }, 100);
        }
    };
    MessengerService.prototype.onBindPeerService = function (service) {
        var _this = this;
        service.on('sendMessage', function (msg) {
            if (msg) {
                _this.messageQueue.push(msg);
                _this.attemptSend();
            }
        });
    };
    MessengerService.EMAIL = "alfredchives@outlook.com";
    MessengerService.PASSWORD = "501012thave";
    MessengerService.THREAD_ID = "1613266892256531";
    return MessengerService;
})(Service);
module.exports = MessengerService;
