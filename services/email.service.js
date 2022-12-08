const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');
const emailTemplates = require('../email-templates');
const {USER_NAME_EMAIL, USER_NAME_EMAIL_PASSWORD} = require('../config/config');
const ApiError = require("../error/ApiError");

const sendEmail = async (receiverMail, emailAction, locals) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: USER_NAME_EMAIL,
            pass: USER_NAME_EMAIL_PASSWORD
        }
    });
    const templateInfo = emailTemplates[emailAction];

    if (!templateInfo) {
        throw new ApiError('Wrong template', 500)
    }

    const templateRender = new EmailTemplates({
        views: {
            root: path.join(process.cwd(), 'email-templates')
        }
    });

    Object.assign(locals || {}, {frontendURL:'google.com'})

    const html = await templateRender.render(templateInfo.templateName, locals);

    return transporter.sendMail({
        from: 'User name',
        to: receiverMail,
        subject: templateInfo.subject,
        html
    });
}
module.exports = {
    sendEmail
}