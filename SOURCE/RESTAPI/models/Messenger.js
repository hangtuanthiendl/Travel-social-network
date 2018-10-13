var sequelize = require('../config/configDB.js');
const Messenger = sequelize.define('tb_messengers');
module.exports = Messenger;