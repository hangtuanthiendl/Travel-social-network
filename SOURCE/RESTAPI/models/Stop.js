var sequelize = require('../config/configDB.js');
const Stop = sequelize.define('tb_stops');
module.exports = Stop;