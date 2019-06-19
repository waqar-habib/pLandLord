module.exports = function(sequelize, DataTypes) {
    var Charge= sequelize.define("Charge", {
      amount: DataTypes.INTEGER,
      for: DataTypes.STRING
    });
    return Charge;
  };