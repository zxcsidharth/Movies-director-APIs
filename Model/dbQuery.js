const { Pool } = require('pg');
// const data = require('./data/movies.json');
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "movies_data",
    password: "postgres",
    port: 5432,
    max: 20
})
// function insertDirector() {
//     return pool
//   .connect()
//   .then(client => {
//     return client
//       .query(`create table director(director_id serial primary key, director_name varchar(35))`)
//       .then(() => {
        // let id = 1;
        // const result = data.reduce((emptyObj, arrayObj) => {
        //     if(!emptyObj[arrayObj.Director]) {
        //         emptyObj[arrayObj.Director] = id++;
        //         client.query(`INSERT INTO director (director_name) VALUES('${arrayObj.Director}')`)
        //     }
        //     return emptyObj;
        // }, {})
//         client.release()
//         return result;
//       })
//       .catch(err => {
//         client.release()
//         console.log(err.stack)
//       })
//     })
// }
// function insertMovies(dirObj) {
//     pool
//   .connect()
//   .then(client => {
//     return client
//       .query(`create table IF NOT EXISTS movies(rank integer primary key, title varchar(70), description varchar(500),
//              runtime integer, genre varchar(30), rating numeric, metascore varchar(10), votes integer, gross_earning varchar(15), 
//              actor varchar(50), year integer, director_id integer)`)
//       .then(() => {
        // data.forEach((arrayObj) => {
        //     let value = Object.values(arrayObj);
        //     value.splice(9, 1);
        //     value.push(dirObj[arrayObj.Director]);
        //     console.log(value);
        //     client.query('INSERT INTO movies VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',value)
        // })
//         client.release();
//       })
//       .catch(err => {
//         client.release()
//         console.log(err.stack)
//       })
//     })
// }

// async function dbCall() {
//     try {
//         let dirObj = {};
//         dirObj = await insertDirector(dirObj);
//         await insertMovies(dirObj);
//     } catch(error) {
//         console.log(error.stack);
//     }
// }
// dbCall();

async function getAllData(query) {
 const result = await pool
  .connect()
  .then(client => {
    return client
      .query(query)
      .then(res => {
        client.release();
        console.log(res);
        return res.rows;
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })
  return result;
}

async function addNewEntry(query, value) {
    await pool
    .connect()
    .then(client => {
      return client
        .query(query, value)
        .then(() => {
          client.release();
        })
        .catch(err => {
          client.release()
          console.log(err.stack)
        })
    })
}
async function updateEntry(query) {
    await pool
    .connect()
    .then(client => {
      return client
        .query(query)
        .then(() => {
          client.release();
        })
        .catch(err => {
          client.release()
          console.log(err.stack)
        })
    })
}
async function checkidInDirector(query) {
  const result = await pool
  .connect()
  .then(client => {
    return client
      .query(query)
      .then(res => {
        client.release();
        if(res.rowCount > 0) return true;
        return false;
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })
  return result;
}
module.exports = {
    getAllData,
    addNewEntry,
    updateEntry,
    checkidInDirector
}


