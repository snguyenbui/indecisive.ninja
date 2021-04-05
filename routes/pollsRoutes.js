const express = require('express');
const router = express.Router();
const { getPollInfo, updatePollScore, updateVoter } = require('../db/queries/pollsQueries')

//Adding poll
router.post('/', (req, res) => {
  //add poll to database and options to options DB
});

//Results
// Get /polls/:id
router.get('/:id', (req, res) => {
  //query stuff and graph it and do other things
  getPollInfo(req.params.id)
    .then(pollData => {
      const templateVars = { 'poll': pollData }
      res.render('results', templateVars);
    })
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
  getPollInfo(req.body.poll_id)
    .then(pollData => {
      for (choices in pollData) {
        updatePollScore(pollData[choices].score + (req.body.choice.length - (req.body.choice.indexOf(pollData[choices].option) + 1)), req.body.poll_id, pollData[choices].choice_id);
      }
      updateVoter(req.body['voter-name'], req.body.poll_id)
      res.redirect(`/polls/${req.body.poll_id}`);
    })
});

module.exports = router;
