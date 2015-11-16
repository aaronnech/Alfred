/// <reference path="../../common/def/node.d.ts"/>
/**
 * Global Constants for the Alfred Application
 */
var Constant = (function () {
    function Constant() {
    }
    Constant.DAYS_OF_WEEK = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    Constant.MONDAY_INDEX = 1;
    Constant.PEOPLE = [
        'Ternessa Cao',
        'Ryan Drapeau',
        'Aaron Nech',
        'Lauren Kingston',
        'Natalie Johnson'
    ];
    Constant.MAC_TO_PERSON = {
        '8C:3A:E3:46:C7:2E': 'Aaron Nech',
        '4C:7C:5F:94:AA:51': 'Natalie Johnston',
        '40:0E:85:6D:F1:21': 'Ternessa Cao',
        '00:61:71:C4:48:64': 'Ryan Drapeau',
        '78:FD:94:AB:B9:83': 'Lauren Kingston'
    };
    Constant.PERSON_TO_ID = {
        'Aaron Nech': '100000146862102',
        'Natalie Johnston': '100009910279499',
        'Ternessa Cao': '636286721',
        'Ryan Drapeau': '100000178479403',
        'Lauren Kingston': '100000030404239'
    };
    Constant.CHORES = [
        'Trash',
        'Kitchen',
        'Living Room',
        'Guest Bathroom',
        'Floor'
    ];
    Constant.SERVICE_NAMES = {
        WHO_IS_HOME: 'WhoIsHomeService',
        MESSENGER: "MessengerService",
        CHORE_ROTATION: 'ChoreRotationService',
        DAY: 'DayService',
        UPDATE: 'UpdateService',
        WHATS_MY_IP: 'WhatsMyIpService',
        IOT_CODE: 'IOTCodeService',
        DOOR: 'DoorService',
        BIG_BROTHER: 'BigBrotherService'
    };
    Constant.DOOR_CODE = [
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
    Constant.DEVELOPERS = ["100000178479403", "100000146862102"];
    return Constant;
})();
module.exports = Constant;
