var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const request = require('request');
const Https = require('https');
const HttpsProxyAgent = require('https-proxy-agent');
class Notifier {
    sendMessage(message) {
        console.log("Default implementation");
    }
}
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
        //request(url, { json: true }, (err, res, body) => {
        //    if (err) { return console.log(err); }
        //});
        var agent = new HttpsProxyAgent({
            proxyHost: '188.166.214.133',
            proxyPort: 1088
        });
        Https.request({
            // like you'd do it usually...
            host: 'api.telegram.org',
            port: 443,
            method: 'GET',
            path: '/',
            agent: agent
        }, function (res) {
            res.on('data', function (data) {
                console.log(data.toString());
            });
        }).end();
    }
    bold(message) {
        if (message === undefined) {
            return;
        }
        return `<b>${message}</b>`;
    }
}
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
const test = () => __awaiter(this, void 0, void 0, function* () {
    let smsNotifier = new SmsNotifier();
    smsNotifier.init("sms", "cd486eb0-6f4f-f044-4563-ba577c7da3dd", "9829112723");
    //await smsNotifier.sendMessage("Hi");
    let telegramNotifier = new TelegramNotifier();
    telegramNotifier.init("telega", "262229022:AAFrEB6fsvPoQuDdVmJyYgVXQxEeUsEpguQ", "154621824");
    yield telegramNotifier.sendMessage("Hi");
});
test().catch(err => {
    console.log(err);
});
//# sourceMappingURL=app.js.map