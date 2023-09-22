module.exports = (sequelize, Sequelize, DataTypes) => {
  const Review = sequelize.define("reviews", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [4, 5000],
          msg: "Review length should be between 4 to 5000 characters",
        },
      },
    }
  });
  return Review;
};
