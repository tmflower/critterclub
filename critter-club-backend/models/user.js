"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");

const {
    BadRequestError,
    UnauthorizedError,
  } = require("../expressError");

  /** methods for adding a new user, getting data for a user, and updating and deleting user data */
  class User {

    /** add a new user to db */
    static async register(
        { username, password, accessCode, parentId }) 
        {
        /** ensure that username is available and meets length requirements  */
        const checkUsername = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`,
            [username],
        );
        if (checkUsername.rows[0]) throw new BadRequestError(`Sorry! The username ${username} is already taken. Please try again`);

        if (username.length < 4 || username.length > 15) throw new BadRequestError('Your username must be between 4-15 characters.')
        
        /** ensure that password meets complexity and length requirements */
        if (
            (password.length < 6 || password.length > 15) || 
            (!(/[0-9]/g).test(password)) || 
            (!(/[!@#$%^&*()_+=.,;:"`~]/g).test(password))) { 
            throw new BadRequestError('Your password must be between 6-15 characters with at least one number and one of these special characters: !@#$%^&*()_+=.,;:"`~')}
     
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        
        /** add user to db, then check access code */
        const result = await db.query(
              `INSERT INTO users
               (username,
                password,
                access_code,
                points,
                parent_id)
               VALUES ($1, $2, $3, $4, $5)
               RETURNING username, access_code AS "accessCode", points, parent_id AS "parentId"`,
            [
              username,
              hashedPassword,
              accessCode,
              0,
              parentId
            ],
        );

        const enteredCode = +accessCode;

        /** get all access codes in db and put into array */
        const res = await db.query(
            `SELECT access_code,
            id
            FROM parents`
        );
        
        const codes = [];
        for (let row of res.rows) {
            codes.push(row.access_code);
        }

        /** check array for a match to the access code entered by user
         * delete user and throw error if no match
         */
        for (let row of res.rows) {
            if (!codes.includes(+enteredCode)) {
                db.query(
                `DELETE
                FROM users
                WHERE username = $1`,
                [username]
            )
                throw new BadRequestError("Please enter the correct access code from your parent.");
            }

            /** if access code matches, add that parent id to child account and return the new user */
            if (row.access_code === +enteredCode) {
                let parent = row.id;
                const finalRes = await db.query(
                    `UPDATE users
                    SET parent_id=${parent}
                    WHERE username = $1
                    RETURNING username, access_code AS "accessCode", points, parent_id AS "parentId"`,
                    [username]
                )
                const user = finalRes.rows[0];
                return user;
            }
        }
    }

    /** authenticate a returning user upon login */
    static async authenticate(username, password) {
        const result = await db.query(
                `SELECT username,
                        password,
                        access_code AS "accessCode",
                        points,
                        parent_id AS "parentId"
                FROM users
                WHERE username = $1`,
            [username],
        );
    
        const user = result.rows[0];
    
        /** compare hashed password to a new hash from password 
         * throw error if not a match; otherwise, return user
        */
        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
            delete user.password;
            return user;
            }
        }    
        throw new UnauthorizedError("Please check your username and password, then try again.");
        }
    
    /** get data for a user */
    static async get(username) {
        const userRes = await db.query(
            `SELECT username,
             id,
             points
             FROM users
             WHERE username = $1`,
          [username]
      );
  
        let user = userRes.rows[0];

        const id = user.id;
        
        /** get the id numbers of all animals for which this user has collected a badge */
        const badgesRes = await db.query(
            `SELECT animal_id
            FROM users_animals
            WHERE user_id = $1`,
            [id]
            );

        const badges = badgesRes.rows;
        
        /** add an array to the user;
         * add each animal name to this array */
        let userBadges =[];
        for(let badge of badges){
            const name = badge.animal_id
            const animalName = await db.query(
                `SELECT common_name
                FROM animals
                WHERE id=$1`,
            [name]
            );
            userBadges.push(animalName.rows[0].common_name);
        }
          
        if (!user) throw new Error(`No user: ${username}`);

        /** update user to include the new badges array */
        user = {...user, userBadges};

        return user;
    }

    /** add points for a user when they answer questions correctly */
    static async updatePoints(username, newPoints) {
        const pointsRes = await db.query(
            `UPDATE users
            SET points=${newPoints} + points
            WHERE username = $1
            RETURNING points`,
            [username]
        );
        const user = pointsRes.rows[0];
        return user;
    }

    /** reset user points to zero if they choose to start over */
    static async resetPoints(username) {
        const pointsRes = await db.query(
            `UPDATE users
            SET points=0
            WHERE username = $1
            RETURNING points`,
            [username]
        );
        const user = pointsRes.rows[0];
        return user;
    }

    /** add a new badge for a user, as an entry in the users_animals table */
    static async addBadge(animalId, userId) {
        const badgeRes = db.query(
            `INSERT INTO users_animals
            (animal_id,
            user_id)
            VALUES
            ($1, $2)
            RETURNING animal_id as "animalId", user_id as "userId"`,
            [animalId,
            userId]
        );
        const newBadge = badgeRes.rows;
        return newBadge;
    }

    /** delete all of a user's badges if they choose to start over */
    static async deleteBadges(userId) {
        db.query(
            `DELETE FROM users_animals
            WHERE user_id = $1
            RETURNING user_id as "userId"`,
            [userId]
        );
    }
  }

  module.exports = User;