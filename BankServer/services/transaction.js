const datab = require('./db')
const deposit = (daccount, dpassword, amou) => {
  return datab.User.findOne({ accno: daccount, pswd: dpassword }).then(item => {
    if (item) {
      console.log("deposit item",item)
      item["balance"] = Number(item['balance']) + Number(amou)
      item.transaction.push({ mode: "online", status: "success", type: "deposit", amount: amou })
      item.save()
      currentBalance=item["balance"]
      console.log("currentBal",currentBalance)
      return {
        statusCode: 200,
        status: true,
        message: "amount added",
        currentBalance
      }
    } else {
      return {
        statusCode: 422,
        status: false,
        message: "invalid username or password"
      }
    }
  }
  )
}

const withdraw = (daccount, dpassword, amou) => {

  return datab.User.findOne({ accno: daccount, pswd: dpassword }).then(item => {
    console.log(item)
      if (item) {
        if (item.balance >= amou) {
          item["balance"] = Number(item['balance']) - Number(amou)
          item.transaction.push({ mode: "online", status: "success", type: "withdrawal", amount: amou })
          item.save()
          currentBalance=item["balance"]
          return {
            statusCode: 200,
            status: true,
            message: "amount added",
            currentBalance
          }
        }
        else{
          return {
            statusCode:404,
            message:"Insufficient balance"
          }
        }
      } else {
        return {
          statusCode: 422,
          status: false,
          message: "invalid username or password"
        }
      } 
  }
  )
}
module.exports = { deposit, withdraw }