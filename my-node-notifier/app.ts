const request = require('request');
const Https = require('https');
const HttpsProxyAgent = require('https-proxy-agent');

class Notifier {
    name: string;
    sendMessage(message: string): void {
        console.log("Default implementation");
    }
}

class TelegramNotifier extends Notifier {
    token: string;
    chatID: string;

    init(name: string, token: string, chatID: string): void {
        this.name = name;
        this.token = token;
        this.chatID = chatID;
    }

    sendMessage(message: string): void {
        if (message === undefined) {
            return;
        }
        message = this.bold("• " + this.name + " •") + '\n' + message;
        message = message.replace("+", "%2B");
        let url: string = `https://api.telegram.org/bot${this.token}/sendMessage?chat_id=${this.chatID}&text=${message}&parse_mode=html`;

        request(url, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
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

    bold(message: string): string {
        if (message === undefined) {
            return;
        }
        return `<b>${message}</b>`;
    }
}

class SmsNotifier extends Notifier {
    token: string;
    phone: string;

    init(name: string, token: string, phone: string): void  {
        this.name = name;
        this.token = token;
        this.phone = phone;
    }

    sendMessage(message: string): void {
        if (message === undefined) {
            return;
        }
        message = message.replace("+", "%2B");
        let url: string = `http://sms.ru/sms/send?api_id=${this.token}&to=${this.phone}&text=${message}`;

        request(url, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
        });
    }
}