var db = require("../models");
const moment = require("moment");


// ALL TENANT RELATED API ROUTES

module.exports = function(app) {
  // Displays all tenants currently living in the complex
  app.get("/api/tenants", function(req, res) {
    db.Tenant.findAll({}).then(function(dbtenants) {
      res.json(dbtenants);
    });
  });

  
  
  app.get("/api/units/:id", function(req, res) {
    //  Displays all tenants living in a specific building
    db.Unit.findAll({
      where: {
        building: req.params.id,
        include: [db.Tenant]
      }
    }).then(function(dbtenants) {
      res.json(dbtenants);
    });
  });


  app.get("/api/tenant/move_out_date", function(req, res) {
    // 2; Displays all tenants that have one month or less left on their lease
    db.Tenant.findAll({
      where: {
        move_out_date: {
          $gt: startTime,
          $lte: moment().add(30, "days").toDate()  // Ask Tish how to make this value one month in time.
        }
      }
    }).then(function(dbtenants) {
      res.json(dbtenants);
    });
  });

  // Displays all of a Tenants Current Bills
  app.get("/api/tenant/:id", function(req, res) {
    db.Unit.findOne({
      where: {
        id: this.id,
        include: [db.Bills]
      }
    }).then(function(dbtenants) {
      res.json(dbtenants);
    });
  });

// ALL UNIT RELATED ROUTES
  // Displays all tenants currently living in one unit
  app.get("/api/units/:id", function(req, res) {
    db.Unit.findAll({
      where: {
        id: req.params.id,
        include: [db.Tenant]
      }
    }).then(function(dbtenants) {
      res.json(dbtenants);
    });
  });

  // Displays Units that have a specific number of rooms
  app.get("/api/units/number_of_rooms/:id", function(req, res) {
    db.Unit.findAll({
      where: {
        number_of_rooms: req.params.id,
        include: [db.Tenant]
      }
    }).then(function(dbtenants) {
      res.json(dbtenants);
    });
  });


  // Displays all units that are less than 1200 per month
  app.get("/api/units/base_price/low", function(req, res) {
    db.Unit.findAll({
      where: {
        base_price: {
          lte: 1200  
        }
      }
    }).then(function(dbtenants) {
      res.json(dbtenants);
    });
  });


  // Displays all units that are more than 1200 per month
  app.get("/api/units/base_price/high", function(req, res) {
    db.Unit.findAll({
      where: {
        base_price: {
          gte: 1200  
        }
      }
    }).then(function(dbtenants) {
      res.json(dbtenants);
    });
  });





// ALL LEASE RELATED ROUTES

  // Displays all leases that are month to month 
app.get("/api/lease/month_to_month", function(req, res) {
  db.Unit.findAll({
    where: {
      month_to_month: true,
      include: [tenant_id]
    }
  }).then(function(dbtenants) {
    res.json(dbtenants);
  });
});

//  Displays leases by length of term
app.get("/api/lease/:term", function(req, res) {
  db.Unit.findAll({
    where: {
      term: req.params.term,
      include: [tenant_id]
    }
  }).then(function(dbtenants) {
    res.json(dbtenants);
  });
});

app.delete("/api/tenants/:id", function(req, res) {
  db.Tenant.destroy({
  where: {
  id: req.params.id
}
}).then(function(dbtenants) {
  res.json(dbtenants);
});
});


};




















  
  
  
  
  
  
//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });




//   // Get all or one tenants per ID
//   app.get("/api/tenants", function(req, res) {
//     db.Example.findAll({}).then(function(dbTenants) {
//       res.json(dbTenants);
//     });
//   });

//   // Get all or one bills per ID
//   // Get one complex
//   // Get all or one leases per ID
//   // Get all or one units per ID


// };
