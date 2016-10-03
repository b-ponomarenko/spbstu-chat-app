CREATE TABLE Users (
	id integer PRIMARY KEY AUTOINCREMENT,
	email varchar,
	firstName varchar,
	lastName varchar,
	role integer
);

CREATE TABLE Roles (
	id integer PRIMARY KEY AUTOINCREMENT,
	label varchar
);

CREATE TABLE Messages (
	id integer PRIMARY KEY AUTOINCREMENT,
	user integer,
	createdTimestamp timestamp,
	dialog integer
);

CREATE TABLE Dialogs (
	id integer PRIMARY KEY AUTOINCREMENT,
	dialogName varchar,
	dialogPicture varchar
);

