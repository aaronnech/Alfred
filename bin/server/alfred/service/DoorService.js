/// <reference path="../../../common/def/node.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Service = require('./Service');
var Constant = require('../Constant');
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
                    _this.log(data);
                    var split = data.split(':');
                    if (split.length && split[0] == 'door' && split[1] == '1') {
                        _this.aEmit('sendMessage', 'The door opened!');
                    }
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
})(Service);
module.exports = DoorService;
