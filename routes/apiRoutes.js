var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });



  /* COMPLEXES */

  // Get one complex by ID
  app.get("/api/complex", function(req, res) {
    db.Complex.findAll({}).then(function(dbComplex) {
      res.json(dbComplex);
    });
  });


  /* UNITS */

  // Get all or one units per ID


  /* TENANTS */

  // Get all or one tenants per ID
  app.get("/api/tenants", function(req, res) {
    db.Example.findAll({}).then(function(dbTenants) {
      res.json(dbTenants);
    });
  });


  /* BILLS */

  // Get all or one bills per ID
  

  /* LEASES */

  // Get all or one leases per ID
  


};
