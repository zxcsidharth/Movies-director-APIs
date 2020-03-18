const Sequelize = require('sequelize');
module.exports = new Sequelize('movies_director', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 100000
    }
  });
