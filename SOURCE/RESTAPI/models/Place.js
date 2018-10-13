var sequelize = require('../config/configDB.js');
const Place = sequelize.define('tb_places');
module.exports = Place;