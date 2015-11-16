/// <reference path="../../../common/def/node.d.ts"/>

import Service = require('./Service');
import Router = require('./Router');
import Constant = require('../Constant');

class WhoIsHomeService extends Service {

    private static GREETINGS: string[] = [
      'Hi!',
      'Howdy!',
      'Greetings,',
      'Hola!'
    ];

    constructor() {
        super();
    }

    public getName() : string {
        return Constant.SERVICE_NAMES.WHO_IS_HOME;
    }

    protected onBindPeerService(service : Service) : void {
        service.on('whoIsHome', (threadID) => {
            Router.whoIsHome((people: string[]) => {
                var greeting = WhoIsHomeService.GREETINGS[Math.round(Math.random() * (WhoIsHomeService.GREETINGS.length - 1))];
                var message = '';
                if (people.length == 0) {
                    message = greeting + ' It looks like no one is home right now!';
                } else {
                    message = greeting + ' It looks like the following people are home:\n' + people.join('\n');
                }

                this.aEmit('sendMessage', message, threadID);
            });
        });
    }
}

export = WhoIsHomeService;
