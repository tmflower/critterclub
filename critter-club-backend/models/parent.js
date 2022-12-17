"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");

const {
    BadRequestError,
  } = require("../expressError");

  class Parent {
    static async register(
        { username, password, firstName, lastName, email }) 
        {
        const checkUsername = await db.query(
            `SELECT username
            FROM parents
            WHERE username = $1`,
            [username],
        );
        if (checkUsername.rows[0]) {
            throw new BadRequestError(`Username ${username} already taken.`);
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
    
        return user;
    }

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