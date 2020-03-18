const model = require('./model');


function getAllData() {
    return model.Movies.findAll({ raw: true }).then( result => {
        return result;
    })
}

function getDataForId(rank) {
     return model.Movies.findAll({ where: { rank: rank }, raw: true }).then( result => {
        return result
    })
}

function addNewEntry(name) {
    model.Movies.create({ director_name: name }).then(() => {
    });
}
 function updateEntry(name, id) {
    model.Movies.update(
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

function checkIdInDirector(id) {
    return model.Director.findAll({ where: { rank: id }, raw: true }).then( result => {
        return result;
    })
}
function deleteEntry(id) {
    model.Movies.destroy({
        where: {id: id}
    })
}
module.exports = {
    getAllData,
    getDataForId,
    addNewEntry,
    updateEntry,
    deleteEntry,
    checkIdInDirector
}