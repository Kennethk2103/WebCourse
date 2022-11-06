'use strict';
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const request = require("request");
const https = require("https");
const path = require("path");
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/images'));


app.use(bodyParser.urlencoded({ extended: true }));
app.get("/" ,function (req, res) {
    res.sendfile(__dirname + "/index.html");
})

app.post("/Page2.html", function (req, res) {
    res.sendfile(__dirname + "/Page2.html");
})

app.listen(3000, function () {
    console.log("Server is running on port 3000");
})

app.post("/", function (req, res) {
    var Email = req.body.email;
    var FirstName = req.body.fName;
    var LastName = req.body.lName;

    var data = {
        members: [{
            email_address: Email,
            status: "subscribed",
            merge_fields: {
                FNAME: FirstName,
                LNAME: LastName
            }

        }
        ]

    }
    var jsonData = JSON.stringify(data);

    const url = "https://usX.api.mailchimp.com/3.0/lists/";

    const options = {
        method: "POST",
        aut:"thing:",
    }
    const Request = https.request(url, options, function (response) {
        res.sendFile(__dirname + "/index.html");

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })
    Request.write(jsonData);
    Request.end();

})

