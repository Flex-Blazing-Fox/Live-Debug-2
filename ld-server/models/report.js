'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = Sequelize.sequelize
  class Report extends Model {}
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
  
  Report.associate = function(models) {

  };
  return Report
};