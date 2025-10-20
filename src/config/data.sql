-- Active: 1759236673354@@127.0.0.1@5432@nodejs_trello_service

CREATE DATABASE nodejs_trello_service;



CREATE EXTENSION if NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL
);


CREATE TABLE boards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    title VARCHAR NOT NULL,
    userId UUID REFERENCES users (id) on DElete CASCADE
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
    columnId UUID REFERENCES columnss (id) on delete CASCADE
);