require('dotenv').config();
const express = require('express');
const router = express.Router();
const { getPollInfo, updatePollScore, updateVoter, createPoll, addChoice } = require('../db/queries/pollsQueries');

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
        res.redirect(`/polls/${newPoll.id}`);
      });
    });
});

//Results
// Get /polls/:id
router.get('/:id', (req, res) => {
  //query stuff and graph it and do other things
  getPollInfo(req.params.id)
    .then(pollData => {
      const templateVars = { 'poll': pollData };
      res.render('results', templateVars);
    });
});

//Voting
router.get('/:id/vote', (req, res) => {
  getPollInfo(req.params.id)
    .then(pollData => {
      const templateVars = { 'poll': pollData };
      res.render('voterForm', templateVars);
    });
  //show options on poll
});

router.post('/:id', (req, res) => {
  const body = req.body;
  const pollId = body.poll_id;
  getPollInfo(pollId)
    .then(pollData => {
      scoreLoop(pollData, req)
        .then(() => {
          updateVoter(body['voter-name'], pollId);
          getPollInfo(pollId)
            .then(newData => {
              pusher.trigger("my-channel", `my-event-${pollId}`, {
                'poll': newData,
                'name': body['voter-name']
              });
              res.redirect(`/polls/${pollId}`);
            });
        });
    });
});

const scoreLoop = (pollData, req) => {
  const body = req.body;
  const bar = new Promise((resolve, reject) => {
    let count = 0;
    for (const data in pollData) {
      const userChoice = pollData[data];
      const choice = body.choice;
      const oldScore = userChoice.score;
      const newScore = oldScore + choice.length - (choice.indexOf(userChoice.option) + 1);
      updatePollScore(newScore, body.poll_id, userChoice.choice_id)
        .then(() => {
          count++;
          if (count === choice.length) {
            resolve();
          }
        });
    }
  });
  return bar;
};


module.exports = router;
