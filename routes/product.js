const express = require('express');
const router = express.Router();
const passport = require('passport');

let Product = require('../models/product');

let isAthunticated = passport.authenticate('jwt', { session: false });


router.get('/products', isAthunticated, async (req, res, next) => {


    try {
        let products = await Product.find({});
        return res.status(200).json({ success: true, x: req.user })

    } catch (error) {
        return res.status(400).json({ success: true, msg: error })
    }
});

// router.get('/product/:id', isAthunticated, (req, res, next) => {
//     Contact.find({ _id: req.params.id }, (err, products) => {
//         if (err) return res.json(err);
//         return res.status(200).json({ success: true, msg: products })
//     })

// });

// router.post('/products', isAthunticated, (req, res, next) => {
//     let objects = req.body;

//     Product.create(objects, (err, products) => {
//         if (err) return res.json({ msg: `something went wrong ${err}` });
//         return res.json({ msg: `data added sucessfully`, products: products });
//     })

// });



module.exports = router;