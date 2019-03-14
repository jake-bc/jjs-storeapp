var BigCommerce = require('node-bigcommerce');
var dotenv = require('dotenv');
dotenv.load();

var B = new BigCommerce({
    logLevel: 'info',
    clientId: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
    callback: 'https://jjsstoreapp.herokuapp.com/auth',
    responseType: 'json',
    apiVersion: 'v3' 
});

module.exports = {
    B: B
};
