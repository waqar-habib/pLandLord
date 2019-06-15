module.exports = function(sequelize, DataTypes) {
    var Unit= sequelize.define("Unit", {
     
      number: DataTypes.INTEGER,
      base_price: DataTypes.INTEGER,
      number_of_rooms: DataTypes.INTEGER,
      floor: DataTypes.INTEGER,
      building: DataTypes.INTEGER
    });
  
    Unit.associate = function(models) {

      Unit.hasMany(models.Tenant, {
        onDelete: "cascade"
      });
    };
  
    return Unit;
  };