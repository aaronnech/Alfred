/// <reference path="../../../common/def/node.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Service = require('./Service');
var Constant = require('../Constant');
var login = require("facebook-chat-api");
var http = require('http');
var util = require('util');
var exec = require('child_process').exec;
var WhoIsHomeService = (function (_super) {
    __extends(WhoIsHomeService, _super);
    function WhoIsHomeService() {
        _super.call(this);
    }
    WhoIsHomeService.prototype.getName = function () {
        return Constant.SERVICE_NAMES.WHO_IS_HOME;
    };
    WhoIsHomeService.prototype.onBindPeerService = function (service) {
        var _this = this;
        service.on('whoIsHome', function (threadID) {
            _this.getMACs(function (macs) {
                macs = macs.map(function (mac) {
                    return WhoIsHomeService.MAC_MAP[mac];
                });
                macs = macs.filter(function (name, index) {
                    return !!name && macs.indexOf(name) === index;
                });
                var greeting = WhoIsHomeService.GREETINGS[Math.round(Math.random() * (WhoIsHomeService.GREETINGS.length - 1))];
                var message = '';
                if (macs.length == 0) {
                    message = greeting + ' It looks like no one is home right now!';
                }
                else {
                    message = greeting + ' It looks like the following people are home:\n' + macs.join('\n');
                }
                _this.aEmit('sendMessage', message, threadID);
            });
        });
    };
    WhoIsHomeService.prototype.getMACs = function (cb) {
        exec('wget ' + WhoIsHomeService.OPTIONS, function (error, out) {
            var split = out.split('\n');
            var twoGDevices = split[WhoIsHomeService.TWO_G].replace('wlList_2g:', '');
            var twoGDevicesArray = eval(twoGDevices.substring(0, twoGDevices.length - 1));
            var fiveGDevices = split[WhoIsHomeService.FIVE_G].replace('wlList_5g:', '');
            var fiveGDevicesArray = eval(fiveGDevices.substring(0, fiveGDevices.length - 1));
            // merge
            var devices = twoGDevicesArray.concat(fiveGDevicesArray);
            cb(devices.map(function (device) {
                return device[0];
            }));
        });
    };
    WhoIsHomeService.OPTIONS = '--user=tacocat --password=\!\!racecar\!\! -q -O - http://192.168.1.1/update_clients.asp';
    WhoIsHomeService.TWO_G = 8;
    WhoIsHomeService.FIVE_G = 9;
    WhoIsHomeService.GREETINGS = [
        'Hi!',
        'Howdy!',
        'Greetings,',
        'Hola!'
    ];
    WhoIsHomeService.MAC_MAP = {
        '8C:3A:E3:46:C7:2E': 'Aaron Nech',
        '9C:FC:01:54:74:74': 'Lincoln Doyle',
        '4C:7C:5F:94:AA:51': 'Natalie Johnston',
        '40:0E:85:6D:F1:21': 'Ternessa Cao',
        '00:61:71:C4:48:64': 'Ryan Drapeau',
        '78:FD:94:AB:B9:83': 'Lauren Kingston'
    };
    return WhoIsHomeService;
})(Service);
module.exports = WhoIsHomeService;
