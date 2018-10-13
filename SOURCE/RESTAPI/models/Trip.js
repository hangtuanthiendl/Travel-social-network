var sequelize = require('../config/configDB.js');
const Trip = sequelize.define('tb_trips');
module.exports = Trip;