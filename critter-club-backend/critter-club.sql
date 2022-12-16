\echo 'Delete and recreate critterclub db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE critterclub;
CREATE DATABASE critterclub;
\connect critterclub

\i critter-club-schema.sql

\echo 'Delete and recreate critterclub_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE critterclub_test;
CREATE DATABASE critterclub_test;
\connect critterclub_test

\i critter-club-schema.sql