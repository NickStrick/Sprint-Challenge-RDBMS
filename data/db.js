const knex = require('knex');
const knexConfig = require('../knexfile.js');
const mappers = require('./mappers');
const db = knex(knexConfig.development);

module.exports = {
    getProjects: function() {
        return db('projects')
    },

    getProject: function(id){
        let query = db('projects as p');

        if (id) {
        query.where('p.id', id).first();

        const promises = [query, this.getProjectActions(id)]; // [ projects, actions ]

        return Promise.all(promises).then(function(results) {
            let [project, actions] = results;
            project.actions = actions;

            return mappers.projectToBody(project);
        });
        }
    },

    getProjectActions: function(projectId){
        return db('actions')
      .where('project_id', projectId)
      .then(actions => actions.map(action => mappers.actionToBody(action)));
    },

    addProject: function(project){
        project = {...project, completed: false};
        return db('projects')
        .insert(project)
        .then(ids => ({ id: ids[0] }));
    },

    addAction: function(action){
        action = {...action, completed: false};
        return db('actions')
        .insert(action)
        .then(ids => ({ id: ids[0] }));
    },

    getAction: function(id){
        let query = db('actions');

        if (id) {
          return query
            .where('id', id)
            .first()
            .then(action => mappers.actionToBody(action));
        }
    
        return query.then(actions => {
          return actions.map(action => mappers.actionToBody(action));
        });
    }
};