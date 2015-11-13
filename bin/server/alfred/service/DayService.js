/// <reference path="../../../common/def/node.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Service = require('./Service');
var Constant = require('../Constant');
var DayService = (function (_super) {
    __extends(DayService, _super);
    function DayService() {
        _super.call(this);
    }
    DayService.prototype.start = function (peerServices) {
        var _this = this;
        _super.prototype.start.call(this, peerServices);
        setInterval(function () {
            var d = new Date();
            var n = d.getHours();
            if (n == DayService.ALERT_HOUR) {
                _this.aEmit('newDay', d.getDay());
                _this.aEmit('sendMessage', 'Good morning! It\'s a brand new ' + DayService.DAYS[d.getDay()]);
            }
        }, 1000 * 60 * 60);
    };
    DayService.prototype.getName = function () {
        return Constant.SERVICE_NAMES.DAY;
    };
    DayService.prototype.onBindPeerService = function (service) {
        // Nothing
    };
    DayService.DAYS = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    DayService.ALERT_HOUR = 10;
    return DayService;
})(Service);
module.exports = DayService;
