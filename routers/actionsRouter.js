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
    deleteA(req,res);
  });

  router.put('/:id',(req, res) => {
    update(req,res);
});

function add(req,res){
    db.addAction(req.body)
      .then(result => {
        db.getAction(result.id)
          .then(action => {
            res.status(201).json(action);
          });
      })
      .catch(err => res.status(500).json(err));
}

function get(req, res){
    db.getAction()
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(err => res.status(500).json(err));
}

function getId(req, res) {
    const id = req.params.id;
    db.getAction(id)
        .then(actions => {
        res.status(200).json(actions);
        })
        .catch(err => res.status(500).json(err));
}

function deleteA(req,res){
    const id = req.params.id;
    db.removeAction(id)
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => res.status(400).json(err))
}

function update(req,res){
    const {id} = req.params;
    const changes = req.body;
    db.updateAction(id, changes)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => res.status(500).json({msg: "could not update", err}))
}