const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/BANKAPPNEW', { useNewUrlParser: true });
const User = mongoose.model('User', {
    accno: Number,
    name: String,
    pswd: String,
    balance: Number,
    transaction: Array
})
const Creditcard = mongoose.model('Creditcard', {
    name: String,
    accno: Number,
    pan: String,
    aadhar: Number,
    salary: Number
})
module.exports = { User, Creditcard }