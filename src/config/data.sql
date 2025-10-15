CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS boards (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    columns JSONB,
    user_id INTEGER REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    order_num INTEGER,
    description TEXT,
    userid INTEGER,
    boardid INTEGER REFERENCES boards (id) ON DELETE CASCADE,
    columnid TEXT,
    CONSTRAINT fk_user FOREIGN KEY (userid) REFERENCES users (id) ON DELETE SET NULL
);

CREATE TABLE columns (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    board_id UUID REFERENCES boards (id) ON DELETE CASCADE,
    position INT DEFAULT 0
);