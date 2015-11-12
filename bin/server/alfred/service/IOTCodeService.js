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
                _this.aEmit('sendMessage', 'The door reed switch has connected to me. Sending code...');
                socket.write(IOTCodeService.DOOR_CODE);
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
    IOTCodeService.DOOR_CODE = [
        'function sendDoorOpen()',
        'sk=net.createConnection(net.TCP, 0)',
        'sk:on("connection", function(sck)',
        'print("connected, sending door info")',
        'sk:send("door:1")',
        'sk:close()',
        'end );',
        'print("connecting");',
        'sk:connect(1337, "192.168.1.189")',
        'end',
        'tmr.stop(0)',
        'gpio.mode(5, gpio.INPUT)',
        'dooropen = false',
        'function run()',
        'if gpio.read(5) == 0 then',
        'if not dooropen then',
        'print("DOOR OPEN!")',
        'sendDoorOpen()',
        'end',
        'dooropen = true',
        'else',
        'if dooropen then',
        'print("DOOR CLOSED!")',
        'end',
        'dooropen = false',
        'end',
        'tmr.alarm(0, 2000, 0, run)',
        'end',
        'run()'
    ].join('\n');
    return IOTCodeService;
})(Service);
module.exports = IOTCodeService;
