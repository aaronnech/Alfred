/// <reference path="../../../common/def/node.d.ts"/>

import Service = require('./Service');
import Constant = require('../Constant');

class WhatsMyIpService extends Service {
    constructor() {
        super();
    }

    public getName(): string {
        return Constant.SERVICE_NAMES.WHATS_MY_IP;
    }

    protected onBindPeerService(service: Service): void {
        service.on('whatsMyIp', (threadID) => {
            require('dns').lookup(require('os').hostname(), (err, add, fam) => {
                this.aEmit('sendMessage', 'My Local IP is: ' + add, threadID);
            });
        });
    }
}

export = WhatsMyIpService;
