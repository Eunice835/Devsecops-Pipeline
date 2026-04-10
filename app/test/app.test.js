const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../server");

test("GET / returns running status", async () => {
  const res = await request(app).get("/");
  assert.equal(res.status, 200);
  assert.equal(res.body.status, "running");
});

test("GET /admin blocked when LAB_MODE disabled", async () => {
  const res = await request(app).get("/admin");
  assert.equal(res.status, 403);
});
