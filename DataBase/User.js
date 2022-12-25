const {Schema, model} = require('mongoose');
const authService = require("../services/oauth.service");

const userSchema = new Schema({
    name: {type: String, required: true, default: ''},
    email: {type: String, required: true, unique: true, lowercase: true, trim: true},
    age: {type: Number, default: 18},
    avatar: String,
    password: {type: String}
}, {
    timestamps: true,
    //for the operation of virtual fields
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
    //for the operation of virtual fields
})

//virtual fields are used only on 'find'
    userSchema.virtual('fullName').get(function (){
        return `${this.name} surname`
    })


userSchema.statics = { // for schema //this = model
    testStatic() {
        console.log("I am static");
    },
    async createUserWithHashPassword(userObject = {}) {
        const hashPassword = await authService.hashPassword(userObject.password);

        await this.create({...userObject, password: hashPassword});
    }
}
userSchema.methods = { // for single record //this = record
    testMethod() {
        console.log("I am method");
    },
    async comparePasswords(password) {
        await authService.comparePasswords(this.password, password);
    }
}
module.exports = model('User', userSchema);