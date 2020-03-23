const Sequelize = require('sequelize');
const db = require('../config/sequalizeConfig');

const Director = db.define('director', {
    director_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    director_name: {
        type: Sequelize.STRING, allowNull: false
    }
},
   {
        timestamps: false
    }
)

const Movies = db.define('movies', {
    rank: {type:Sequelize.INTEGER, primaryKey: true},
    title: {type: Sequelize.STRING, },
    description: {type: Sequelize.STRING, },
    runtime: {type: Sequelize.INTEGER, },
    genere: {type: Sequelize.STRING, },
    rating: {type: Sequelize.FLOAT, },
    metascore: {type: Sequelize.STRING, },
    votes: {type: Sequelize.INTEGER, },
    gross_earning: {type: Sequelize.STRING, },
    actor: {type: Sequelize.STRING, },
    year: {type: Sequelize.INTEGER, },
    director_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'directors',
            key: 'director_id'
          },
        onUpdate: "cascade",
        onDelete: "cascade"
     }
},
    {
        timestamps: false
    }
)

module.exports = {
    Director,
    Movies
}