var sequelize = require('../config/configDB.js');
const Location = sequelize.define('tb_locations');
module.exports = Location;
