
exports.up = function(knex, Promise) {
    return knex.schema.createTable('projects', function(tbl) {
        tbl.increments();
        tbl.string('name', 128).notNullable();
        tbl.text('description');
        tbl.boolean('completed')
        // tbl.unique('name', 'uq_projects_name');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('projects');
};

