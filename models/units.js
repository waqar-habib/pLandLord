module.exports = function(sequelize, DataTypes) {
    var Unit= sequelize.define("Unit", {
      id: DataTypes.ID,
      number: DataTypes.INT,
      base_price: DataTypes.INT,
      number_of_rooms: DataTypes.INT,
      floor: DataTypes.INT,
      building: DataTypes.INT
    });
  
    Unit.associate = function(models) {

      Unit.hasMany(models.Tenant, {
        onDelete: "cascade"
      });
    };
  
    return Unit;
  };