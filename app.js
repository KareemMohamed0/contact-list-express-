let express = require('express');
let mongoose = require('mongoose');
let bodyparser = require('body-parser');
let cors = require('cors');
let path = require('path');
let passport = require('passport');

let fileUpload = require('express-fileupload');
let asyncAwait = require('express-async-await');


let config = require('./config/database');
let app = asyncAwait(express());

let route = require('./routes/route');
let user = require('./routes/user');
let product = require('./routes/product');
let cobone = require('./routes/cobone');

//Data base config
mongoose.connect(config.databasePro);
mongoose.connection.on('connected', () => {
    console.log(`connected`)
});
mongoose.connection.on('error', (error) => {
    if (error) console.log(`error : ${error}`)
    else console.log(`connected`)
});


let port = process.env.PORT || 3000;

app.use(fileUpload());
app.use(cors());
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public/')));


app.use('/api', route);
app.use('/user', user);
app.use('', product);
app.use('/discount', cobone);


//passport middleawre
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);



app.get('/', (req, res) => {
    res.send('root page')
});



app.listen(port, () => { console.log(`server started at port ${port}`) });