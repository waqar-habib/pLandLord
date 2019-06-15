var db = require("../models");



// ALL TENANT RELATED API ROUTES

module.exports = function(app) {
  // Displays all tenants currently living in the complex
  app.get("/api/tenants", function(req, res) {
    db.tenant.findAll({}).then(function(dbtenants) {
      res.json(dbtenants);
    });
  });

  
  
  app.get("/api/tenants/:unit", function(req, res) {
    // 2; Displays all tenants living in a specific unit
    db.Tenant.findAll({
      where: {
        unit: req.params.unit,
        include: [db.Unit]
      }
    }).then(function(dbtenants) {
      res.json(dbtenants);
    });
  });
  
  app.get("/api/tenants/:shortleases", function(req, res) {
    // 2; Displays all tenants thast have one month or less left on their lease
    db.Tenant.findAll({
      where: {
        move_out_date: {
          lte:  // soon to be replaced by [Op.lte]
        }
      }
    }).then(function(dbtenants) {
      res.json(dbtenants);
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
