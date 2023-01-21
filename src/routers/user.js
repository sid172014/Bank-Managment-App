const express = require('express');
const User = require('../models/user');
const router = new express.Router();


//Setting up the endpoints
router.get('', (req, res) => {
    res.render('index')
})

router.get('/adduser', (req, res) => {
    res.render('addUser');
})

//Adding the user whose information will come from the body 
router.post('/adduser', async (req, res) => { // Here the 'req.body' will give us the object literal to create a new user
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send({
            message: "Account Created Successfully",
            error: undefined
        })
    } catch (e) {
        res.status(500).send({
            message: undefined,
            error: e
        })
    }
})





router.get('/allusers', async (req, res) => {
    try {
        const users = await User.find({});
        res.render('allusers', { // Here we are sending the values as object literals that can be passed to the hbs handler so it can be used in the website
            data: users
        });
    } catch (e) {
        res.status(404).render('404', {
            error: e
        })
    }
})

router.get('/transaction/:id',async (req, res) => {
    const data = await User.find({});

    res.render('transaction', {
        data : data
    });
})
router.patch('/transaction', async (req, res) => {
    const user = await User.findOne({
        name: req.body.senderName
    })
    const user2 = await User.findOne({
        name: req.body.beneficiaryName
    })
    if (!user) {
        res.status(404).send({
            message1: undefined,
            error1: "Sender does not exist"
        })
    } else if (!user2) {
        res.status(404).send({
            message2: undefined,
            error2: "Beneficiary does not exist"
        })
    } else {
        const transferAmount = req.body.amount;
        if (transferAmount > user.balance) {
            res.send({
                message: undefined,
                error3: "Insufficient funds"
            })
        } else {
            try {
                const left = Number(user.balance) - Number(transferAmount);
                await User.findByIdAndUpdate(user.id, {
                    balance: left
                })
                await user.save();
                const added = Number(user2.balance) + Number(transferAmount);
                await User.findByIdAndUpdate(user2.id, {
                    balance: added
                })
                res.send({
                    finalMessage: "Transaction Successfull !",
                    finalError: undefined
                })
            } catch (e) {

                res.status(500).send({
                    finalMessage: undefined,
                    finalError: e
                });
            }
        }
    }
})

router.get('/login', (req, res) => {
    res.render('login');
})
router.post('/checkLogin', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })

    if (!user) {
        res.send({
            message: undefined,
            error: "User does not exist"
        })
    } else {
        if (String(user.password) === String(req.body.password)) {
            res.send({
                message: user,
                error: undefined,
                id: user.id
            })
        } else {
            res.send({
                message: undefined,
                error: "Invalid Password"
            })
        }
    }
})
router.get('/delete', (req, res) => {
    res.render('delete');
})
router.delete('/delete',async (req,res) => {
    const user = await User.findOne({
        email : req.body.email
    })
    if(!user){
        res.send({
            message : undefined,
            error : "User does not exist"
        })
    }else{
        if(String(req.body.password) === String(user.password)){
                await User.findByIdAndDelete(user.id);
                res.send({
                    message : "Account Deleted",
                    error : undefined
                })
        }else{
            res.send({
                message: undefined,
                error : "Invalid Password"
            })
        }
    }
})

router.get('/temp' , (req,res) => {
    res.render('temp');
})
router.get('/*', (req, res) => [
    res.render('404')
])
module.exports = router;