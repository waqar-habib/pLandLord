module.exports = function(sequelize, DataTypes) {
    var Complex = sequelize.define("Complex", {
      // Giving the Author model a name of type STRING
      name: DataTypes.STRING
    });
  
    Complex.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Complex.hasMany(models.Units, {
        onDelete: "cascade"
      });
    };
  
    return Complex;
  };
  