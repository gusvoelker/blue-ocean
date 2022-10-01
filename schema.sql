--account
DROP DATABASE IF EXISTS world_language;
CREATE DATABASE world_language;
\c world_language;

CREATE TABLE accounts (
	account_id SERIAL NOT NULL PRIMARY KEY,
	email VARCHAR(64),
	pw_hash VARCHAR(60),
	salt VARCHAR(22),
	session_id SERIAL NOT NULL,
	first_name VARCHAR(24),
	last_name VARCHAR(24),
	avatar_url TEXT,
	is_teacher BOOLEAN,
	UNIQUE(account_id)
);

--SELECT * FROM accounts;
--connections
CREATE TABLE connections (
	conn_id SERIAL NOT NULL,
	req_account_id INT NOT NULL REFERENCES accounts(account_id),
	rec_account_id INT NOT NULL REFERENCES accounts(account_id),
	status BOOLEAN
);

--session
CREATE TABLE sessions (
	session_id VARCHAR(120) NOT NULL,
	account_id INT NOT NULL REFERENCES accounts(account_id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--ALTER TABLE connections
--ADD CONSTRAINT connections_rule
--FOREIGN KEY (req_account_id)
--REFERENCES accounts(account_id)
----FOREIGN KEY (rec_account_id) REFERENCES accounts(account_id)
--ON DELETE CASCADE;



--set up PK and FK





-------
CREATE TABLE students (
	student_id SERIAL NOT NULL PRIMARY KEY,
	UNIQUE(student_id)
	--need more data from csv
);

CREATE TABLE classes (
	class_id SERIAL NOT NULL PRIMARY KEY,
	teacher_id INT NOT NULL REFERENCES accounts(account_id)
);


CREATE TABLE enrollments (
	class_id SERIAL NOT NULL PRIMARY KEY,
	teacher_id INT NOT NULL REFERENCES students(student_id),
	en_class_id INT NOT NULL REFERENCES classes(class_id)
);
-- changed class_id to en_class_id
-------

--LANGUAGES
CREATE TABLE languages (
	lang_id SERIAL NOT NULL PRIMARY KEY,
	lang_name VARCHAR(60) NOT NULL,
	UNIQUE (lang_id)
);

CREATE TYPE taught_level_vals AS ENUM ('1','2','3','4','5','AP');

CREATE TABLE taught_languages (
	taught_lang_id SERIAL NOT NULL PRIMARY KEY REFERENCES languages(lang_id),
	teacher_id INT NOT NULL REFERENCES accounts(account_id),
--	taught_lang_id INT REFERENCES languages(lang_id),
	taught_level taught_level_vals,
	UNIQUE (taught_lang_id)
);

CREATE TABLE known_languages (
	known_lang_id SERIAL NOT NULL PRIMARY KEY REFERENCES languages(lang_id),
	user_id INT NOT NULL REFERENCES accounts(account_id),
--	known_lang_id INT REFERENCES languages(lang_id),
	UNIQUE (known_lang_id)
);

CREATE TABLE desired_languages (
	desired_lang_id SERIAL PRIMARY KEY REFERENCES languages(lang_id),
	user_id INT REFERENCES accounts(account_id),
--	desired_lang_id INT REFERENCES languages(lang_id),
	UNIQUE (desired_lang_id)
);

--
CREATE TABLE account_room (
	room_id SERIAL NOT NULL PRIMARY KEY,
	UNIQUE (room_id)
);

CREATE TABLE participants (
	part_id SERIAL NOT NULL PRIMARY KEY,
	part_account_id INT NOT NULL REFERENCES accounts(account_id),
	room_id INT NOT NULL REFERENCES account_room(room_id),
	UNIQUE (part_id)
);

CREATE TABLE account_message (
	message_id SERIAL NOT NULL PRIMARY KEY,
	room_id INT NOT NULL REFERENCES account_room(room_id),
	account_id INT NOT NULL REFERENCES accounts(account_id),
	message VARCHAR(1000),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UNIQUE (message_id)
);
---

CREATE TABLE student_session (
	session_id VARCHAR(100) NOT NULL PRIMARY KEY,
	name VARCHAR(24) NOT NULL,
	UNIQUE (session_id)
);

CREATE TABLE student_room (
	room_id INT NOT NULL PRIMARY KEY,
	owner_id INT NOT NULL REFERENCES accounts(account_id),
	pin INT,
	UNIQUE (room_id)
);

CREATE TABLE student_message (
	message_id SERIAL NOT NULL PRIMARY KEY,
	mess_room_id INT REFERENCES student_room(room_id),
	name VARCHAR(24),
	message VARCHAR(1000),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UNIQUE (message_id)
);


