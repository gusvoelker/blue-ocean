DROP DATABASE IF EXISTS world_language;
CREATE DATABASE world_language;

\c world_language;


CREATE TABLE accounts (
	account_id SERIAL NOT NULL PRIMARY KEY,
	email VARCHAR(64),
	pw_hash VARCHAR(60),
	first_name VARCHAR(24),
	last_name VARCHAR(24),
	avatar_url TEXT,
	is_teacher BOOLEAN
);

CREATE TABLE connections (
	conn_id SERIAL NOT NULL,
	req_account_id INT NOT NULL REFERENCES accounts(account_id),
	rec_account_id INT NOT NULL REFERENCES accounts(account_id),
	status BOOLEAN
);

--MAY NEED TO COME BACK
CREATE TYPE rating_enum AS ENUM('1', '2', '3', '4');
CREATE TABLE ratings (
	rating_id SERIAL NOT NULL,
	rating_account_id INT REFERENCES accounts(account_id),
	rating rating_enum
);

CREATE TABLE classes (
	class_id SERIAL NOT NULL PRIMARY KEY,
	teacher_id INT NOT NULL REFERENCES accounts(account_id),
	class_name VARCHAR(24)
);

CREATE TABLE enrollments (
	enrollment_id SERIAL NOT NULL PRIMARY KEY,
	account_id INT NOT NULL,
	class_id INT NOT NULL
);

ALTER TABLE enrollments
	ADD CONSTRAINT fk_enrollments_account_id FOREIGN KEY (account_id) REFERENCES accounts(account_id),
	ADD CONSTRAINT fk_enrollments_class_id FOREIGN KEY (class_id) REFERENCES classes(class_id);

-------

CREATE TABLE languages (
	lang_id SERIAL NOT NULL PRIMARY KEY,
	lang_name VARCHAR(60) NOT NULL
);

CREATE TYPE taught_level_vals AS ENUM ('1','2','3','4','5','AP');
CREATE TABLE taught_languages (
	taught_lang_id SERIAL NOT NULL PRIMARY KEY,
	teacher_id INT NOT NULL,
	lang_id INT,
	taught_level taught_level_vals
);

ALTER TABLE taught_languages
	ADD CONSTRAINT fk_taught_languages_teacher_id FOREIGN KEY (teacher_id) REFERENCES accounts(account_id),
	ADD CONSTRAINT fk_taught_languages_lang_id FOREIGN KEY (lang_id) REFERENCES languages(lang_id);

--WORKS
CREATE TABLE known_languages (
	known_lang_id SERIAL NOT NULL PRIMARY KEY,
	user_id INT NOT NULL,
	lang_id INT NOT NULL
);
--WORKS
ALTER TABLE known_languages
	ADD CONSTRAINT fk_known_languages_user_id FOREIGN KEY (user_id) REFERENCES accounts(account_id),
	ADD CONSTRAINT fk_known_languages_lang_id FOREIGN KEY (lang_id) REFERENCES languages(lang_id);

--WORKS
CREATE TABLE desired_languages (
	desired_lang_id SERIAL NOT NULL PRIMARY KEY,
	user_id INT NOT NULL,
	lang_id INT NOT NULL
);
--WORKS
ALTER TABLE known_languages
	ADD CONSTRAINT fk_desired_languages_user_id FOREIGN KEY (user_id) REFERENCES accounts(account_id),
	ADD CONSTRAINT fk_desired_languages_lang_id FOREIGN KEY (lang_id) REFERENCES languages(lang_id);
--



CREATE TABLE account_room (
	room_id SERIAL NOT NULL PRIMARY KEY
);

CREATE TABLE participants (
	part_id SERIAL NOT NULL PRIMARY KEY,
	part_account_id INT NOT NULL,
	room_id INT NOT NULL
);

ALTER TABLE participants
	ADD CONSTRAINT fk_participants_part_account_id FOREIGN KEY (part_account_id) REFERENCES accounts(account_id),
	ADD CONSTRAINT fk_participants_part_room_id FOREIGN KEY (room_id) REFERENCES account_room(room_id);

CREATE TABLE account_message (
	message_id SERIAL NOT NULL PRIMARY KEY,
	room_id INT NOT NULL,
	account_id INT NOT NULL,
	message VARCHAR(1000),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE account_message
	ADD CONSTRAINT fk_account_message_room_id FOREIGN KEY(room_id) REFERENCES account_room(room_id),
	ADD CONSTRAINT fk_account_message_account_id FOREIGN KEY(account_id) REFERENCES accounts(account_id);

