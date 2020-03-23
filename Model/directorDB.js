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
    return model.Director.create({ director_name: name }).then(() => {
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
                director_id: id
            }
        }
    ).then(count => {
        console.log('Rows updated ' + count);
    });
}

function checkDirectorDetail(id, name) {
    return getDataForId(id).then(result => {
        if(result.length > 0) {
            return checkDoctorname(name).then((resArray) => {
                if(resArray.length > 0) return true;
                return false;
            }).catch(() => false) 
        } else {
            return false;
        }
    })
    .catch(() => {
        return false;
    })
}

function checkDoctorname(name) {
    return model.Director.findAll({ where: { director_name: name }, raw: true }).then( result => {
        return result
    })
}
function deleteEntry(id) {
    return model.Director.destroy({
        where: {director_id: id}
    })
}
module.exports = {
    getAllData,
    getDataForId,
    addNewEntry,
    updateEntry,
    deleteEntry,
    checkDirectorDetail
}