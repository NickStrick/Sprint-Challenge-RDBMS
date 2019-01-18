const knex = require('knex');
const knexConfig = require('../knexfile.js');
const mappers = require('./mappers');
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
    let query = db('projects as p');

    if (id) {
      query.where('p.id', id).first();

      const promises = [query, getProjectActions(id)]; // [ projects, actions ]

      return Promise.all(promises).then(function(results) {
        let [project, actions] = results;
        project.actions = actions;

        return mappers.projectToBody(project);
      });
    }
}

function getProjectActions(projectId) {
    return db('actions')
      .where('project_id', projectId)
      .then(actions => actions.map(action => mappers.actionToBody(action)));
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

function getAction(action){
    
   
}