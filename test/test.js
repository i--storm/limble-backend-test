const request = require("supertest");
const mariadb = require("mariadb")

let db = null

async function connect() {
    //console.info("Connecting to DB...");
    db = mariadb.createPool({
        host: process.env["DATABASE_HOST"],
        user: process.env["DATABASE_USER"],
        password: process.env["DATABASE_PASSWORD"],
        database: process.env["DATABASE_NAME"]
    });

    const conn = await db.getConnection();
    try {
        await conn.query("SELECT 1");
        //console.info("DB Connected!!!");
    } finally {
        await conn.end();
    }
}

beforeEach(async () => {
    await connect();
});
afterEach(async () => {
    db.end()
});

describe("GET /", () => {
    it("Should return Hello!", async () => {
        const res = await request(process.env["API_HOST"]).get("/");
        expect(res.statusCode).toBe(200);
        //
        //console.log(res)
        //expect(res.body).toBe({});
        expect(res.text).toContain("Pie Chart");
    });
});

describe("GET /get/workers", () => {
    it("Should return JSON of Taksk", async () => {
        const res = await request(process.env["API_HOST"]).get("/get/workers").send({
            "is_complete": null,
            "location_ids": [],
            "worker_ids": [],
        }).set('Content-Type', 'application/json');
        expect(res.statusCode).toBe(200);
        expect(res.text.length).toBeGreaterThan(0);

    });
});

describe("GET /get/locations", () => {
    it("Should return JSON of Taksk", async () => {
        const res = await request(process.env["API_HOST"]).get("/get/locations").send({
            "is_complete": null,
            "location_ids": [],
            "worker_ids": [],
        }).set('Content-Type', 'application/json');
        expect(res.statusCode).toBe(200);
        expect(res.text.length).toBeGreaterThan(0);

    });
});

describe("POST /tasks/worker", () => {
    it("Should return JSON of Taksk", async () => {
        const res = await request(process.env["API_HOST"]).post("/tasks/worker").send({
            "is_complete": null,
            "location_ids": [],
            "worker_ids": [],
        }).set('Content-Type', 'application/json');
        expect(res.statusCode).toBe(200);
        //expect(res.body.length).toBeGreaterThan(0);
        expect(res.body.result).toBe("OK");
    });
});

describe("POST /tasks/location", () => {
    it("Should return JSON of Taksk", async () => {
        const res = await request(process.env["API_HOST"]).post("/tasks/worker").send({
            "is_complete": null,
            "location_ids": [],
            "worker_ids": [],
        }).set('Content-Type', 'application/json');
        expect(res.statusCode).toBe(200);
        //expect(res.body.length).toBeGreaterThan(0);
        expect(res.body.result).toBe("OK");
    });
});
