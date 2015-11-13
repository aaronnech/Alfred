/// <reference path="../../common/def/node.d.ts"/>
/**
 * Global Constants for the Alfred Application
 */
var Constant = (function () {
    function Constant() {
    }
    Constant.SERVICE_NAMES = {
        WHO_IS_HOME: 'WhoIsHomeService',
        MESSENGER: "MessengerService",
        CHORE_ROTATION: 'ChoreRotationService',
        DAY: 'DayService',
        UPDATE: 'UpdateService',
        WHATS_MY_IP: 'WhatsMyIpService',
        IOT_CODE: 'IOTCodeService',
        DOOR: 'DoorService'
    };
    Constant.DEVELOPERS = ["100000178479403", "100000146862102"];
    return Constant;
})();
module.exports = Constant;
