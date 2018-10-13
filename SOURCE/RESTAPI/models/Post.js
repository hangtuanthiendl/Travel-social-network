var sequelize = require('../config/configDB.js');
const Post = sequelize.define('tb_posts');
module.exports = Post;