const db = require('../../lib/db');

// INSERT INTO polls(description, creator_email) VALUES('Best Edmonton Parks', 'devin@gmail.com');
const createPoll = (description, creator_email, ipCheck, randomId) => {
  return db.query(`
  INSERT INTO polls (description, creator_email, ip_check, admin_link)
  VALUES ($1, $2, $3, $4)
  RETURNING *
  `, [description, creator_email, ipCheck, randomId])
    .then(res => {
      return res.rows[0];
    });
};

// INSERT INTO choices(option, score, poll_id) VALUES('Hawrelack', 0, 3);
const addChoice = (optionsArray, poll_id) => {
  let queryString = `INSERT INTO choices (option, poll_id, score) VALUES`;
  const newArray = optionsArray.filter((elem) => {
    return elem;
  });
  for (let optionIndex in newArray) {
    queryString += `($${Number(optionIndex) + 2},$1,0),`;
  }
  return db.query(
    queryString.substr(0, queryString.length - 1), [poll_id, ...newArray]
  );
};

// addChoice(['cats', 'dogs', 'hamster'], 1);
const updatePollScore = (new_score, poll_id, choice_id) => {
  return db.query(`UPDATE choices SET score = $1
  WHERE poll_id = $2
  AND id = $3
  RETURNING *; `, [new_score, poll_id, choice_id])
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

const updateVoter = (name, pollId, ip_address) => {
  return db.query(`
  INSERT INTO voters(name, poll_id, ip_address)
  VALUES($1, $2, $3)
  RETURNING *
  `, [name, pollId, ip_address])
    .then(res => {
      return res.rows[0];
    });
};

const getVotersInfo = (pollId) => {
  return db.query(`
  SELECT voters.name, voters.ip_address, polls.ip_check
  FROM polls
  JOIN voters ON voters.poll_id = polls.id
  WHERE polls.id = $1
  `, [pollId])
    .then(res => {
      return res.rows;
    });
};

const updateVoterResponses = (voter_id, choice_id, score) => {
  return db.query(`INSERT INTO voter_responses
  (voter_id, choice_id, score)
  VALUES ($1, $2, $3) RETURNING *
  `, [voter_id, choice_id, score])
    .then(res => {
      return res.rows[0];
    });
};

const getVotersResponses = (adminLink) => {
  const query = `SELECT voters.name, choices.option, voter_responses.score FROM voter_responses
  JOIN voters on voter_responses.voter_id = voters.id
  JOIN choices on voter_responses.choice_id = choices.id
  WHERE voters.poll_id = (
    SELECT id FROM polls WHERE admin_link = $1
  );`;
  return db.query(query,
    [adminLink])
    .then(res => {
      return res.rows;
    });
};

module.exports = {
  getPollInfo,
  updatePollScore,
  updateVoter,
  createPoll,
  addChoice,
  getVotersInfo,
  updateVoterResponses,
  getVotersResponses
};

