const express = require('express');
const dbCall = require('../Model/dbQuery');
const validate = require('../Model/validation');
const route = express.Router();

route.get('/', (req, res) => {
    dbCall.getAllData('select * from movies')
    .then( dbData => {
        res.status(200).json(dbData);
    })
})
route.get('/:id', (req, res) => {      //checked
    if(validate.validateID(req.params)) {
        dbCall.getAllData(`SELECT * FROM movies WHERE rank = ${req.params.id}`)
        .then( movies => {
            res.status(200).json(movies);
        })
    } else {
        res.status(422).json({
            status: 'error',
            message: 'Invalid request data'
        });
    } 
})

route.post('/', (req, res) => {  //checked
    if(validate.validateUpdateMovies(req.body)) {
        dbCall.checkidInDirector(req.body.director_id)
        .then(boolValue => {
            if(boolValue) {
                const value = Object.values(req.body);
                dbCall.addNewEntry('INSERT INTO movies VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', value)
                .then( () => {
                    res.status(200).send("added movies into movies tablel");
                })
                .catch(err => console.log(err.stack));
            } else {
                res.status(422).json({
                    status: 'error',
                    message: 'This Director ID does not exist in the director table'
                });
            }
        })
    } else {
        res.status(422).json({
            status: 'error',
            message: 'Invalid data Request',
            data: req.body
        });
    }
})
route.put('/:columnName/:rank', (req, res) => {
    const columName = {
        rank:1,
        title:1,
        description:1,
        runtime:1,   
        genre:1,       
        rating:1,         
        metascore:1,
        votes:1,     
        gross_earning:1,
        actor:1,
        year:1,         
        director_id:1
    }
    if(columName[req.params.columnName]) {
        console.log(validate.validateUpdation(req.params));
        if(validate.validateUpdation(req.params)) {         // checked
            dbCall.updateEntry(`UPDATE movies SET ${req.params.columnName} = '${req.body.name}' where rank = ${req.params.rank}`)
            .then(() => {
                res.status(200).send("updated Movies for given ID");
            })
            .catch(error => console.log(error.message));
        } else {
            res.status(422).json({
                status: 'error',
                message: 'Invalid data Request',
                data: req.body
            });
        }
    } else {
        res.status(422).json({
            status: 'error',
            message: 'column name is wrong'
        })
    }
})
route.delete('/:id', (req, res) => {   // checked
    if(validate.validateID(req.params)) {
        dbCall.deleteEntry(req.params.id)
        .then(() => {
            res.status(200).send("deleted entry from movies for given ID");
        })
        .catch(error => console.log(error.stack));
    } else {
        res.status(422).json({
            status: 'error',
            message: 'Invalid data Request',
            data: req.body
        });
    }
})

module.exports = route;