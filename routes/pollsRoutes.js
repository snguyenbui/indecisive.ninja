const express = require('express');
const router = express.Router();
const { getPollInfo } = require('../db/queries/pollsQueries')

//Adding poll
router.post('/', (req, res) => {
  //add poll to database and options to options DB
});

//Results
// Get /polls/:id
router.get('/:id', (req, res) => {
  //query stuff and graph it and do other things
  getPollInfo(req.params.id)
    .then(res => {
      console.log('This is our data!', res);
    })
    .catch(err => {
      console.log('error!', err);
    });

  console.log("this is working");
});

//Voting
router.get('/:id/vote', (req, res) => {
  //show options on poll
});

router.post('/:id', (req, res) => {
  //add vote to database etc etc
});

module.exports = router;
