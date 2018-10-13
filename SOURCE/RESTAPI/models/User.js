var sequelize = require('../config/configDB.js');
const User = sequelize.define('tb_users');
module.exports = User;