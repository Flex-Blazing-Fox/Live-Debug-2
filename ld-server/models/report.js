'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Report.init({
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Description is a required field'
        },
        notNull: {
          args: true,
          msg: 'Description cannot be null'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Location is a required field'
        },
        notNull: {
          args: true,
          msg: 'Location cannot be null'
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Report'
  })
  return Report
};