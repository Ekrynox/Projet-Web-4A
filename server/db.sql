--
-- Fichier g�n�r� par SQLiteStudio v3.2.1 sur dim. oct. 27 09:43:11 2019
--
-- Encodage texte utilis� : System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table : friends
CREATE TABLE users_friends (user1 INTEGER REFERENCES users (id) ON DELETE CASCADE NOT NULL, user2 INTEGER REFERENCES users (id) ON DELETE CASCADE NOT NULL);

-- Table : groups
CREATE TABLE groups (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, Name TEXT NOT NULL, users TEXT NOT NULL DEFAULT ('[]'));

-- Table : messages_groups
CREATE TABLE messages_groups (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, user INTEGER REFERENCES users (id) ON DELETE CASCADE NOT NULL, "group" INTEGER REFERENCES groups (id) ON DELETE CASCADE NOT NULL, date DATETIME DEFAULT (CURRENT_TIMESTAMP) NOT NULL, data TEXT NOT NULL DEFAULT ('{}'));

-- Table : messages_users
CREATE TABLE messages_users (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, user INTEGER REFERENCES users (id) ON DELETE CASCADE NOT NULL, user2 INTEGER REFERENCES users (id) ON DELETE CASCADE NOT NULL, date DATETIME DEFAULT (CURRENT_TIMESTAMP) NOT NULL, data TEXT DEFAULT ('{}') NOT NULL);

-- Table : users
CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, email TEXT UNIQUE NOT NULL COLLATE NOCASE, pseudo TEXT NOT NULL, password TEXT NOT NULL, groups TEXT DEFAULT ('[]') NOT NULL, settings TEXT DEFAULT ('{}') NOT NULL);

-- Table : users_pseudo
CREATE VIRTUAL TABLE users_pseudo USING FTS5(pseudo);

-- Table : users_pseudo_config
CREATE TABLE 'users_pseudo_config'(k PRIMARY KEY, v) WITHOUT ROWID;

-- Table : users_pseudo_content
CREATE TABLE 'users_pseudo_content'(id INTEGER PRIMARY KEY, c0);

-- Table : users_pseudo_data
CREATE TABLE 'users_pseudo_data'(id INTEGER PRIMARY KEY, block BLOB);

-- Table : users_pseudo_docsize
CREATE TABLE 'users_pseudo_docsize'(id INTEGER PRIMARY KEY, sz BLOB);

-- Table : users_pseudo_idx
CREATE TABLE 'users_pseudo_idx'(segid, term, pgno, PRIMARY KEY(segid, term)) WITHOUT ROWID;

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
