const {model, Schema} = require('mongoose');
const OAuthSchema = new Schema({
    refreshToken: {type: String},
    accessToken: {type: String},
    _user_id: {type: Schema.Types.ObjectId, ref: 'User'}
})
module.exports = model('OAuth', OAuthSchema)