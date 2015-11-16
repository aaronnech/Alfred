/// <reference path="../../common/def/node.d.ts"/>

/**
 * Global Constants for the Alfred Application
 */
class Constant {
	public static DAYS_OF_WEEK: string[] = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
    ];

    public static MONDAY_INDEX: number = 1;

    public static PEOPLE: string[] = [
		'Ternessa Cao',
		'Ryan Drapeau',
		'Aaron Nech',
		'Lauren Kingston',
		'Natalie Johnson'
    ];

    public static MAC_TO_PERSON: any = {
        '8C:3A:E3:46:C7:2E': 'Aaron Nech',
        '4C:7C:5F:94:AA:51': 'Natalie Johnston',
        '40:0E:85:6D:F1:21': 'Ternessa Cao',
        '00:61:71:C4:48:64': 'Ryan Drapeau',
        '78:FD:94:AB:B9:83': 'Lauren Kingston'
    };

	public static PERSON_TO_ID: any = {
        'Aaron Nech': '100000146862102',
        'Natalie Johnston': '100009910279499',
        'Ternessa Cao': '636286721',
        'Ryan Drapeau': '100000178479403',
        'Lauren Kingston': '100000030404239'
    };

	public static CHORES: string[] = [
		'Trash',
		'Kitchen',
		'Living Room',
		'Guest Bathroom',
		'Floor'
    ];

	public static SERVICE_NAMES: any = {
		WHO_IS_HOME: 'WhoIsHomeService',
		MESSENGER: "MessengerService",
		CHORE_ROTATION: 'ChoreRotationService',
		DAY: 'DayService',
		UPDATE: 'UpdateService',
		WHATS_MY_IP: 'WhatsMyIpService',
		IOT_CODE: 'IOTCodeService',
		DOOR: 'DoorService'
	};

	public static DOOR_CODE = [
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

	public static DEVELOPERS: any = ["100000178479403"]; //  , "100000146862102"];
}

export = Constant;
