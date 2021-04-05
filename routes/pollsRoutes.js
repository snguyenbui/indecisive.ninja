require('dotenv').config();
const express = require('express');
const router = express.Router();
const { getPollInfo, updatePollScore, updateVoter, createPoll, addChoice } = require('../db/queries/pollsQueries')

const Pusher = require("pusher");
const pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: process.env.PUSHER_useTLS
});

//Adding poll
router.post('/', (req, res) => {

  //add poll to database and options to options DB
  createPoll(req.body.description, req.body.email)
    .then(newPoll => {
      addChoice(req.body.options, newPoll.id).then(() => {
        res.redirect(`/polls/${newPoll.id}`)
      })
    })

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
      res.render('voterForm', templateVars)
    })
  //show options on poll
});

router.post('/:id', (req, res) => {
  getPollInfo(req.body.poll_id)
    .then(pollData => {
      scoreLoop(pollData, req)
        .then(() => {
          updateVoter(req.body['voter-name'], req.body.poll_id)
          getPollInfo(req.body.poll_id)
            .then(newData => {
              pusher.trigger("my-channel", "my-event", {
                'poll': newData
              });
              res.redirect(`/polls/${req.body.poll_id}`);
            })
        })
    })
});

const scoreLoop = (pollData, req) => {
  const bar = new Promise((resolve, reject) => {
    let count = 0;
    for (choices in pollData) {
      updatePollScore(pollData[choices].score + (req.body.choice.length - (req.body.choice.indexOf(pollData[choices].option) + 1)), req.body.poll_id, pollData[choices].choice_id)
        .then(() => {
          count++;
          if (count === req.body.choice.length) {
            resolve();
          }
        })
    }
  })
  return bar;
}


module.exports = router;
