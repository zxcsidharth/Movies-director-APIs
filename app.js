const express = require('express');
const dbCall = require('./dbQuery');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.get('/api/directors', (req, res) => {
    dbCall.getAllData('select * from director')
    .then( dbData => {
        res.status(200).json(dbData);
    })
})

app.get('/api/directors/:id', (req, res) => {
    if(Number.isInteger(req.params.id)) {
        dbCall.getAllData(`SELECT * FROM director WHERE director_id = ${req.params.id}`)
        .then( director => {
            res.status(200).json(director);
        })
    } else {
        res.send("Please Give Diretor id as an integer value");
    }
})

app.post('/api/directors', (req, res) => {

    dbCall.addNewEntry(`INSERT INTO director(director_name) VALUES('${req.body.director_name}')`)
    .then( () => {
        res.status(200).send("added Doctors into doctor table");
    })
    .catch(err => console.log(err.stack));
})

app.put('/api/directors/:id', (req, res) => {
    dbCall.updateEntry(`UPDATE director SET director_name = '${req.body.director_name}' where director_id = ${req.params.id}`)
    .then( () => {
        res.status(200).send("updated entry for given id");
    })
    .catch(error => console.log(error.stack));
})

app.delete('/api/directors/:id', (req, res) => {
    dbCall.updateEntry(`delete from director where director_id = ${req.params.id}`)
    .then( () => {
        res.status(200).send("deleted entry from director for given ID");
    })
    .catch(error => console.log(error.stack));
})

// endpoints for movies querry
app.get('/api/movies', (req, res) => {
    dbCall.getAllData('select * from movies')
    .then( dbData => {
        res.status(200).json(dbData);
    })
})
app.get('/api/movies/:id', (req, res) => {
    dbCall.getAllData(`SELECT * FROM movies WHERE rank = ${req.params.id}`)
    .then( movies => {
        res.status(200).json(movies);
    })
})

app.post('/api/movies', (req, res) => {
    const value = Object.values(req.body);
    dbCall.addNewEntry('INSERT INTO movies VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', value)
    .then( () => {
        res.status(200).send("added movies into movies tablel");
    })
    .catch(err => console.log(err.stack));
})
app.put('/api/movies/:id', (req, res) => {
    dbCall.updateEntry(`UPDATE movies SET title = '${req.body.name}' where rank = ${req.params.id}`)
    .then( () => {
        res.status(200).send("updated Movies for given ID");
    })
    .catch(error => console.log(error.stack));
})
app.delete('/api/movies/:id', (req, res) => {
    dbCall.updateEntry(`delete from movies where rank = ${req.params.id}`)
    .then(() => {
        res.status(200).send("deleted entry from movies for given ID");
    })
    .catch(error => console.log(error.stack));
})

app.listen(8080);
