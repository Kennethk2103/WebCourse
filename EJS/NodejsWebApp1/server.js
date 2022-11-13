'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
var express = require('express');
var bodyParser = require('body-parser');
const app = express();
var items = ["buy food","cook food","eat food"];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let workItems = [];

app.get("/", function (req, res) {
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month:"long"
    }
    var day = today.toLocaleDateString("en-US", options);
    res.render("Page1", { ListTitle: day , newListItems:items});

});


app.listen(1337, function () {
    console.log("Server started on 1337");
})


app.post("/", function (req, res) {
    var item = req.body.newItem;

    if (req.body.Page1 === "work") {
        workItems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");

    }
    console.log(item);
});

app.get("/work", function (req, res) {
    res.render("Page1", { ListTitle: "Work List", newListItems: workItems });
})
app.post("/work", function (req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})