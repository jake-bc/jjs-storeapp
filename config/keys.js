var BigCommerce = require('node-bigcommerce');
var dotenv = require('dotenv');
dotenv.load();

const Store = require("../models/Store");

var B = new BigCommerce({
    logLevel: 'info',
    clientId: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
    callback: 'https://jjsstoreapp.herokuapp.com/auth',
    responseType: 'json',
    apiVersion: 'v3' 
});

Store.findOne({client_id: process.env.CLIENT_ID}).then(store => {
        var v3 = new BigCommerce({
            clientId: process.env.CLIENT_ID,
            secret: process.env.CLIENT_SECRET,
            accessToken: store.access_token,
            responseType: 'json',
            apiVersion: 'v3'
        })

module.exports = {
    B: B,
    v3: v3
};
})