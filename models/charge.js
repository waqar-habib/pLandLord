module.exports = function(sequelize, DataTypes) {
    var Charge= sequelize.define("Tenant", {
      // Giving the Author model a name of type STRING
    
      amount: DataTypes.INTEGER,
      for: DataTypes.STRING,

      
    });
  

  
    return Charge;
  };