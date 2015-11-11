/// <reference path="../../../common/def/node.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Service = require('./Service');
var Constant = require('../Constant');
var http = require('http');
var util = require('util');
var exec = require('child_process').exec;
var UpdateService = (function (_super) {
    __extends(UpdateService, _super);
    function UpdateService() {
        _super.call(this);
    }
    UpdateService.prototype.start = function (peerServices) {
        _super.prototype.start.call(this, peerServices);
    };
    UpdateService.prototype.getName = function () {
        return Constant.SERVICE_NAMES.UPDATE;
    };
    UpdateService.prototype.onBindPeerService = function (service) {
        var _this = this;
        service.on('update', function () {
            _this.aEmit('sendMessage', 'Thanks for notifying me to update!');
            _this.aEmit('sendMessage', 'Downloading my new code now see you in a bit!');
            // Redownload occurs on system restart
            var exec = require('child_process').exec;
            setTimeout(function () {
                exec('shutdown -r now', function (error, stdout, stderr) { });
            }, 2000);
        });
    };
    return UpdateService;
})(Service);
module.exports = UpdateService;
