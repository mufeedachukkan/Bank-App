const jwt = require('jsonwebtoken')
const datab = require('./db')

const register = (accno, name, pswd) => {
    return datab.User.findOne({ accno: accno }).then(user => {
        if (user) {
            return {
                statusCode: 422,
                status: false,
                message: "already exist"
            }
        }
        else {
            const newUser = new datab.User({
                accno,
                name,
                pswd,
                balance: 0,
                transaction: []
            })
            newUser.save()
            currentName = name
            currentAccount = accno
            currentBalance = 0
            const token = jwt.sign({
                accountNo: accno
            }, 'supersecretkey@123')
            return {
                statusCode: 200,
                status: true,
                message: "registered successfully",
                token,
                currentName,
                currentAccount,
                currentBalance
            }
        }
    })
}

const signIn = (accountNo, password) => {
    return datab.User.findOne({ accno: accountNo, pswd: password }).then(item => {
        console.log("item", item)
        if (item) {
            currentName = item.name
            currentAccount = accountNo
            currentBalance = item.balance
            const token = jwt.sign({
                accountNo: accountNo
            }, 'supersecretkey@123')

            return {
                statusCode: 200,
                status: true,
                message: "login successfully",
                token,
                currentName,
                currentAccount,
                currentBalance
            }
        }
        else {
            return {
                statusCode: 422,
                status: false,
                message: "invalid username or password"
            }
        }
    })
}
const deleteAccount=(accno)=>{
    return datab.User.deleteOne({ accno: accno }).then(
        item=>{
            console.log(item)
            if(!item){
                return{
                    statusCode:422,
                    status:false,
                    message:"operation failed"
                }
            }
            else{
                return{
                    statusCode:200,
                    status:true,
                    message:accno+" deleted successfully"
                }
            }
            
        }
    )
}
module.exports = { register, signIn , deleteAccount }