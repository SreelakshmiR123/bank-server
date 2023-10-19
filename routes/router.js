const express=require('express')
const{ register,login ,getBalance,moneyTransfer, accountStatement,accountDelete} = require('../controllers/logic')
const { jwtMiddleware } = require('../middlewares/jwtMiddleware')

//router object
const router=new express.Router()

//create ac-signup
router.post('/bankuser/create_acc',register)

//create login
router.post('/bankuser/login',login)

//check balance
router.get('/bankuser/balance/:acno',jwtMiddleware,getBalance)

//money Transfer
router.post('/bankuser/money-transfer',jwtMiddleware,moneyTransfer)

//account statement
router.get('/bankuser/account-statement/:acno',jwtMiddleware,accountStatement)

//delete account
router.delete('/bankuser/deleteaccount/:acno',jwtMiddleware,accountDelete)


//export router
module.exports=router