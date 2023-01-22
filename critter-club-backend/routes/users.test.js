"use strict"

process.env.NODE_ENV === "test";

const request = require("supertest");
const app = require("../app.js");
const db = require("../db.js");
const { createToken } = require("../utils/tokens");

let testUser;
let token;
beforeEach(async() => {
    const result = await db.query(`INSERT INTO users(username, password, access_code, points) VALUES('kiddo', 'asdf123$', 3456, 80) RETURNING id, username, points`);
    testUser = result.rows[0];
    token = createToken({ username: 'kiddo'});
});

afterEach(async() => {
    await db.query(`DELETE FROM users`);
});

afterAll(async() => {
    await db.end();
});

describe("GET /users/:username", () => {
    test("Get one user", async () => {
        const res = await request(app).get(`/users/${testUser.username}`).set("authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual( {user: {'userBadges': [], ...testUser }})
    });
});

describe("PATCH /users/points", () => {
    test("Add 20 points to user points", async () => {
        const res = await request(app).patch(`/users/points`).set("authorization", `Bearer ${token}`).send({ username: `${testUser.username}`, points: 20 });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual( {user: { points: 100 }})
    });
});

describe("PATCH /users/points", () => {
    test("Reset user points to 0", async () => {
        const res = await request(app).patch(`/users/reset`).send({ username: `${testUser.username}` });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual( {user: { points: 0 }})
    });
});

describe("POST /users/badges", () => {
    test("Add 3 new badges to user", async () => {
        await request(app).post(`/users/badges`).send({ animalId: 51, userId: `${testUser.id}` });
        await request(app).post(`/users/badges`).send({ animalId: 103, userId: `${testUser.id}` });
        await request(app).post(`/users/badges`).send({ animalId: 141, userId: `${testUser.id}` });
        const res = await request(app).get(`/users/kiddo`).set("authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual( {user: {'userBadges': ['Golden Lion Tamarin', 'Porcupine', 'Zebra'], ...testUser }});
    });
});

describe("DELETE /users/badges/:userId", () => {
    test("Delete all of user's badges", async () => {
        await request(app).post(`/users/badges`).send({ animalId: 51, userId: `${testUser.id}` });
        await request(app).post(`/users/badges`).send({ animalId: 103, userId: `${testUser.id}` });
        await request(app).post(`/users/badges`).send({ animalId: 141, userId: `${testUser.id}` });
        const res = await request(app).delete(`/users/badges/${testUser.id}`);
        const res2 = await request(app).get(`/users/kiddo`).set("authorization", `Bearer ${token}`);
        expect(res2.statusCode).toBe(200);
        expect(res2.body.user.userBadges.length).toEqual(0)
    });
});