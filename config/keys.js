var BigCommerce = require('node-bigcommerce');
var dotenv = require('dotenv');
dotenv.load();

console.log(token);
    var v3 = new BigCommerce({
        clientId: process.env.CLIENT_ID,
        secret: process.env.CLIENT_SECRET,
        accessToken: '2sw8ugjlzkb0wk4t0uus99xskqciojg',
        hash: 'xegfh',
        responseType: 'json',
        apiVersion: 'v3'
    });

        var B = new BigCommerce({
            logLevel: 'info',
            clientId: process.env.CLIENT_ID,
            secret: process.env.CLIENT_SECRET,
            callback: 'https://jjsstoreapp.herokuapp.com/auth',
            responseType: 'json',
            apiVersion: 'v3' 
        });


module.exports = {
    B: B,
    v3: v3
};

