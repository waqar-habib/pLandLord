module.exports = function(sequelize, DataTypes) {
    var Lease= sequelize.define("Tenant", {
      // Giving the Author model a name of type STRING
      id: DataTypes.id,
      start_date: DataTypes.DATEONLY,
      end_date: DataTypes.DATEONLY,
      term: DataTypes.INT,
      url: DataTypes.STRING,
      unit_id: DataTypes.INT,
      tenant_id: DataTypes.INT,
      month_to_month:DataTypes.BOOLEAN
      
    });
  

  
    return Lease;
  };