const tokenTypes = require("../config/token-action.enum");
const {CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET, FORGOT_PASSWORD_ACTION_TOKEN_SECRET} = require("../config/config");
module.exports = {
    getSecretWordForActionToken: (actionType) => {
        let secretWord = '';

        switch (actionType) {
            case tokenTypes.CONFIRM_ACCOUNT:
                secretWord = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET;
                break;
            case tokenTypes.FORGOT_PASS:
                secretWord = FORGOT_PASSWORD_ACTION_TOKEN_SECRET;
                break;
        }
        return secretWord
    }
}