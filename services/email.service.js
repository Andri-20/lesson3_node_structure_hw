const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const emailTemplates = require('../email-templates');
const {USER_NAME_EMAIL, USER_NAME_EMAIL_PASSWORD, FRONTEND_URL} = require('../config/config');
const ApiError = require("../error/ApiError");
const {options} = require("joi");
const path = require("path");

const sendEmail = async (receiverMail, emailAction, context = {}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: USER_NAME_EMAIL,
            pass: USER_NAME_EMAIL_PASSWORD
        }
    });
    const templateInfo = emailTemplates[emailAction];

    if (!templateInfo?.subject || !templateInfo.templateName) {
        throw new ApiError('Wrong template', 500)
    }

    const options = {
        viewEngine: {
            defaultLayout: 'main',
            layoutsDir: path.join(process.cwd(), 'email-templates', 'layouts'),
            partialsDir: path.join(process.cwd(), 'email-templates', 'partials'),
            extname: '.hbs'
        },
        extName: '.hbs',
        viewPath: path.join(process.cwd(), 'email-templates', 'views'),
    }

    transporter.use('compile', hbs(options));

    context.frontendURL = FRONTEND_URL;

    return transporter.sendMail({
        from: 'User name',
        to: receiverMail,
        subject: templateInfo.subject,
        template: templateInfo.templateName,
        context
    });
}
module.exports = {
    sendEmail
}