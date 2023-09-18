module.exports = (sequelize, Sequelize, DataType) => {
  const Tour = sequelize.define("tours", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [10, 60],
          msg: "Tour title length should be between 10 and 60 characters",
        },
      },
    },
    organizer: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 20],
          msg: "Organizer name length should be between 5 and 20 characters",
        },
      },
    },
    maxPersonCapacity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 50,
          msg: "Minimum capacity should be 50 persons",
        },
        max: {
          args: 100,
          msg: "Maximum capacity should be 100 persons",
        },
      },
    },
    amountPerHead: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 500,
          msg: "Amount per head should be at least 500",
        },
        max: {
          args: 20000,
          msg: "Amount per head cannot exceed 20000",
        },
      },
    },
    image: {
      type: Sequelize.STRING,
    },
    startDate: {
      type: Sequelize.DATE,
      defaultValue: new Date(Date.now() + 24 * 60 * 60 * 1000),
      validate: {
        isDate: {
          args: true,
          msg: "startDate dataType should be date",
        },
      },
    },
    endDate: {
      type: Sequelize.DATE,
      defaultValue: new Date(Date.now() + 24 * 2 * 60 * 60 * 1000),
      validate: {
        isDate: {
          args: true,
          msg: "startDate dataType should be date",
        },
      },
    },
  });
  return Tour;
};
