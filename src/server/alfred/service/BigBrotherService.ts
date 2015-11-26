/// <reference path="../../../common/def/node.d.ts"/>

import Service = require('./Service');
import Router = require('./Router');
import Constant = require('../Constant');

class BigBrotherService extends Service {
    private static UPDATE_TIME_MS: number = 120000 * 3; // 2 minutes

    public static previousWhoIsHome: string[] = [];
    public static currentWhoIsHome: string[] = [];

    constructor() {
        super();
    }

    public start(peerServices : Service[]) {
        super.start(peerServices);

        setInterval(() => {
          Router.whoIsHome((people: string[]) => {
              BigBrotherService.previousWhoIsHome = BigBrotherService.currentWhoIsHome;
              BigBrotherService.currentWhoIsHome = people;
          });
        }, BigBrotherService.UPDATE_TIME_MS);
    }

    public getName() : string {
        return Constant.SERVICE_NAMES.BIG_BROTHER;
    }

    protected onBindPeerService(service : Service) : void {
      // Nothing
    }
}

export = BigBrotherService;
