/// <reference path="../../../common/def/node.d.ts"/>

import Service = require('./Service');
import Constant = require('../Constant');

var login = require("facebook-chat-api");

class MessengerService extends Service {
    private static EMAIL: string = "alfredchives@outlook.com";
    private static PASSWORD: string = "501012thave";
    private static THREAD_ID: string = "1613266892256531"; 
    private api: any;
    
    private messageQueue: string[];

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
            
            this.messageQueue.push('Greetings! I\'m Alfred (I just woke up).');
            this.attemptSend();
            
            api.listen((err, message) => {
                this.onMessage(message);
            });
        });
    }
    
    private onMessage(message: any) {
    	if (message && message.body && "" + message.thread_id === MessengerService.THREAD_ID &&
            message.body.indexOf('#alfred') !== -1) {
            this.log('Command Recieved: ' + message.body);
    		var split = message.body.split(/\s+/);
    		var command = split[1].toLowerCase();
    
    		switch (command) {
                case "whatsmyip":
                    this.aEmit('whatsMyIp');
                    break;
    			case "whoishome":
                    this.aEmit('whoIsHome');
    				break;
                case "chores":
                    this.aEmit('chores');
                    break;
                case "update":
                    this.aEmit('update');
                    break;
    		}
    	}    
    }
    
    private attemptSend() : void {
        if (this.api && this.messageQueue.length > 0) {
            var msg = this.messageQueue.shift();
            this.api.sendMessage(msg, MessengerService.THREAD_ID);   
            
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
        service.on('sendMessage', (msg: string) => {
            if (msg) {
                this.messageQueue.push(msg);
                this.attemptSend();
            }
        });
    }
}

export = MessengerService;