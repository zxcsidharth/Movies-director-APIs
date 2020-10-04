const express = require('express');
const dbCall = require('../Model/directorDB');
const validate = require('../Model/validation');
const route = express.Router();
route.get('/', (req, res) => {   //checked
    dbCall.getAllData()
    .then( dbData => {
        res.status(200).json(dbData);
    })
    .catch(err => console.log(err.message));
})

route.get('/:id', (req, res) => {   //checked
    if(validate.validateID(req.params)) {
        dbCall.getDataForId(req.params.id)
        .then( director => {
            res.status(200).json(director);
        })
        .catch(err => console.log(err.message));
    } else {
        res.status(422).json({
            status: 'error',
            message: 'Invalid request data',
        });
    }
})

route.post('/', (req, res) => {
    if(validate.validateDirName(req.body)) {    //checked
        dbCall.checkDirectorName(req.body.name)
        .then( resultRow => {
            if(resultRow.length > 0) {
                return dbCall.addNewEntry(req.body.name)
            } else {
                res.status(422).json({
                    status: 'error',
                    message: 'director name already exist',
                    data: req.body
                });
            }
        })
        .then(() => {
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
        dbCall.checkDirectorDetail(req.params.id, req.body.name)
        .then(result => {
            if(result) {
                return dbCall.updateEntry(req.body.name, req.params.id)
            }
        })
        .then(() => {
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
        dbCall.getDataForId(req.params.id)
        .then((result) => {
            if(result.length > 0) {
                return dbCall.deleteEntry(req.params.id)
            }
            else {
                res.status(422).json({
                    status: 'error',
                    message: `director Does'nt exist`
                });
            }
        }) 
        .then(() => {
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