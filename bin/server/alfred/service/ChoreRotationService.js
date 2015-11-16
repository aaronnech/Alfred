/// <reference path="../../../common/def/node.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Service = require('./Service');
var Constant = require('../Constant');
// hack
Date.prototype.getWeekNumber = function () {
    var d = new Date(+this);
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return Math.ceil((((d - (new Date(d.getFullYear(), 0, 1))) / 8.64e7) + 1) / 7);
};
var ChoreRotationService = (function (_super) {
    __extends(ChoreRotationService, _super);
    function ChoreRotationService() {
        _super.call(this);
    }
    ChoreRotationService.prototype.start = function (peerServices) {
        _super.prototype.start.call(this, peerServices);
    };
    ChoreRotationService.prototype.getName = function () {
        return Constant.SERVICE_NAMES.CHORE_ROTATION;
    };
    ChoreRotationService.prototype.onBindPeerService = function (service) {
        var _this = this;
        service.on('chores', function (threadID) {
            _this.emitChores(threadID);
        });
        switch (service.getName()) {
            case Constant.SERVICE_NAMES.DAY:
                service.on('newDay', function (day) {
                    if (day == Constant.MONDAY_INDEX) {
                        _this.emitChores();
                    }
                });
                break;
        }
    };
    ChoreRotationService.prototype.emitChores = function (threadID) {
        var d = new Date();
        var cursor = d.getWeekNumber() % Constant.PEOPLE.length;
        this.aEmit('sendMessage', 'This week we have the following:', threadID);
        for (var i = 0; i < Constant.PEOPLE.length; i++) {
            this.aEmit('sendMessage', Constant.PEOPLE[i] +
                ' is the ' +
                Constant.CHORES[(cursor + i) % Constant.PEOPLE.length] +
                ' commander', threadID);
        }
    };
    return ChoreRotationService;
})(Service);
module.exports = ChoreRotationService;
