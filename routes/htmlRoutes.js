var db = require("../models");

var path =require('path');

module.exports = function(app) {
    app.get("/home", function(req, res){
        res.sendFile(path.join(__dirname, "../public/home.html"));

    });
    
    app.get("/current", function(req, res){
        res.sendFile(path.join(__dirname, "../public/current.html"));

    });
  
  
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
      });


};
