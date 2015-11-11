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
    private static MONDAY: number = 1;
    
    private static PEOPLE: string[] = [
      'Ternessa Cao',
      'Ryan Drapeau',
      'Aaron Nech',
      'Lauren Kingston',
      'Natalie Johnson'
    ];
    
    private static COMMAND_POSTS: string[] = [
      'Trash',
      'Kitchen 1',
      'Living Room',
      'Guest Bathroom',
      'Floor'  
    ];
    
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
      service.on('chores', () => {
        this.emitChores();
      });

      switch (service.getName()) {
          case Constant.SERVICE_NAMES.DAY:
            service.on('newDay', (day: number) => {
                if (day == ChoreRotationService.MONDAY) {
                  this.emitChores();
                }
            });
            break;
      }
    }

    private emitChores() {
      var d: any = new Date();
      var cursor = d.getWeekNumber() % 5;

      this.aEmit('sendMessage', 'This week we have the following:');

      for (var i = 0; i < ChoreRotationService.PEOPLE.length; i++) {
        this.aEmit('sendMessage',
          ChoreRotationService.PEOPLE[i] +
          ' is the ' +
          ChoreRotationService.COMMAND_POSTS[(cursor + i) % 5] +
          ' commander'
        );
      }
    }
}

export = ChoreRotationService;