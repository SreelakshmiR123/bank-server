const users = require("../models/collections")
const jwt = require('jsonwebtoken')



//register-account creation
register = (req, res) => {
    //destructuring
    const { acno, psw, uname } = req.body
    console.log(acno)

    //check user data in collection
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(400).json({
                message: "user already exist",
                status: false,
                statusCode: 400

            })

        }
        else {
            //create object for user
            let newUser = new users({
                acno,
                uname,
                psw,
                balance: 0,
                transactions: []
            })

            //save in db
            newUser.save()
            res.status(201).json({
                message: "account created successfully",
                status: true,
                statusCode: 201

            })



        }
    })
}
//login accnt creation
login = (req, res) => {
    //access data from request body
    const { acno, psw } = req.body
    users.findOne({ acno, psw }).then(user => {
        if (user) {

            //token generation
            const token = jwt.sign({ acno }, "secretKey123")
            res.status(200).json({
                message: "login success",
                user: user,
                status: true,
                statusCode: 200,
                currentUser: user.uname,
                token: token
            })

        }
        else {
            res.status(404).json({
                message: "incorrect account number or password",
                status: false,
                statusCode: 404
            })
        }
    })
}
getBalance = (req, res) => {
    //access acno from request param
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                message: user.balance,
                status: true,
                statusCode: 200


            })
        }
        else {
            res.status(404).json({
                message: "user not present",
                status: false,
                statusCode: 404

            })
        }
    })
}
moneyTransfer = (req, res) => {

    const { sAcno, rAcno, amount, spsw, date } = req.body

    //convert amount to number
    var amnt = parseInt(amount)


    //check sender details
    users.findOne({ acno: sAcno, psw: spsw }).then(suser => {

        if (suser) {

            //check reciever details in db   
            users.findOne({ acno: rAcno }).then(ruser => {
                if (ruser) {
                    //check amount with sender balance
                    if (amnt <= suser.balance) {

                        //update sender object
                        suser.balance = suser.balance - amnt
                        suser.transactions.push({ tacno: rAcno, amount: amnt, type: "DEBIT", date })
                        suser.save()

                        //update sender object
                        ruser.balance = ruser.balance + amnt
                        ruser.transactions.push({ tacno: sAcno, amount: amnt, type: "CREDIT", date })
                        ruser.save()

                        res.status(200).json({
                            message: "transaction success!!",
                            status: true,
                            statusCode: 200
                        })

                    } else {
                        res.status(406).json({
                            message: "insuficient balance",
                            status: false,
                            statusCode: 406
                        })
                    }
                } else {
                    res.status(406).json({
                        message: "invalid credit credentials",
                        status: false,
                        statusCode: 404
                    })
                }


            })

        } else {
            res.status(404).json({
                message: "invalid debit credentials",
                status: false,
                statusCode: 404
            })
        }
    })
}

accountStatement = (req, res) => {
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                message: user.transactions,
                status: true,
                statusCode: 200



            })
        }
        else {
            res.status(404).json({
                message: "User not present",
                status: false,
                statusCode: 404
            })
        }
    })

}

accountDelete = (req, res) => {
    const { acno } = req.params
    users.deleteOne({ acno: acno }).then((response) => {
        console.log(response)
        if (response.acknowledged && response.deletedCount > 0)
            res.status(200).json({
                message: "deleted successfully",
                status: true,
                statusCode: 200
            })
        else
            res.status(404).json({
                message: "User not present",
                status: false,
                statusCode: 404
            })
    }).catch(() => {
            res.status(500).json({
                message: "Something went wrong",
                status: false,
                statusCode: 500
            })
        })
}

module.exports = { register, login, getBalance, moneyTransfer, accountStatement, accountDelete }