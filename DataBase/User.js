const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {type: String,  default: ''},
    email: {type: String, unique: true, lowercase: true, trim: true},
    age: {type: Number, default: 18},
    password:{}
}, {
    timestamps: true
})
module.exports = model('User', userSchema);