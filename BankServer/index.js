const cors = require('cors')
const express = require('express')
const credit = require('./services/credit')
const dataService = require('./services/registerservice')
const deposit = require('./services/transaction')
const history = require('./services/history')
const jwt = require('jsonwebtoken')

const app = express()

app.use(cors({
    origin: 'http://localhost:4200'
}))
const appMiddleware = (req, res, next) => {
    console.log("application specific middleware")
    next()
}
const jwtTokenMiddleware = (req, res, next) => {
    try {
        const token = req.header("access-token")
        console.log("token", token)
        const data = jwt.verify(token, 'supersecretkey@123')
        if (req.body.accno == data.accountNo) {
            next()
        }
        else{
            console.log("else block")
            res.status({
                statusCode: 422,
                status: false,
                message: "please check your account number"
            }) 
        }
    }
    catch {
        return {
            statusCode: 422,
            status: false,
            message: "please check your account number"
          }
    }
}
app.use(appMiddleware)
app.use(express.json())
app.get('/', (req, res) => {
    res.send("welcome")
})
app.post('/register', (req, res) => {
    dataService.register(req.body.accno, req.body.name, req.body.password, req.body.balance)
        .then(result => {
            res.status(result.statusCode).json(result)
        }
        )
})
app.post('/credit', jwtTokenMiddleware, (req, res) => {
    credit.credit(req.body.name, req.body.accno, req.body.pan, req.body.salary, req.body.aadhar)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})
app.post('/login', (req, res) => {
    console.log("login body", req.body)
    dataService.signIn(req.body.accno, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/deposit', jwtTokenMiddleware,(req, res) => {   
        deposit.deposit(req.body.accno, req.body.pswd, req.body.amount)
            .then(result => {
                console.log("result", result)
                res.status(result.statusCode).json(result)
            })
})
app.post('/withdraw', jwtTokenMiddleware,(req, res) => {
    console.log(req.body)
    deposit.withdraw(req.body.accno, req.body.pswd, req.body.amount)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})
app.post('/history', (req, res) => {
    history.getTransaction(req.body.accno)
        .then(result => {
            res.json(result)
        })
})
app.delete('/deleteAccount/:accno',(req,res)=>{
    dataService.deleteAccount(req.params.accno)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.listen(3001, () => {
    console.log("server started")
})