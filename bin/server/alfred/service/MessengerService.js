/// <reference path="../../../common/def/node.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
            _this.messageQueue.push({ msg: 'Greetings! I\'m Alfred (I just woke up).' });
            _this.attemptSend();
            api.listen(function (err, message) {
                _this.onMessage(message);
            });
        });
    };
    MessengerService.prototype.onMessage = function (message) {
        if (message && message.body && MessengerService.APPROVED_IDS.indexOf(message.senderID) >= 0 &&
            message.body.indexOf('#alfred') !== -1) {
            this.log('Command Recieved: ' + message.body);
            var split = message.body.split(/\s+/);
            var command = split[1].toLowerCase();
            switch (command) {
                case "whatsmyip":
                    this.aEmit('whatsMyIp', message.threadID);
                    break;
                case "whoishome":
                    this.aEmit('whoIsHome', message.threadID);
                    break;
                case "chores":
                    this.aEmit('chores', message.threadID);
                    break;
                case "update":
                    this.aEmit('update', message.threadID);
                    break;
            }
        }
    };
    MessengerService.prototype.attemptSend = function () {
        var _this = this;
        if (this.api && this.messageQueue.length > 0) {
            var msg = this.messageQueue.shift();
            if (!msg.threadID) {
                for (var i = 0; i < MessengerService.APPROVED_IDS.length; i++) {
                    this.api.sendMessage(msg.msg, MessengerService.APPROVED_IDS[i]);
                }
            }
            else {
                this.api.sendMessage(msg.msg, msg.threadID);
            }
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
        service.on('sendMessage', function (msg, threadID) {
            if (msg) {
                _this.messageQueue.push({ msg: msg, threadID: threadID });
                _this.attemptSend();
            }
        });
    };
    MessengerService.EMAIL = "alfredchives@outlook.com";
    MessengerService.PASSWORD = "501012thave";
    MessengerService.THREAD_ID = "1613266892256531";
    MessengerService.APPROVED_IDS = [
        "100000178479403"
    ];
    return MessengerService;
})(Service);
module.exports = MessengerService;
