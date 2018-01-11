let express = require('express');
let router = express.Router();
let passport = require('passport');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');


let User = require('../models/user');
let Cobone = require('../models/cobone');

let config = require('../config/database');

let isAthunticated = passport.authenticate('jwt', { session: false });



// router.post('/upload', (req, res) => {


//     if (!req.files)
//         return res.send({ sucess: false, filePath: 'profileImages/deafult.jpg' });

//     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//     let sampleFile = req.files.profileImage;

//     // Use the mv() method to place the file somewhere on your server
//     sampleFile.mv(`public/profileImages/${sampleFile.name}`, (err) => {
//         if (err)
//             return res.status(500).send({ sucess: false, msg: 'something went wrong' });

//         return res.status(200).send({ sucess: true, filePath: `profileImages/${sampleFile.name}` });
//     });
// });

router.post('/register', async (req, res, next) => {

    let newUser = new User({

        username: req.body.username,
        password: req.body.password,

    });

    try {
        if (!newUser.username || !newUser.password)
            throw `pleasee enter your email and password`;
        let cobones = await Cobone.find({});

        if (cobones.length >= 1) {
            let rand = Math.floor((Math.random() * cobones.length) + 0);
            newUser.cobone = cobones[rand]._id;
        }

        let bcryptPass = await bcrypt.genSalt(10);
        let hashed = await bcrypt.hash(newUser.password, bcryptPass);
        newUser.password = hashed;

        let registerUser = await User.create(newUser);
        if (!registerUser)
            throw `something went wrong`;

        let token = jwt.sign(registerUser.toJSON(), config.secret, { expiresIn: 604800 });


        return res.status(200).json({ sucess: true, token: `Bearer ${token}`, msg: 'User registred' });


    } catch (error) {

        return res.status(400).json({ success: false, msg: error.message || error })

    }





});
router.post('/athunicate', (req, res, next) => {

    let username = req.body.username;
    let password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err)
            res.status(400).send({ sucess: false, msg: err.message });

        if (!user)
            return res.status(400).send({ sucess: false, msg: 'User not found' });

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err)
                return res.status(400).send({ sucess: false, msg: err.message });

            if (!isMatch)
                return res.status(400).send({ sucess: false, msg: 'Wrong password' });

            let token = jwt.sign(user.toJSON(), config.secret, { expiresIn: 604800 });


            return res.send({
                sucess: true,
                token: 'Bearer ' + token,
                user: {
                    id: user._id,
                    username: user.username,
                    cobone: user.cobone
                }
            })

        });
    })

});

// router.get('/allUsers', (req, res, next) => {

//     User.find().limit(1000)
//         .then((allUsers) => {

//             return res.status(200).send({ sucess: true, users: allUsers });
//         })
//         .catch((err) => {
//             return res.status(500).send({ sucess: false, msg: err })
//         })

// });

router.get('/profile', isAthunticated, (req, res, next) => {

    return res.send(req.user)

});



module.exports = router;