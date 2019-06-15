module.exports = function(sequelize, DataTypes) {
    var Complex = sequelize.define("Complex", {
      // Giving the Author model a name of type STRING
     
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.INTEGER,
      phone: DataTypes.INTEGER
    });
  
    Complex.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Complex.hasMany(models.Unit, {
        onDelete: "cascade"
      });
    };
  
    return Complex;
  };
  