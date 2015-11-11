/// <reference path="../../../common/def/node.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Service = require('./Service');
var Constant = require('../Constant');
var WhatsMyIpService = (function (_super) {
    __extends(WhatsMyIpService, _super);
    function WhatsMyIpService() {
        _super.call(this);
    }
    WhatsMyIpService.prototype.getName = function () {
        return Constant.SERVICE_NAMES.WHATS_MY_IP;
    };
    WhatsMyIpService.prototype.onBindPeerService = function (service) {
        var _this = this;
        service.on('whatsMyIp', function () {
            require('dns').lookup(require('os').hostname(), function (err, add, fam) {
                _this.aEmit('sendMessage', 'My Local IP is: ' + add);
            });
        });
    };
    return WhatsMyIpService;
})(Service);
module.exports = WhatsMyIpService;
