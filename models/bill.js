module.exports = function(sequelize, DataTypes) {
    var Bill= sequelize.define("Unit", {
      // Giving the Author model a name of type STRING
      id: DataTypes.id,
      complex_id: DataTypes.INT,
      unit_id: DataTypes.INT,
      tenant_id: DataTypes.INT,
      lease_id: DataTypes.INT,
      date: DataTypes.DATEONLY
    });
  
    Bill.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Bill.hasMany(models.Charge, {
        onDelete: "cascade"
      });
    };
  
    return Bill;
  };