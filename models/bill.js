module.exports = function(sequelize, DataTypes) {
    var Bill= sequelize.define("Bill", {
      
      unit_id: DataTypes.INTEGER,
      tenant_id: DataTypes.INTEGER,
      lease_id: DataTypes.INTEGER,
      date: DataTypes.DATEONLY
    });
  
    Bill.associate = function(models) {
    
      Bill.hasMany(models.Charge, {
        onDelete: "cascade"
      });
    };
  
    return Bill;
  };