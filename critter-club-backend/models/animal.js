"use strict";

const db = require("../db");

class Animal {

    static async get(id) {
        const animalRes = await db.query(
            `SELECT common_name,
            photo
            FROM animals
            WHERE
            id = $1`,
        [id]
        );
        const animal = animalRes.rows[0];

        if (!animal) throw new Error(`No animal: ${id}`);

        return animal;
    }

    static async getAllAnimals() {
        const res = await db.query(
            `SELECT * FROM animals`
        );
        return res.rows;
    }

    static async getBadges() {
            const badgesRes = await db.query(
            `SELECT animal_id
            FROM users_animals
            WHERE user_id = $1`,
            [user_id]
        );
        const badges = badgesRes.rows;

        if (!user) throw new Error(`No user: ${userId}`);

        return badges;
    }


}

module.exports = Animal;