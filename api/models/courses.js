"use strict";
const { Model, DataTypes } = require("sequelize");
const models = require("./index");
module.exports = (sequelize) => {
  class Courses extends Model {}
  Courses.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title required",
          },
          notEmpty: {
            msg: "Title required",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description required",
          },
          notEmpty: {
            msg: "Description required",
          },
        },
      },
      estimatedTime: DataTypes.STRING,

      materialsNeeded: DataTypes.STRING,
      userId: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Courses",
    }
  );
  //Model Associations
  Courses.associate = (models) => {
    Courses.belongsTo(models.Users, { foreignKey: "userId" });
  };
  return Courses;
};
