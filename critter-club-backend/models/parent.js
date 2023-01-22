"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");

const {
    BadRequestError,
  } = require("../expressError");

  /** methods for adding a new parent to the db and accessing data for registered parent */
  class Parent {
    /** add a new parent to db */
    static async register(
        { username, password, firstName, lastName, email }) 
        /** ensure that username is available */
        {
        const checkUsername = await db.query(
            `SELECT username
            FROM parents
            WHERE username = $1`,
            [username],
        );
        if (checkUsername.rows[0]) {
            throw new BadRequestError(`Sorry! The username ${username} is already taken.`);
        }
        /** ensure that username meets requirements */
        if (username.length < 4 || username.length > 15) throw new BadRequestError('Your username must be between 4-15 characters.')

        if ((password.length < 6 || password.length > 15) || 
            (!(/[0-9]/g).test(password)) || 
            (!(/[!@#$%^&*()_+=.,;:"`~]/g).test(password))) { 
            throw new BadRequestError('Your password must be between 6-15 characters with at least one number and one of these special characters: !@#$%^&*()_+=.,;:"`~')}
        
        /** ensure that all fields are completed */
        if (!firstName.length || !lastName.length || !username.length || !password.length || !email.length) {
            throw new BadRequestError("All fields are required.")
        }
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const accessCode = Math.floor(Math.random() * 9000 + 1000);

        const result = await db.query(
            `INSERT INTO parents
            (username,
                password,
                first_name,
                last_name,
                email,
                access_code)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING username, first_name AS "firstName", last_name as "lastName", email, access_code AS "accessCode"`,
            [
            username,
            hashedPassword,
            firstName,
            lastName,
            email,
            accessCode
            ],
        );
    
        const user = result.rows[0];
        if (user) {
            return user;
        }
        else {
            throw new BadRequestError("All fields are required. Please try again.");
        } 
    }

    /** get data for registered parent
     * this includes the access code required to set up a child user account
     */
    static async get(username) {
        const parentRes = await db.query(
            `SELECT username,
             access_code
             FROM parents
             WHERE username = $1`,
          [username],
      );
  
      const parent = parentRes.rows[0];
  
      if (!parent) throw new Error(`No parent: ${username}`);
  
      return parent;
    }
}

module.exports = Parent;