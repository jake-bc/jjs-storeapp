# BigCommerce Sample App: Node.js

This is a small Node.js application that implements the OAuth callback flow for BIgCommerce [Single Click Apps][single_click_apps]. For information on how to develop apps for BigCommerce stores, see our [Developer Portal][devdocs].

### Registering the app with BigCommerce

### Getting started

* Clone this repo
* Change to the repo directory
* Install npm packages: `npm install`
* Copy `.env-example` to `.env`
* Edit `.env`:
	* Set `CLIENT_ID` and `CLIENT_SECRET` to values obtained from the Control Panel or Developer Portal
	* Set `MLABS` url, e.g(mongodb://user:password@ds123456.mlab.com:40948/param)
* You can remove the Airbrake setup in server.js it's optional, I just found it helpful.
* Run the app with `npm start`

### Hosting the app
In order to install this app in a BigCommerce store, it must be hosted on the public Internet.

### Installing the app in your trial store

[single_click_apps]: https://developer.bigcommerce.com/api/#building-oauth-apps
[api_client]: https://github.com/getconversio/node-bigcommerce
[devdocs]: https://developer.bigcommerce.com
