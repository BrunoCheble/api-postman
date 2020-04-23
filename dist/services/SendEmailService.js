"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SendEmailService = /** @class */ (function () {
    function SendEmailService() {
        this.emails = [];
    }
    SendEmailService.prototype.execute = function (_a) {
        var emails = _a.emails, subject = _a.subject, body = _a.body;
        console.log({ emails: emails, subject: subject, body: body });
        return this.emails;
    };
    return SendEmailService;
}());
exports.default = SendEmailService;
