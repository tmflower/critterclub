"use strict"

process.env.NODE_ENV === "test";

const request = require("supertest");
const app = require("../app.js");
const db = require("../db.js");
const { createToken } = require("../utils/tokens");

let testParent;
let token;
beforeEach(async() => {
    const result = await db.query(`INSERT INTO parents(username, password, first_name, last_name, email, access_code) VALUES('papa', 'asdf123$', 'dad', 'smith', 'dad@smith.com', 4892) RETURNING id, username, first_name, last_name, email, access_code`);
    testParent = result.rows[0];
    token = createToken({ username: 'papa'});
});

afterEach(async() => {
    await db.query(`DELETE FROM parents`);
});

afterAll(async() => {
    await db.end();
});

describe("POST /parents/register", () => {
    test("Sign up a new parent", async () => {
        const res = await request(app).post(`/parents/register`).send({username: 'mama', password: 'asdf123$', firstName: 'mom', lastName: 'smith', email: 'mom@smith.com'});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ token: expect.any(String)});
    });
});

describe("POST /parents/register", () => {
    test("Throw error if faulty signup data entered", async () => {
        const res = await request(app).post(`/parents/register`).send({username: 'm', password: 'asdf', firstName: 'mom', lastName: 'smith', email: 'mom@smith.com'});
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: {message: expect.any(String), status: 400 }});
    });
});

describe("GET /parents/:username", () => {
    test("Get data for newly registered parent", async () => {
        const res = await request(app).get(`/parents/${testParent.username}`).set("authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ parent: { username: `${testParent.username}`, access_code: 4892 } });
    });
});