const express = require('express');
const router = express.Router();

//Adding poll
router.post('/', (req, res) => {
  //add poll to database and options to options DB
});

//Results
router.get('/:id', (req, res) => {
  //query stuff and graph it and do other things
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
