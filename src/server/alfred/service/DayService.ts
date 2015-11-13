/// <reference path="../../../common/def/node.d.ts"/>

import Service = require('./Service');
import Constant = require('../Constant');

class DayService extends Service {
    private static DAYS: string[] = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    private static ALERT_HOUR: number = 10;

    constructor() {
        super();
    }

    public start(peerServices : Service[]) {
        super.start(peerServices);

        setInterval(() => {
          var d = new Date();
          var n = d.getHours();

          if (n == DayService.ALERT_HOUR) {
            this.aEmit('newDay', d.getDay());
            this.aEmit('sendMessage', 'Good morning! It\'s a brand new ' + DayService.DAYS[d.getDay()]);
          }
        }, 1000 * 60 * 60);
    }

    public getName() : string {
        return Constant.SERVICE_NAMES.DAY;
    }

    protected onBindPeerService(service : Service) : void {
      // Nothing
    }
}

export = DayService;
