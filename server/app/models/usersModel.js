const bcrypt = require("bcrypt");
module.exports = (sequelize, Sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 15],
          msg: "User first name should be between 2 to 15 characters",
        },
      },
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 15],
          msg: "User last name should be between 5 to 15 characters",
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email should be of type email",
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 20],
          msg: "Password length should be between 8 to 20 characters",
        },
      },
    },
    role: {
      type: Sequelize.ENUM("user", "organizer", "admin"),
      defaultValue: "user",
      validate: {
        isIn: {
          args: ["user", "organizer", "admin"],
          msg: ["User type can be only user or organizer"],
        },
      },
    },
    resetToken: {
      type: Sequelize.STRING,
    },
    resetTokenValidTime: {
      type: Sequelize.BIGINT,
    },
  });
  User.beforeSave(hashPassword);
  User.prototype.validatePassword = validatePassword;
  return User;
};

const hashPassword = async (user, options) => {
  if (!user.changed("password")) {
    return;
  }
  user.password = await bcrypt.hash(user.password, 10);
};

const validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
