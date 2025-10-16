-- Active: 1759236673354@@127.0.0.1@5432@node_trello_service

CREATE DATABASE node_trello_service;

\c node_trello_service;

CREATE EXTENSION if NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL
);

SELECT * FROM tasks;

CREATE TABLE boards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    title VARCHAR NOT NULL
);

CREATE TABLE columns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name VARCHAR NOT NULL,
    boardId UUID REFERENCES boards (id) on delete CASCADE
);

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    title VARCHAR not NULL,
    orderr SMALLINT NOT NULL,
    descriptionn TEXT,
    userId UUID REFERENCES users (id) on delete CASCADE,
    boardId UUID REFERENCES boards (id) on delete CASCADE,
    columnId UUID REFERENCES columns (id) on delete CASCADE
);

drop TABLE tasks;