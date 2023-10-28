const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const USERGROUP = sequelize.define("UserGroup", {
  ID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  isadmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = USERGROUP;