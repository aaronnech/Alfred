/// <reference path="../../../common/def/node.d.ts"/>

import Service = require('./Service');
import Constant = require('../Constant');

// hack
(<any> Date).prototype.getWeekNumber = function(){
    var d: any = new Date(+this);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-(<any> (new Date(d.getFullYear(),0,1))))/8.64e7)+1)/7);
};

class ChoreRotationService extends Service {

    constructor() {
        super();
    }

    public start(peerServices : Service[]) {
        super.start(peerServices);
    }

    public getName() : string {
        return Constant.SERVICE_NAMES.CHORE_ROTATION;
    }

    protected onBindPeerService(service : Service) : void {
      service.on('chores', (threadID) => {
        this.emitChores(threadID);
      });

      switch (service.getName()) {
          case Constant.SERVICE_NAMES.DAY:
            service.on('newDay', (day: number) => {
              if (day == Constant.MONDAY_INDEX) {
                  this.emitChores();
                }
            });
            break;
      }
    }

    private emitChores(threadID? : any) {
      var d: any = new Date();
      var cursor = d.getWeekNumber() % Constant.PEOPLE.length;

      this.aEmit('sendMessage', 'This week we have the following:', threadID);
      for (var i = 0; i < Constant.PEOPLE.length; i++) {
        this.aEmit('sendMessage',
          Constant.PEOPLE[i] +
          ' is the ' +
          Constant.CHORES[(cursor + i) % Constant.PEOPLE.length] +
          ' commander',
          threadID
        );
      }
    }
}

export = ChoreRotationService;
