/// <reference path="../../../common/def/node.d.ts"/>

import Service = require('./Service');
import BigBrotherService = require('./BigBrotherService');
import Constant = require('../Constant');
import Router = require('./Router');

var net = require('net');

class DoorService extends Service {
    public static PORT = 1337;

    constructor() {
        super();
    }

    public start(peerServices: Service[]) {
        var server = net.createServer();

        server.on('listening', () => {
            this.log('Created server on port ' + server.address().port);

            server.on('connection', (socket) => {
                socket.on('data', (data) => {
                    Router.whoIsHome((people: string[]) => {
                        // var wasHome = BigBrotherService.previousWhoIsHome;
                        // var justArrived = [];
                        // // Compute who just arrived at the house
                        // for (var i = 0; i < people.length; i++) {
                        //     if (wasHome.indexOf(people[i]) === -1) {
                        //         justArrived.push(people[i]);
                        //     }
                        // }

                        // // Alert everyone in the house who is home
                        // var peopleString = '';
                        // for (var i = 0; i < justArrived.length; i++) {
                        //     if (i === 0) {
                        //         peopleString += justArrived[i];
                        //     } else if (justArrived.length === 2) {
                        //         peopleString += ' and ' + justArrived[i];
                        //     } else if (i + 1 === justArrived.length) {
                        //         peopleString += ', and ' + justArrived[i];
                        //     } else {
                        //         peopleString += ', ' + justArrived[i];
                        //     }
                        // }

                        var msg = 'The door opened!';
                        // if (peopleString) {
                        //     msg += ' ' + peopleString + ' appear to be home.';
                        // }

                        for (var i = 0; i < people.length; i++) {
                            this.aEmit(
                                'sendMessage',
                                'The door opened!',
                                Constant.PERSON_TO_ID[people[i]]
                            );
                        }
                    });
                });

                socket.on('end', () => {
                    this.log('Connection closed to us on server');
                });

                socket.on('error', (err) => {
                    this.log('Connection closed to error');
                    socket.end();
                });
            });

            server.on('close', () => {
                this.log('Server closed');
            });
        });

        server.on('error', () => {
            server.close();
        });

        server.listen(DoorService.PORT);

        super.start(peerServices);
    }

    public getName(): string {
        return Constant.SERVICE_NAMES.DOOR;
    }

    protected onBindPeerService(service: Service): void {
        // Nothing to do
    }
}

export = DoorService;
