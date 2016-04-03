/// <reference path="../../../common/def/node.d.ts"/>
"use strict";
var Constant = require('../Constant');
var http = require('http');
var util = require('util');
var exec = require('child_process').exec;
var Router = (function () {
    function Router() {
    }
    Router.whoIsHome = function (callback) {
        Router.getMACs(function (macs) {
            macs = macs.map(function (mac) {
                return Constant.MAC_TO_PERSON[mac];
            });
            macs = macs.filter(function (name, index) {
                return !!name && macs.indexOf(name) === index;
            });
            callback(macs);
        });
    };
    Router.getMACs = function (cb) {
        exec('wget ' + Router.OPTIONS, function (error, out) {
            var split = out.split('\n');
            var twoGDevices = split[Router.TWO_G].replace('wlList_2g:', '');
            var twoGDevicesArray = eval(twoGDevices.substring(0, twoGDevices.length - 1));
            var fiveGDevices = split[Router.FIVE_G].replace('wlList_5g:', '');
            var fiveGDevicesArray = eval(fiveGDevices.substring(0, fiveGDevices.length - 1));
            // merge
            var devices = twoGDevicesArray.concat(fiveGDevicesArray);
            cb(devices.map(function (device) {
                return device[0];
            }));
        });
    };
    Router.OPTIONS = '--user=tacocat --password=\!\!racecar\!\! -q -O - http://192.168.1.1/update_clients.asp';
    Router.TWO_G = 8;
    Router.FIVE_G = 9;
    return Router;
}());
module.exports = Router;
