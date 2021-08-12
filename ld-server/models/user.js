'use strict';
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize
  class User extends Model {}
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email is a required field'
        },
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        },
        notNull: {
          args: true,
          msg: 'Email cannot be null'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is a required field'
        },
        len: {
          args: [6],
          msg: 'Password min 6 character'
        },
        notNull: {
          args: true,
          msg: 'Password cannot be null'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, opt) => {
        user.password = hashPassword(user.password)
      }
    }
  })
  
  User.associate = function(models) {
    
  };
  return User
};