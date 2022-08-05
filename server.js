const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.enable('trust proxy')
app.use((req, res, next) => {
    req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
})

// Certificate
const privateKey = fs.readFileSync(process.env.PRIVKEY, 'utf8');
const certificate = fs.readFileSync(process.env.CERTY, 'utf8');
const ca = fs.readFileSync(process.env.CHAIN, 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const httpsServer = https.createServer(credentials, app);


httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var httpapp = express();

httpapp.get('*', function(req, res) {
    res.redirect('https://' + req.headers.host + req.url);
});

httpapp.listen(80);