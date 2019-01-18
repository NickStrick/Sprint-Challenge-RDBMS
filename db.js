const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    getProjects,
    getProject,
    addProject,
    addAction,
};

function getProjects(){
    return db('projects')
}

function getProject(id){
    return db('projects').where({ id: Number(id) });
}

function addProject(project) {
    project = {...project, completed: false};
    return db('projects')
    .insert(project)
    .then(ids => ({ id: ids[0] }));
}

function addAction(action){
    action = {...action, completed: false};
    return db('actions')
    .insert(action)
    .then(ids => ({ id: ids[0] }));
}