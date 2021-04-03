const db = require('../../lib/db')
console.log(db)


// //
// //GET /polls/:id/vote

// // Will be same funciton as above

// // POST /polls/

// INSERT INTO polls(description, creator_email) VALUES('Best Edmonton Parks', 'devin@gmail.com');

// INSERT INTO choices(option, score, poll_id) VALUES('Hawrelack', 0, 3);

// //POST/polls/:id

// UPDATE choices SET score = var
//   WHERE poll_id = var
//     AND id = var ;


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
    })
    .catch(err => {
      console.log('error!', err);
    });
};




module.exports = {
  getPollInfo
}
