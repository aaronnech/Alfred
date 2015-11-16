/// <reference path="../../../common/def/node.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Service = require('./Service');
var Router = require('./Router');
var Constant = require('../Constant');
var WhoIsHomeService = (function (_super) {
    __extends(WhoIsHomeService, _super);
    function WhoIsHomeService() {
        _super.call(this);
    }
    WhoIsHomeService.prototype.getName = function () {
        return Constant.SERVICE_NAMES.WHO_IS_HOME;
    };
    WhoIsHomeService.prototype.onBindPeerService = function (service) {
        var _this = this;
        service.on('whoIsHome', function (threadID) {
            Router.whoIsHome(function (people) {
                var greeting = WhoIsHomeService.GREETINGS[Math.round(Math.random() * (WhoIsHomeService.GREETINGS.length - 1))];
                var message = '';
                if (people.length == 0) {
                    message = greeting + ' It looks like no one is home right now!';
                }
                else {
                    message = greeting + ' It looks like the following people are home:\n' + people.join('\n');
                }
                _this.aEmit('sendMessage', message, threadID);
            });
        });
    };
    WhoIsHomeService.GREETINGS = [
        'Hi!',
        'Howdy!',
        'Greetings,',
        'Hola!'
    ];
    return WhoIsHomeService;
})(Service);
module.exports = WhoIsHomeService;
