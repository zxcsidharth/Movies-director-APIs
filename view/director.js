const express = require('express');
const dbCall = require('../Model/dbQuery');
const validate = require('../Model/validation');
const route = express.Router();
route.get('/', (req, res) => {   //checked
    dbCall.getAllData('select * from director')
    .then( dbData => {
        res.status(200).json(dbData);
    })
})

route.get('/:id', (req, res) => {   //checked
    if(validate.validateID(req.params)) {
        dbCall.getAllData(`SELECT * FROM director WHERE director_id = ${req.params.id}`)
        .then( director => {
            res.status(200).json(director);
        })
    } else {
        res.status(422).json({
            status: 'error',
            message: 'Invalid request data',
        });
    }
})

route.post('/', (req, res) => {
    if(validate.validateDirName(req.body)) {    //checked
        dbCall.addNewEntry(`INSERT INTO director(director_name) VALUES('${req.body.name}')`)
        .then( () => {
            res.status(200).send("added Doctors into doctor table");
        })
        .catch(err => console.log(err.message));
    } else {
        res.status(422).json({
            status: 'error',
            message: 'Invalid request data',
            data: req.body
        });
    }
})

route.put('/:id', (req, res) => {       //checked
    if(validate.validateID(req.params) && validate.validateDirName(req.body)) {
        dbCall.updateEntry(`UPDATE director SET director_name = '${req.body.name}' where director_id = ${req.params.id}`)
        .then( () => {
            res.status(200).send("updated entry for given id");
        })
        .catch(error => console.log(error.message));
    } else {
        res.status(422).json({
            status: 'error',
            message: 'Invalid request data',
            data: req.body
        });
    }
})

route.delete('/:id', (req, res) => {    //checked
    if(validate.validateID(req.params)) {
        dbCall.updateEntry(`delete from director where director_id = ${req.params.id}`)
        .then( () => {
            res.status(200).send("deleted entry from director for given ID");
        })
        .catch(error => console.log(error.message));
    } else {
        res.status(422).json({
            status: 'error',
            message: 'Invalid request data'
        });
    }
})

module.exports = route;