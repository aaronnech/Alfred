/// <reference path="../../../common/def/node.d.ts"/>
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Service = require('./Service');
var Constant = require('../Constant');
var net = require('net');
var IOTCodeService = (function (_super) {
    __extends(IOTCodeService, _super);
    function IOTCodeService() {
        _super.call(this);
    }
    IOTCodeService.prototype.start = function (peerServices) {
        var _this = this;
        var server = net.createServer();
        server.on('listening', function () {
            _this.log('Created server on port ' + server.address().port);
            server.on('connection', function (socket) {
                for (var i = 0; i < Constant.DEVELOPERS.length; i++) {
                    _this.aEmit('sendMessage', 'The door reed switch has connected to me. Sending code...', Constant.DEVELOPERS[i]);
                }
                socket.write(Constant.DOOR_CODE);
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
        server.listen(IOTCodeService.PORT);
        _super.prototype.start.call(this, peerServices);
    };
    IOTCodeService.prototype.getName = function () {
        return Constant.SERVICE_NAMES.IOT_CODE;
    };
    IOTCodeService.prototype.onBindPeerService = function (service) {
        // Nothing to do
    };
    IOTCodeService.PORT = 1336;
    return IOTCodeService;
}(Service));
module.exports = IOTCodeService;
