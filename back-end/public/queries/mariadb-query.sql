/*CREATE DATABASE volleyball;*/
USE volleyball;
/*CREATE TABLE users
(
	id INT NOT NULL AUTO_INCREMENT,
	firstName VARCHAR (50) NOT NULL,
	lastName VARCHAR (50) NOT NULL,
	email VARCHAR (50) UNIQUE NOT NULL,
	password VARCHAR (50) NOT NULL,
	session VARCHAR (500) NOT NULL,
	role VARCHAR (10) DEFAULT "player",
	PRIMARY KEY (id)
);
INSERT INTO users
(firstName, lastName, email, password, session)
VALUES
("rakib" , "ayon", "rakib@gmail.com", "password", "123");

INSERT INTO users
(firstName, lastName, email, password, session)
VALUES
("ayon" , "rakib", "ayon@gmail.com", "password", "123");

INSERT INTO users
(firstName, lastName, email, password, session)
VALUES
("bruce" , "wayne", "rakibayon@gmail.com", "password", "123");*/

/*RENAME TABLE user TO users;
ALTER TABLE users
ADD CONSTRAINT email UNIQUE(email);*/
SELECT * FROM users;