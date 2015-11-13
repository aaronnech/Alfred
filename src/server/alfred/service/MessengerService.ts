/// <reference path="../../../common/def/node.d.ts"/>

import Service = require('./Service');
import Constant = require('../Constant');

var login = require("facebook-chat-api");

class MessengerService extends Service {
    private static EMAIL: string = "alfredchives@outlook.com";
    private static PASSWORD: string = "501012thave";
    private static THREAD_ID: string = "1613266892256531";

    private static APPROVED_IDS: string[] = [
        "100000178479403",
        "100000146862102",
        "636286721",
        "100000030404239",
        "100009910279499"
    ];

    private api: any;

    private messageQueue: any[];

    constructor() {
        super();
    }

    public getName() : string {
        return Constant.SERVICE_NAMES.MESSENGER;
    }

    public start(peerServices : Service[]) {
        super.start(peerServices);

        this.messageQueue = [];

        login({
            email: MessengerService.EMAIL,
            password: MessengerService.PASSWORD,
            logLevel: 'silent'
        }, (err, api) => {
            if(err) return console.error(err);
            this.api = api;

            this.messageQueue.push({ msg: 'Greetings! I\'m Alfred (I just woke up).' });
            this.attemptSend();

            api.listen((err, message) => {
                this.onMessage(message);
            });
        });
    }

    private onMessage(message: any) {
        if (message && message.body && MessengerService.APPROVED_IDS.indexOf(message.senderID) >= 0 &&
            message.body.indexOf('#alfred') !== -1) {
            this.log('Command Recieved: ' + message.body);
    		var split = message.body.split(/\s+/);
    		var command = split[1].toLowerCase();

    		switch (command) {
                case "whatsmyip":
                    this.aEmit('whatsMyIp', message.threadID);
                    break;
    			case "whoishome":
                    this.aEmit('whoIsHome', message.threadID);
    				break;
                case "chores":
                    this.aEmit('chores', message.threadID);
                    break;
                case "update":
                    this.aEmit('update', message.threadID);
                    break;
    		}
    	}
    }

    private attemptSend() : void {
        if (this.api && this.messageQueue.length > 0) {
            var msg = this.messageQueue.shift();

            if (!msg.threadID) {
                for (var i = 0; i < MessengerService.APPROVED_IDS.length; i++) {
                    this.api.sendMessage(msg.msg, MessengerService.APPROVED_IDS[i]);
                }
            } else {
                this.api.sendMessage(msg.msg, msg.threadID);
            }

            if (this.messageQueue.length > 0) {
                this.tick(() => {
                    this.attemptSend();
                });
            }
        } else {
            setTimeout(() => {
                this.attemptSend();
            }, 100);
        }
    }

    protected onBindPeerService(service : Service) : void {
        service.on('sendMessage', (msg: string, threadID: string) => {
            if (msg) {
                this.messageQueue.push({ msg: msg, threadID: threadID });
                this.attemptSend();
            }
        });
    }
}

export = MessengerService;
