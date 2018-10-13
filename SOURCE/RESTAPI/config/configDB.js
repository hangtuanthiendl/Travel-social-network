//const sequelize  = new Sequelize('postgres://postgres:root@localhost:5433/postgres');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('test', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

module.exports = sequelize;
