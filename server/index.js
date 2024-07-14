import express from "express";
import * as mariadb from "mariadb";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let db;

app.use( bodyParser.json() );

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

/**
 * @param params
 *    is_complete: [true|false|null>]
 *    location_ids: [[location_id, location_id, ... location_id]]
 *    worker_ids: [[worker_id, worker_id, ... worker_id]]
 *    group_by: ["location"|"worker"]
 * @returns {Promise<void>}
 */
async function getTasks(params){


      let select = null;
      let group_by = null;
      if (params.group_by === "location"){
        select = "workers";
        group_by = "l.id"
      } else if(params.group_by === "worker"){
        select = "locations";
        group_by = "w.id"
      }else{
        reject("Parameter group_by is required");
      }

      try{
        let res = await db.query('SELECT ?, SUM(lt.time_seconds/60 * w.hourly_wage) AS cost FROM logged_time lt' +
            'LEFT JOIN tasks t ON lt.task_id = t.id' +
            'LEFT JOIN workers w ON lt.worker_id = w.id' +
            'LEFT JOIN locations l ON t.location_id = l.id' +
            'WHERE w.id IN (?)' +
            'AND l.id IN (?)' +
            //'AND ' + TODO: is_complete
            'GROUP BY ?',
            [select, params.worker_ids, params.location_ids, group_by]);
      }catch (err) {
        console.error("Error in query", err);
        throw err;
      }


        //resolve(params.group_by);
        //reject("some error")



}

async function main() {
  await connect();

  app.get("/", (req, res) => {
    res.send("Hello!");
  });

  app.post("/tasks/worker", async (req,res)=> {

    let params = req.body;
    params["group_by"] = "worker";
    getTasks(params).then((tasks)=>{

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        "result": "OK",
        "group_by": result,
        "tasks": tasks
      }));

    }).catch((err)=>{
      console.error(err);
      res.send(JSON.stringify({
        "result": "ERROR"
      }));
    });

  })

  app.post("/tasks/location", (req,res) => {

  })

  app.listen(port, "0.0.0.0", () => {
    console.info(`App listening on ${port}.`);
  });
}

await main();
