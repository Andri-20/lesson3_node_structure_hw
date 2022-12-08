const {WELCOME, FORGOT_PASSWORD} = require("../config/email-action.enum");
module.exports = {
    [WELCOME]: {
        subject: "Welcome on board",
        templateName: 'welcome'

    },
    [FORGOT_PASSWORD]: {
        subject: "Your password is under protect",
        templateName: 'forgot-password'
    }
}