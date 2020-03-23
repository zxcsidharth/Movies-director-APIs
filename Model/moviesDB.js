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

function addNewEntry(value) {
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
}
 function updateEntry(columnName, column_value, rank ) {
    model.Movies.update(
        {
            columnName:  column_value   //error 
        },
        { 
            where: 
            {
                rank: rank
            }
        }
    ).then(count => {
        console.log('Rows updated ' + count);
    });
}

function checkIdInDirector(id) {
    return model.Director.findAll({ where: { rank: id }, raw: true }).then( result => {
        if(result.length > 0) return true;
        return false;
    })
}
function deleteEntry(id) {
    return model.Movies.destroy({
        where: {rank: id}
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