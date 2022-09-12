const functions = require('firebase-functions');
const app = require('../build/app.js');

exports.app = functions.https.onRequest(app);
