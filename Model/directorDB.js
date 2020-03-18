// const Sequelize = require('sequelize');
// const db = require('./sequalizeConfig');
const model = require('./model')

function getAllData() {
    return model.Director.findAll({ raw: true }).then( result => {
        return result;
    })
}

function getDataForId(id) {
     return model.Director.findAll({ where: { director_id: id }, raw: true }).then( result => {
        return result
    })
}

function addNewEntry(name) {
    model.Director.create({ director_name: name }).then(() => {
    });
}
 function updateEntry(name, id) {
    model.Director.update(
        {
            director_name:  name
        },
        { 
            where: 
            {
                id: id
            }
        }
    ).then(count => {
        console.log('Rows updated ' + count);
    });
}

function deleteEntry(id) {
    model.Director.destroy({
        where: {id: id}
    })
}
module.exports = {
    getAllData,
    getDataForId,
    addNewEntry,
    updateEntry,
    deleteEntry
}