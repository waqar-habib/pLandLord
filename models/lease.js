module.exports = function(sequelize, DataTypes) {
    var Lease= sequelize.define("Lease", {
      // Giving the Author model a name of type STRING
    
      start_date: DataTypes.DATEONLY,
      end_date: DataTypes.DATEONLY,
      term: DataTypes.INTEGER,
      url: DataTypes.STRING,
      unit_id: DataTypes.INTEGER,
      tenant_id: DataTypes.INTEGER,
      month_to_month:DataTypes.BOOLEAN
      
    });
  

  
    return Lease;
  };