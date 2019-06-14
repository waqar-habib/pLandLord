module.exports = function(sequelize, DataTypes) {
    var Unit= sequelize.define("Unit", {
      // Giving the Author model a name of type STRING
      id: DataTypes.id,
      number: DataTypes.INT,
      base_price: DataTypes.INT,
      number_of_rooms: DataTypes.INT,
      floor: DataTypes.INT,
      building: DataTypes.INT
    });
  
    Unit.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Unit.hasMany(models.Tenant, {
        onDelete: "cascade"
      });
    };
  
    return Unit;
  };