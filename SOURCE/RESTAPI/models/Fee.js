var sequelize = require('../config/configDB.js');
const Fee = sequelize.define('tb_fees');
module.exports = Fee;