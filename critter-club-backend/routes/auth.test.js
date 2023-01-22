"use strict"

process.env.NODE_ENV === "test";

const request = require("supertest");
const app = require("../app.js");
const db = require("../db.js");
const { createToken } = require("../utils/tokens");

let testParent;
let token;
beforeEach(async() => {
    const result = await db.query(`INSERT INTO parents(username, password, first_name, last_name, email, access_code) VALUES('daddy', 'asdf123$', 'dad', 'smith', 'dad@smith.com', 4892) RETURNING id, username, first_name, last_name, email, access_code`);
    testParent = result.rows[0];
    token = createToken({ username: 'daddy'});
});

afterEach(async() => {
    await db.query(`DELETE FROM users`);
    await db.query(`DELETE FROM parents`);
});

afterAll(async() => {
    await db.end();
});

describe("POST /auth/register", () => {
    test("Sign up a new user", async () => {
        const res = await request(app).post(`/auth/register`).send({ username: 'kiddo2', password: '123!@#asdf', accessCode: 4892, parentId: `${testParent.id}` });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ token: expect.any(String)});
    });
});

describe("POST /auth/register", () => {
    test("Throw error when wrong access code is submitted", async () => {
        const res = await request(app).post(`/auth/register`).send({ username: 'kiddo2', password: '123!@#asdf', accessCode: 1833, parentId: `${testParent.id}` });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: { message: 'Please enter the correct access code from your parent.', status: 400 }});
    });
});

describe("POST /auth/register", () => {
    test("Throw error when faulty signup data is submitted", async () => {
        const res = await request(app).post(`/auth/register`).send({ username: 'kiddo2', password: 'mypassword', accessCode: 4892, parentId: `${testParent.id}` });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: { message: "Your password must be between 6-15 characters with at least one number and one of these special characters: !@#$%^&*()_+=.,;:\"`~", status: 400 }});
    });
});

describe("POST /auth/login", () => {
    test("Allow returning user to login with valid credentials", async () => {
        await request(app).post(`/auth/register`).send({ username: 'kiddo2', password: '123!@#asdf', accessCode: 4892, parentId: `${testParent.id}` });
        const res = await request(app).post(`/auth/login`).set("authorization", `Bearer ${token}`).send({ username: 'kiddo2', password: '123!@#asdf' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ token: expect.any(String)});
    });
});