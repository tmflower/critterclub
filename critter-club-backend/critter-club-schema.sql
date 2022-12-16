CREATE TABLE parents (
    id serial PRIMARY KEY,
    username VARCHAR(15) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL
        CHECK (position('@' IN email) > 1),
    access_code INTEGER
);

CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR(15) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    access_code INTEGER,
    num_cards INTEGER NOT NULL DEFAULT 0,
    level TEXT NOT NULL DEFAULT 'Observer',
    parent_id INTEGER REFERENCES parents ON DELETE CASCADE
);

CREATE TABLE animals (
    id serial PRIMARY KEY,
    common_name TEXT,
    latin_name TEXT, 
    photo TEXT,
    animal_group TEXT,
    locations TEXT[],
    random_fact TEXT
);

CREATE TABLE users_animals (
    id serial PRIMARY KEY,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    animal_id INTEGER REFERENCES animals ON DELETE CASCADE
);   