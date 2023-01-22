"use strict"

process.env.NODE_ENV === "test";

const request = require("supertest");
const app = require("../app.js");
const db = require("../db.js");

describe("GET /animals/", () => {
    test("Get list of all animals in db", async () => {
        const res = await request(app).get(`/animals/`);
        expect(res.statusCode).toBe(200);
        expect(res.body.animals.length).toEqual(144);
    });
});

describe("GET /animals/:animalName", () => {
    test("Get animal by name", async () => {
        const res = await request(app).get(`/animals/Hippopotamus`);
        expect(res.statusCode).toBe(200);
        expect(res.body.animal).toEqual({ id: 56, photo: '/images/hippopotamus.png' })
    });
});

describe("GET /animals/:animalName", () => {
    test("Throws error if animal does not exist in db", async () => {
        const res = await request(app).get(`/animals/unicorn`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ error: { message: 'No animal: unicorn', status: 404 } })
    });
});

describe("GET /animals/:animalId", () => {
    test("Get animal by name", async () => {
        const res = await request(app).get(`/animals/animal/77`);
        expect(res.statusCode).toBe(200);
        expect(res.body.animal).toEqual({ common_name: "Lemur", photo: '/images/lemur.png' })
    });
});

describe("GET /animals/:animalId", () => {
    test("Throws error if animal does not exist in db", async () => {
        const res = await request(app).get(`/animals/999`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ error: { message: 'No animal: 999', status: 404 } })
    });
});

afterAll(async() => {
    await db.end();
});