module.exports = function(sequelize, DataTypes) {
    var Complex = sequelize.define("Complex", {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.INTEGER,
      phone: DataTypes.STRING
    });
  
    Complex.associate = function(models) {
      Complex.hasMany(models.Unit, {
        onDelete: "cascade"
      });
    };
  
    return Complex;
  };
  