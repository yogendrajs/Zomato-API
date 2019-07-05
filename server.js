const express = require('express');
const app = express()
const zomato = require('zomato');
const iplocation = require('iplocation').default;
const publicIp = require('public-ip');
const bodyparser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv')
dotenv.config();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
app.use(bodyparser.urlencoded({extended: false}))

var client = zomato.createClient({
    userKey: process.env.YOURUSERKEY, //as obtained from [Zomato API](https://developers.zomato.com/apis)
});

// for search.js to search for restaurant details in a city
var search = express.Router();
require('./Routes/search')(search, path, client);
app.use('/search', search)

// for geocode.js to search for location details for your location using your public-ip
var geocode = express.Router();
require('./Routes/geocode')(geocode, iplocation, publicIp, client);
app.use('/geocode', geocode)

// for categories.js to search for all the categories
var categories = express.Router();
require('./Routes/categories')(categories, client);
app.use('/categories', categories)


// your app listener
app.listen(process.env.PORT, () => {
    console.log(`your app is listening at port ${process.env.PORT}`);
})