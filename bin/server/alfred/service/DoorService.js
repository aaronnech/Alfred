/// <reference path="../../../common/def/node.d.ts"/>
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Service = require('./Service');
var Constant = require('../Constant');
var Router = require('./Router');
var net = require('net');
var DoorService = (function (_super) {
    __extends(DoorService, _super);
    function DoorService() {
        _super.call(this);
    }
    DoorService.prototype.start = function (peerServices) {
        var _this = this;
        var server = net.createServer();
        server.on('listening', function () {
            _this.log('Created server on port ' + server.address().port);
            server.on('connection', function (socket) {
                socket.on('data', function (data) {
                    Router.whoIsHome(function (people) {
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
                            _this.aEmit('sendMessage', 'The door opened!', Constant.PERSON_TO_ID[people[i]]);
                        }
                    });
                });
                socket.on('end', function () {
                    _this.log('Connection closed to us on server');
                });
                socket.on('error', function (err) {
                    _this.log('Connection closed to error');
                    socket.end();
                });
            });
            server.on('close', function () {
                _this.log('Server closed');
            });
        });
        server.on('error', function () {
            server.close();
        });
        server.listen(DoorService.PORT);
        _super.prototype.start.call(this, peerServices);
    };
    DoorService.prototype.getName = function () {
        return Constant.SERVICE_NAMES.DOOR;
    };
    DoorService.prototype.onBindPeerService = function (service) {
        // Nothing to do
    };
    DoorService.PORT = 1337;
    return DoorService;
}(Service));
module.exports = DoorService;
