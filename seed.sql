--AC IGNORE THIS FILE FOR NOW
\c world_language;
--accounts
INSERT INTO accounts (email, pw_hash, first_name, last_name, avatar_url, is_teacher)
VALUES ('123@gmail.com', 'pw_hash1', 'Andrew', 'Smith', 'avatar_url1', TRUE),
 ('2@gmail.com', 'pw_hash1', 'Ryan', 'Smith', 'avatar_url1', TRUE),
 ('3@gmail.com', 'pw_hash1', 'Greta', 'Smith', 'avatar_url1', FALSE),
 ('4@gmail.com', 'pw_hash1', 'Nick', 'Smith', 'avatar_url1', FALSE),
 ('123@gmail.com', 'pw_hash1', 'John', 'Smith', 'avatar_url1', TRUE),
 ('2@gmail.com', 'pw_hash1', 'John', 'Smith', 'avatar_url1', TRUE),
 ('3@gmail.com', 'pw_hash1', 'Jake', 'Smith', 'avatar_url1', FALSE),
 ('4@gmail.com', 'pw_hash1', 'Bob', 'Smith', 'avatar_url1', FALSE)

--meeting data
INSERT INTO meetings (description, req_account_id, rec_account_id, start_time, status)
VALUES ('test meeting 1', 1, 2, 'October 8 04:05:06 2020 EST', True),
 ('test meeting 2', 1, 2, 'October 9 04:05:06 2020 EST', True),
 ('test meeting 3', 1, 3, 'October 10 04:05:06 2020 EST', True),
 ('test meeting 3', 1, 4, 'October 10 04:05:06 2020 EST', False)



