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
                    if (day == ChoreRotationService.MONDAY) {
                        _this.emitChores();
                    }
                });
                break;
        }
    };
    ChoreRotationService.prototype.emitChores = function (threadID) {
        var d = new Date();
        var cursor = d.getWeekNumber() % 5;
        for (var i = 0; i < ChoreRotationService.PEOPLE.length; i++) {
            this.aEmit('sendMessage', ChoreRotationService.PEOPLE[i] +
                ' is the ' +
                ChoreRotationService.COMMAND_POSTS[(cursor + i) % 5] +
                ' commander', threadID);
        }
    };
    ChoreRotationService.MONDAY = 1;
    ChoreRotationService.PEOPLE = [
        'Ternessa Cao',
        'Ryan Drapeau',
        'Aaron Nech',
        'Lauren Kingston',
        'Natalie Johnson'
    ];
    ChoreRotationService.COMMAND_POSTS = [
        'Trash',
        'Kitchen 1',
        'Living Room',
        'Guest Bathroom',
        'Floor'
    ];
    return ChoreRotationService;
})(Service);
module.exports = ChoreRotationService;
