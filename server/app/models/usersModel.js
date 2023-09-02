module.exports = (sequelize, Sequelize, DataTypes) => {
    const User = sequelize.define('users', {
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
                    args:[2, 15],
                    msg: 'User first name should be between 2 to 15 characters'
                }
            }
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args:[5, 15],
                    msg: 'User last name should be between 5 to 15 characters'
                }
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'Email should be of type email'
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [8,20],
                    msg: 'Password length should be between 8 to 20 characters'
                }
            }
        },
        role: {
            type: Sequelize.ENUM('user', 'organizer', 'admin'),
            defaultValue: 'user',
            validate: {
                isIn: {
                    args: ['user', 'organizer', 'admin'],
                    msg: ['User type can be only user or organizer']
                }
            }
        },
        resetToken: {
            type: Sequelize.STRING
        }
    })
    return User;
}