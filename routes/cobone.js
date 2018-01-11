const express = require('express');
const router = express.Router();
const passport = require('passport');

let Cobone = require('../models/cobone');

let isAthunticated = passport.authenticate('jwt', { session: false });


router.get('/cobones', isAthunticated, (req, res, next) => {
    Cobone.find((err, cobones) => {

        if (err) return res.status(400).send({ success: true, msg: err })

        return res.status(200).send({ success: true, msg: cobones })
    }).populate('product');
});

router.get('/cobones/:id', isAthunticated, (req, res, next) => {
    Cobone.find({ _id: req.params.id }, (err, cobones) => {
        if (err) return res.send(err);
        return res.status(200).send({ success: true, msg: cobones })
    })

});

router.delete('/delete', isAthunticated, (req, res, next) => {
    Cobone.remove((err, cobones) => {
        if (err) return res.send(err);
        return res.status(200).send({ success: true, msg: cobones })
    })

});

router.post('/cobones', isAthunticated, (req, res, next) => {
    let objects = req.body;

    Cobone.create(objects, (err, cobones) => {
        console.log(err, cobones)
        if (err) return res.send({ msg: `something went wrong ${err}` });
        return res.send({ msg: cobones, success: true });
    })

});



module.exports = router;