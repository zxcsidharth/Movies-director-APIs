// const Sequelize = require('sequelize');
// const db = require('./sequalizeConfig');
const data = require('../data/movies.json');
const model = require('./model');
 async function insertDirector() {
    await model.Director.sync({ force: true }).then(() => {
        console.log("director table is created");
      });
    
      let id = 1;
      const result = data.reduce((emptyObj, arrayObj) => {
          if(!emptyObj[arrayObj.Director]) {
              emptyObj[arrayObj.Director] = id++;
              model.Director.create({ director_name: `'${arrayObj.Director}'` }).then(() => {
              });
          }
          return emptyObj;
      }, {})
      return result;
}

async function insertMovies(dirObj) {
    
    await model.Movies.sync({ force: true }).then(() => {
        console.log("movies table is created");
      });

      data.forEach((arrayObj) => {
        let value = Object.values(arrayObj);
        value.splice(9, 1);
        value.push(dirObj[arrayObj.Director]);
        model.Movies.create({ 
            rank: `${value[0]}`,
            title: `'${value[1]}'`,
            description: `'${value[2]}'`,
            runtime: `${value[3]}`,
            genere: `'${value[4]}'`,
            rating: `${value[5]}`,
            metascore: `${value[6]}`,
            votes: `${value[7]}`,
            gross_earning: `'${value[8]}'`,
            actor: `'${value[9]}'`,
            year: `${value[10]}`,
            director_id: `${value[11]}`,
        })
        .then(() => {

        });
    })
}

async function dbCall() {
    try{
        let dirObj = {};
        dirObj = await insertDirector();
        await insertMovies(dirObj);
    } catch(error) {
        console.log(error.message);
    }
}
dbCall();