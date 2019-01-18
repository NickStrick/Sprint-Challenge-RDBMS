
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {
          description: 'action description here',
          notes: 'the action notes',
          project_id: 1,
          completed: false,
        },
        {
          description: 'action description here',
          notes: 'the action notes',
          project_id: 1,
          completed: false,
        },
        {
          description: 'action description here',
          notes: 'the action notes',
          project_id: 2,
          completed: false,
        }
      ]);
    });
};
