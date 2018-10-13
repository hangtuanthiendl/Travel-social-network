var sequelize = require('../config/configDB.js');
const Conversation = sequelize.define('tb_conversations');
module.exports = Conversation;