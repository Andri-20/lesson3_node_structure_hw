const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {type: String, required: true, default: ''},
    email: {type: String, required: true, unique: true, lowercase: true, trim: true},
    age: {type: Number, default: 18},
    password: {type: String}
}, {
    timestamps: true
})
module.exports = model('User', userSchema);