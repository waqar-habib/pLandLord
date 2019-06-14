module.exports = function(sequelize, DataTypes) {
    var Charge= sequelize.define("Tenant", {
      // Giving the Author model a name of type STRING
      id: DataTypes.id,
      bill_id: DataTypes.id,
      amount: DataTypes.INT,
      for: DataTypes.STRING,

      
    });
  

  
    return Charge;
  };