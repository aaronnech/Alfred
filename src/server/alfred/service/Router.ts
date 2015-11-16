/// <reference path="../../../common/def/node.d.ts"/>

import Constant = require('../Constant');

var http = require('http');
var util = require('util');
var exec = require('child_process').exec;

class Router {
    private static OPTIONS: string = '--user=tacocat --password=\!\!racecar\!\! -q -O - http://192.168.1.1/update_clients.asp';
    private static TWO_G: number = 8;
    private static FIVE_G: number = 9;

    public static whoIsHome(callback: Function) : void {
        Router.getMACs((macs: string[]) => {
            macs = macs.map((mac) => {
                return Constant.MAC_TO_PERSON[mac];
            });

            macs = macs.filter((name, index) => {
                return !!name && macs.indexOf(name) === index;
            });

            callback(macs);
        });
    }

    private static getMACs(cb: Function) {
        exec('wget ' + Router.OPTIONS, (error: any, out: string) => {
            var split: string[] = out.split('\n');
            var twoGDevices: string = split[Router.TWO_G].replace('wlList_2g:', '');
            var twoGDevicesArray: any[] = eval(twoGDevices.substring(0, twoGDevices.length - 1));
            var fiveGDevices: string = split[Router.FIVE_G].replace('wlList_5g:', '');
            var fiveGDevicesArray: any[] = eval(fiveGDevices.substring(0, fiveGDevices.length - 1));

            // merge
            var devices: any[] = twoGDevicesArray.concat(fiveGDevicesArray);

            cb(devices.map((device) => {
                return device[0];
            }));
        });
    }
}

export = Router;
