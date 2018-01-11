const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsertScheme = mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },

    cobone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cobone'
    },


});
const User = module.exports = mongoose.model('User', UsertScheme);

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

module.exports.getUserByUsername = (username, callback) => {
    const query = { username: username };
    User.findOne(query, callback).
        populate({
            path: 'cobone',
            model: 'Cobone',
            populate: {
                path: 'product',
                model: 'Product'
            }
        })
}

module.exports.uniqueUser = (username, callback) => {
    const query = { username: username };
    User.findOne(query, callback);
}
module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback)
        })
    })
}

module.exports.comparePassword = (candPassword, hash, callback) => {
    bcrypt.compare(candPassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}

//Eample of route guard 
module.exports.guard = (req, res, next) => {
    if (req.user.name != 'kareem')
        return res.status(400).json({ msg: 'you dont have permissions to access this url' });
    next();
}
