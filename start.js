'use strict';
var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
var http = require("http")
var pathUtils = require("path");
var express = require("express");
var app = express();
var PORT = process.env.PORT || 5000;
var appDir = pathUtils.resolve(__dirname, "build");

app.use(redirectToHTTPS());
app.use(express.static(appDir));

app.get("*", function (req, res) {
    res.sendfile(pathUtils.resolve(appDir, "index.html"));
});

http.createServer(app).listen(PORT, function () {
    console.log("Express server listening on port " + PORT);
    console.log("http://sf.dev.statecraft.one:" + PORT);
});