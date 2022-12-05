CREATE TABLE parents (
    id PRIMARY KEY,
    username UNIQUE VARCHAR(15) NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL
        CHECK (position('@' IN email) > 1),
    access_code INTEGER,
)

CREATE TABLE users (
    id PRIMARY KEY,
    username UNIQUE VARCHAR(15) NOT NULL,
    password TEXT NOT NULL,
    access_code INTEGER,
    num_cards INTEGER,
    level TEXT,
    parent_id INTEGER REFERENCES parents ON DELETE CASCADE
)

CREATE TABLE animals (
    id PRIMARY KEY,
    common_name TEXT,
    latin_name TEXT, 
    photo TEXT,
    group TEXT,
    locations TEXT[],
    random_fact TEXT
)

CREATE TABLE users_animals (
    id PRIMARY KEY,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    animal_id INTEGER REFERENCES animals ON DELETE CASCADE
)   