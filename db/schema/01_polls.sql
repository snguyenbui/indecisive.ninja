-- creat table polls
DROP TABLE IF EXISTS polls CASCADE;
CREATE TABLE polls (
  id SERIAL PRIMARY KEY NOT NULL,
  description TEXT NOT NULL,
  creator_email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL
);