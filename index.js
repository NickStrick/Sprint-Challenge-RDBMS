const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

// connect to the database

server.get('/', (req, res) => {
  res.send('api working');
});

server.get('/api/projects', (req, res) => {
  db.getProjects()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => res.status(500).json(err));
});

server.get('/api/projects/:id', (req, res) => {
    const id = req.params.id;
    db.getProject(id)
        .then(project => {
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: 'project not found' });
        }
        });
});

server.post('/api/projects', (req, res) => {
  
    db.addProject(req.body)
      .then(result => {
        db.getProject(result.id)
          .then(project => {
            res.status(201).json(project);
          });
      })
      .catch(err => res.status(500).json(err));
});

  server.post('/api/actions', (req, res) => {
  
    db.addAction(req.body)
      .then(result => {
        db.getAction(result.id)
          .then(action => {
            res.status(201).json(action);
          });
      })
      .catch(err => res.status(500).json(err));
});



server.listen(6000, () => console.log('server up on 6000'));