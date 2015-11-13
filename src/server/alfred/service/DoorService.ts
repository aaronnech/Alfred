/// <reference path="../../../common/def/node.d.ts"/>

import Service = require('./Service');
import Constant = require('../Constant');

var net = require('net');

class DoorService extends Service {
    public static PORT = 1337;
    private static DOOR_PEOPLE: string[] = [
        "100000178479403",
        "100000146862102",
        "636286721",
        // "100000030404239",
        "100009910279499"
    ];


    constructor() {
        super();
    }

    public start(peerServices: Service[]) {
        var server = net.createServer();

        server.on('listening', () => {
            this.log('Created server on port ' + server.address().port);

            server.on('connection', (socket) => {
                socket.on('data', (data) => {
                    for (var i = 0; i < DoorService.DOOR_PEOPLE.length; i++) {
                        // Only message people who care about the door (aka not lauren)
                        this.aEmit('sendMessage', 'The door opened!', DoorService.DOOR_PEOPLE[i]);
                    }
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
