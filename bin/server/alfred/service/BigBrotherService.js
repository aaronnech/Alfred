/// <reference path="../../../common/def/node.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Service = require('./Service');
var Router = require('./Router');
var Constant = require('../Constant');
var BigBrotherService = (function (_super) {
    __extends(BigBrotherService, _super);
    function BigBrotherService() {
        _super.call(this);
    }
    BigBrotherService.prototype.start = function (peerServices) {
        _super.prototype.start.call(this, peerServices);
        setInterval(function () {
            Router.whoIsHome(function (people) {
                BigBrotherService.previousWhoIsHome = BigBrotherService.currentWhoIsHome;
                BigBrotherService.currentWhoIsHome = people;
            });
        }, BigBrotherService.UPDATE_TIME_MS);
    };
    BigBrotherService.prototype.getName = function () {
        return Constant.SERVICE_NAMES.BIG_BROTHER;
    };
    BigBrotherService.prototype.onBindPeerService = function (service) {
        // Nothing
    };
    BigBrotherService.UPDATE_TIME_MS = 120000 * 3; // 2 minutes
    BigBrotherService.previousWhoIsHome = [];
    BigBrotherService.currentWhoIsHome = [];
    return BigBrotherService;
})(Service);
module.exports = BigBrotherService;
