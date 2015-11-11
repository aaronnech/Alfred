/// <reference path="../../../common/def/node.d.ts"/>

import Service = require('./Service');
import Constant = require('../Constant');

var http = require('http');
var util = require('util');
var exec = require('child_process').exec;

class UpdateService extends Service { 
    constructor() {
        super();
    }
    
    public start(peerServices : Service[]) {
        super.start(peerServices);
    }

    public getName() : string {
        return Constant.SERVICE_NAMES.UPDATE;
    }

    protected onBindPeerService(service : Service) : void {
        service.on('update', () => {
            this.aEmit('sendMessage', 'Thanks for notifying me to update!');
            this.aEmit('sendMessage', 'Downloading my new code now see you in a bit!');

            // Redownload occurs on system restart
            var exec = require('child_process').exec;
            setTimeout(() => {
                exec('shutdown -r now', function(error, stdout, stderr) { });
            }, 2000);
        });
    }
}

export = UpdateService;