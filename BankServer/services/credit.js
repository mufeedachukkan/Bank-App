const datab = require('./db')
const credit = (name, acno, pan, salary, aadhar) => {
    return datab.Creditcard.findOne({ accno: acno }).then(user => {
        if (user) {
            return {
                statusCode: 422,
                status: false,
                message: "this user already apply in credit card"
            }
        } else {
            if (salary >= 2500) {
                const newCreditcard = new datab.Creditcard({
                    name,
                    accno: acno,
                    pan,
                    aadhar,
                    salary
                })
                newCreditcard.save() 
                return {
                    statusCode: 200,
                    status: true,
                    message: "credit card created successfully"
                }
            } else {
                return {
                    statusCode: 422,
                    status: false,
                    message: "not eligible"
                }
            }
        }
    })
}
module.exports = { credit }