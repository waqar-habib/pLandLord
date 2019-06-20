var db = require("../models");

var path =require('path');

module.exports = function(app) {
    app.get("/home", function(req, res){
        res.sendFile(path.join(__dirname, "../public/home.html"));

    });
    
    app.get("/current", function(req, res){
        res.sendFile(path.join(__dirname, "../public/current.html"));

    });

<<<<<<< HEAD
=======
    app.get("/revenue", function(req, res){
        res.sendFile(path.join(__dirname, "../public/revenue.html"));

    });
>>>>>>> 984705f93497e0fb24ae2cbfe7b827927c84ac8c
    app.get("/future", function(req, res){
        res.sendFile(path.join(__dirname, "../public/future.html"));

    });
<<<<<<< HEAD
  
  
=======
    
>>>>>>> 984705f93497e0fb24ae2cbfe7b827927c84ac8c
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
      });


};
