const datab = require('./db')

const getTransaction = (accno)=>{
    return datab.User.findOne({"accno":accno})
    .then(item=>{
        console.log(item)
        if(item){
            return {
                "statusCode":200,
                "status":true,
                "transaction":item.transaction.reverse()
            }
        }
        else{
            return{
                "statusCode":404,
                "status":false,
                "message":"fetching failed"
            }
        }
    })
}
module.exports={
    getTransaction
}