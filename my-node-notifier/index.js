"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('request');
const Https = require('https');
const HttpsProxyAgent = require('https-proxy-agent');
class Notifier {
    sendMessage(message) {
        console.log("Default implementation");
    }
}
exports.Notifier = Notifier;
class TelegramNotifier extends Notifier {
    init(name, token, chatID) {
        this.name = name;
        this.token = token;
        this.chatID = chatID;
    }
    sendMessage(message) {
        if (message === undefined) {
            return;
        }
        message = this.bold("• " + this.name + " •") + '\n' + message;
        message = message.replace("+", "%2B");
        let url = `https://api.telegram.org/bot${this.token}/sendMessage?chat_id=${this.chatID}&text=${message}&parse_mode=html`;
        request(url, { json: true }, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
        });
        //var agent = new HttpsProxyAgent({
        //    proxyHost: '188.166.214.xxx',
        //    proxyPort: 1088
        //});
        //Https.request({
        //    // like you'd do it usually...
        //    host: 'api.telegram.org',
        //    port: 443,
        //    method: 'GET',
        //    path: '/',
        //    agent: agent
        //}, function (res) {
        //    res.on('data', function (data) {
        //        console.log(data.toString());
        //    });
        //}).end();
    }
    bold(message) {
        if (message === undefined) {
            return;
        }
        return `<b>${message}</b>`;
    }
}
exports.TelegramNotifier = TelegramNotifier;
class SmsNotifier extends Notifier {
    init(name, token, phone) {
        this.name = name;
        this.token = token;
        this.phone = phone;
    }
    sendMessage(message) {
        if (message === undefined) {
            return;
        }
        message = message.replace("+", "%2B");
        let url = `http://sms.ru/sms/send?api_id=${this.token}&to=${this.phone}&text=${message}`;
        request(url, { json: true }, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
        });
    }
}
exports.SmsNotifier = SmsNotifier;
//# sourceMappingURL=index.js.map