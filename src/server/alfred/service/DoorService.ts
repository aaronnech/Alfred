/// <reference path="../../../common/def/node.d.ts"/>

import Service = require('./Service');
import Constant = require('../Constant');

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
                    this.log(data);
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