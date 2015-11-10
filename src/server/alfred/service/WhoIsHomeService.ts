/// <reference path="../../../common/def/node.d.ts"/>

import Service = require('./Service');
import Constant = require('../Constant');

var login = require("facebook-chat-api");
var http = require('http');
var util = require('util');
var exec = require('child_process').exec;

class WhoIsHomeService extends Service {
    private static OPTIONS: string = '--user=tacocat --password=\!\!racecar\!\! -q -O - http://192.168.1.1/update_clients.asp';
    private static TWO_G: number = 8;
    private static FIVE_G: number = 9;
    
    private static GREETINGS: string[] = [
      'Hi!',
      'Howdy!',
      'Greetings,',
      'Hola!'
    ];
    
    private static MAC_MAP: any = {
        '8C:3A:E3:46:C7:2E': 'Aaron Nech',
        '9C:FC:01:54:74:74': 'Lincoln Doyle',
        '4C:7C:5F:94:AA:51': 'Natalie Johnston',
        '40:0E:85:6D:F1:21': 'Ternessa Cao'
    };
    
    constructor() {
        super();
    }

    public getName() : string {
        return Constant.SERVICE_NAMES.WHO_IS_HOME;
    }

    protected onBindPeerService(service : Service) : void {
        service.on('whoIsHome', () => {
            this.getMACs((macs: string[]) => {
                macs = macs.map((mac) => {
                    return WhoIsHomeService.MAC_MAP[mac];
                });

                macs = macs.filter((name) => {
                    return !!name;
                });
                
                var greeting = WhoIsHomeService.GREETINGS[Math.round(Math.random() * (WhoIsHomeService.GREETINGS.length - 1))];
                var message = '';
                if (macs.length == 0) {
                    message = greeting + ' It looks like no one is home right now!';
                } else {
                    message = greeting + ' It looks like the following people are home: ' + macs.join(', ');
                }
                
                this.aEmit('sendMessage', message);  
            })
        });
    }
    
    private getMACs(cb: Function) {
        exec('wget ' + WhoIsHomeService.OPTIONS, (error: any, out: string) => {
            var split: string[] = out.split('\n');
            var twoGDevices: string = split[WhoIsHomeService.TWO_G].replace('wlList_2g:', '');
            var twoGDevicesArray: any[] = eval(twoGDevices.substring(0, twoGDevices.length - 1));
            var fiveGDevices: string = split[WhoIsHomeService.FIVE_G].replace('wlList_5g:', '');
            var fiveGDevicesArray: any[] = eval(fiveGDevices.substring(0, fiveGDevices.length - 1));
    
            // merge
            var devices: any[] = twoGDevicesArray.concat(fiveGDevicesArray);
    
            cb(devices.map((device) => {
                return device[0];
            }));
        });
    }
}

export = WhoIsHomeService;