


SELECT polls.id AS poll_id, polls.description, creator_email, created_at, choices.id AS choice_id, choices.option, choices.score
FROM polls
JOIN choices ON polls.id = choices.poll_id
WHERE polls.id = 1
ORDER BY choices.score DESC;









