'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')

const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Report, { foreignKey: 'userId' })
    }
  }
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
  return User
};