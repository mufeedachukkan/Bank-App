const mongoose = require('mongoose')
// mongopass
// XHgoW5sHj8Y870H5
// mongoose.connect('mongodb://localhost:27017/BANKAPPNEW', { useNewUrlParser: true });
mongoose.connect(
    'mongodb+srv://admin:XHgoW5sHj8Y870H5@cluster0.4bvzv9t.mongodb.net/BankApp?retryWrites=true&w=majority'
).then(()=>console.log("mongodb connected"))
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