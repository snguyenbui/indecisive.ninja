const db = require('../../lib/db');

// //GET /polls/:id/vote

// // Will be same funciton as above

// // POST /polls/

// INSERT INTO polls(description, creator_email) VALUES('Best Edmonton Parks', 'devin@gmail.com');

// INSERT INTO choices(option, score, poll_id) VALUES('Hawrelack', 0, 3);

// //POST/polls/:id

const updatePollScore = (new_score, poll_id, choice_id) => {
  return db.query(`UPDATE choices SET score = $1
  WHERE poll_id = $2
    AND id = $3
    RETURNING *;`, [new_score, poll_id, choice_id])
    .then(res => {
      return res.rows;
    });
};


// Get /polls/:id
const getPollInfo = (id) => {
  return db.query(`SELECT polls.id AS poll_id, polls.description, creator_email, created_at, choices.id AS choice_id, choices.option, choices.score
  FROM polls
  JOIN choices ON polls.id = choices.poll_id
  WHERE polls.id = $1
  ORDER BY choices.score DESC;
  `, [id])
    .then(res => {
      return res.rows;
    });
};

const updateVoter = (name, pollId) => {
  return db.query(`
  INSERT INTO voters (name, poll_id)
  VALUES ($1, $2)
  RETURNING *
  `, [name, pollId])
    .then(res => {
      return res.rows;
    });
};


module.exports = {
  getPollInfo,
  updatePollScore,
  updateVoter
};
