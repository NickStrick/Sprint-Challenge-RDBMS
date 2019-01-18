const express = require('express');
const router = express.Router();

module.exports = router;

const db = require('../data/db.js');

router.get('/', (req, res) => {
    get(req,res);
  });
  
  router.get('/:id', (req, res) => {
    getId(req,res);
  });
  
  router.post('/', (req, res) => {
    add(req,res);
  });

  router.delete('/:id', (req, res) => {
    deleteP(req,res);
  });

  router.put('/:id',(req, res) => {
    update(req,res);
});


//functions
function get(req, res) {
    db.getProjects()
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(err => res.status(500).json(err));
}

function getId(req, res) {
    const id = req.params.id;
      db.getProject(id)
          .then(project => {
          if (project) {
              res.status(200).json(project);
          } else {
              res.status(404).json({ message: 'project not found' });
          }
          });
}

function add(req, res){
    db.addProject(req.body)
        .then(result => {
          db.getProject(result.id)
            .then(project => {
              res.status(201).json(project);
            });
        })
        .catch(err => res.status(500).json(err));
}

function deleteP(req,res) {
    const id = req.params.id;
    db.removeProject(id)
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => res.status(400).json(err))
}

function update(req,res){
    const {id} = req.params;
    const changes = req.body;
    db.updateProject(id, changes)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => res.status(500).json({msg: "could not update", err}))
}