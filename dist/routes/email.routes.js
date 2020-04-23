"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// import SendEmailService from '../services/SendEmailService';
var emailRouter = express_1.Router();
emailRouter.get('/', function (request, response) {
    try {
        // const sendEmailService = new SendEmailService();
        return response.json({ message: 'estou aqui' });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = emailRouter;
