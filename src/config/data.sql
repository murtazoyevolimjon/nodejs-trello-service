CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS boards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  columns JSONB
);

CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  order_num INTEGER,
  description TEXT,
  userid UUID,
  boardid UUID REFERENCES boards(id) ON DELETE CASCADE,
  columnid TEXT,
  CONSTRAINT fk_user FOREIGN KEY (userid) REFERENCES users(id) ON DELETE SET NULL
);
