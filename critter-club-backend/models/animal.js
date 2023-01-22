"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

/** methods for accessing animal names and images for badge icons */

class Animal {
    
    /** get data for animal when given the name */
    static async get(animalName) {
        const animalRes = await db.query(
            `SELECT id,
            photo
            FROM animals
            WHERE
            common_name = $1`,
        [animalName]
        );
        const animal = animalRes.rows[0];

        if (!animal) throw new NotFoundError(`No animal: ${animalName}`);

        return animal;
    }

    /** get data for animal when give the id number */
    static async getById(id) {
        const animalRes = await db.query(
            `SELECT common_name,
            photo
            FROM animals
            WHERE
            id = $1`,
        [id]
        );
        const animal = animalRes.rows[0];

        if (!animal) throw new NotFoundError(`No animal: ${id}`);

        return animal;
    }

    /** get data for all animals in db */
    static async getAllAnimals() {
        const res = await db.query(
            `SELECT * FROM animals`
        );
        return res.rows;
    }

    /** get id numbers of all animals for which the user has collected a badge */
    static async getBadges() {
            const badgesRes = await db.query(
            `SELECT animal_id
            FROM users_animals
            WHERE user_id = $1`,
            [user_id]
        );
        const badges = badgesRes.rows;

        if (!user) throw new NotFoundError(`No user: ${userId}`);

        return badges;
    }


}

module.exports = Animal;