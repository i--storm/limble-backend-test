const request = require("supertest");
const mariadb = require("mariadb")

let db = null

async function connect() {
    console.info("Connecting to DB...");
    db = mariadb.createPool({
        host: process.env["DATABASE_HOST"],
        user: process.env["DATABASE_USER"],
        password: process.env["DATABASE_PASSWORD"],
        database: process.env["DATABASE_NAME"]
    });

    const conn = await db.getConnection();
    try {
        await conn.query("SELECT 1");
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
        //expect(res.body.length).toBeGreaterThan(0);
        //console.log(res)
        //expect(res.body).toBe({});
        expect(res.text).toBe("Hello!");
    });
});
