const express = require('express');
const router = express.Router();
const passport = require('passport');

let Contact = require('../models/contact');

let isAthunticated = passport.authenticate('jwt', { session: false });


router.get('/contacts', isAthunticated, (req, res, next) => {
    Contact.find((err, contacts) => {
        console.log(contacts, '----------------------------------------------------------')
        return res.json(contacts)
    });
});

router.post('/contact', isAthunticated, (req, res, next) => {
    let object = req.body;
    if (!object.first_name || !object.last_name || !object.phone)
        return res.json({ msg: 'invalid data' });
    Contact.create(object, (err, contact) => {
        if (err) return res.json({ msg: `something went wrong ${err}` });
        return res.json({ msg: `data added sucessfully`, contact: contact });
    })

});

router.delete('/contact/:id', isAthunticated, (req, res, next) => {
    Contact.remove({ _id: req.params.id }, (err, result) => {
        if (err) return res.json(err);
        else return res.json(result);
    })

});


module.exports = router;