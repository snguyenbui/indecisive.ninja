const express = require('express');
const router = express.Router();
const { getPollInfo, updatePollScore } = require('../db/queries/pollsQueries')

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
      console.log('error caught in pollsRoutes', err);
    });

  console.log("this is working");
});

//Voting
router.get('/:id/vote', (req, res) => {
  getPollInfo(req.params.id)
    .then(pollData => {
      const templateVars = { 'poll': pollData }
      console.log('this is the one we are looking for', templateVars)
      res.render('voterForm', templateVars)
    })
  //show options on poll
});

router.post('/:id', (req, res) => {
  console.log('req ', req.body)

  //console.log('res ', res)

  // updatePollScore(6, 2, 10)
  //   .then(res => {
  //     console.log(res)
  //   })
});

module.exports = router;
