module.exports = function(sequelize, DataTypes) {
    var Bill= sequelize.define("Bill", {
      // Giving the Author model a name of type STRING
   
      complex_id: DataTypes.INTEGER,
      unit_id: DataTypes.INTEGER,
      tenant_id: DataTypes.INTEGER,
      lease_id: DataTypes.INTEGER,
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