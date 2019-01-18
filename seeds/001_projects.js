
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          name: 'project name here',
          description: 'the project description',
          completed: true,
        },
        {
          name: 'project name here',
          description: 'the project description',
          completed: false,
        },
        {
          name: 'project name here',
          description: 'the project description',
          completed: false,
        }
      ]);
    });
};
