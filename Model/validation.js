const Joi = require('joi');

function validateID(reqObj) {
    const schema = Joi.object().keys({
        id: Joi.number().integer().positive().min(1).max(100).required(),
    })
    const result = Joi.validate(reqObj, schema); 
    if (result.error) return false
    return true;
}

function validateDirName(reqObj) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(30).required()
    })
    const result = Joi.validate(reqObj, schema)
    if (result.error) return false;
    return true;
}
function validateUpdateMovies(reqObj) {
    const schema = Joi.object().keys({
        rank: Joi.number().min(1).integer().positive().required(),
        title: Joi.string().min(2).max(50).required(),
        description: Joi.string().min(5).max(500).required(),
        runtime: Joi.number().integer().positive().required(),
        genere: Joi.string().min(2).max(50).required(),
        rating: Joi.number().required(),
        metascore: Joi.string().min(2).max(10).required(),
        votes: Joi.number().integer().positive().required(),
        gross_earning: Joi.string().required(),
        actor: Joi.string().min(3).max(50).required(),
        year: Joi.number().integer().max(2020).required(),
        director_id: Joi.number().integer().min(1).max(100).positive().required()
    })
    const result = Joi.validate(reqObj, schema)
    if (result.error) return false;
    return true;
}
function validateUpdation(reqObj) {
    const schema = Joi.object().keys({
        columnName: Joi.string().required(),
        rank: Joi.number().integer().positive().min(1).max(100).required()
    })
    const result = Joi.validate(reqObj, schema)
    if (result.error) return false;
    return true;
}
module.exports = {
    validateID,
    validateDirName,
    validateUpdateMovies,
    validateUpdation
}