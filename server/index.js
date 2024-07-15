import express from "express";
import * as mariadb from "mariadb";
import bodyParser from "body-parser";

BigInt.prototype.toJSON = function() { return this.toString() }

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
 *    endpoint: ["location"|"worker"]
 * @returns {Promise<void>}
 */
async function getTasks(params){
      let select = null;
      let group_by = null;
      let counter = null;

      if (params.endpoint === "location"){
        select = "l.*";
        group_by = "l.id"
        counter = "COUNT(DISTINCT w.id) AS workers_cnt"
      } else if(params.endpoint === "worker"){
        select = "w.*";
        group_by = "w.id"
        counter = "COUNT(DISTINCT l.id) AS locations_cnt"
      }else{
        reject("Parameter group_by is required");
      }

      let res = null;

      try{

        let where = [
            params.worker_ids !== undefined && params.worker_ids.length > 0 ? "w.id IN ("+db.escape(params.worker_ids)+")":"" , //let workers_query =
            params.location_ids !== undefined && params.location_ids.length > 0 ? "l.id IN ("+db.escape(params.location_ids)+")":"", //let location_query =
            params.is_complete !== undefined && params.is_complete !== null ? "t.is_complete = "+db.escape(params.is_complete):"" //let is_complete_query =
        ];

        let prefix_query = "SELECT "+select+", SUM(lt.time_seconds/60 * w.hourly_wage) AS cost \
            , COUNT(DISTINCT t.id) AS tasks_cnt, "+counter+" \
            , GROUP_CONCAT(lt.id) AS logged_time_ids, GROUP_CONCAT(t.id) AS task_ids, GROUP_CONCAT(DISTINCT l.id) AS location_ids, GROUP_CONCAT(DISTINCT w.id) AS worker_ids\
            FROM logged_time lt \
            LEFT JOIN tasks t ON lt.task_id = t.id \
            LEFT JOIN workers w ON lt.worker_id = w.id \
            LEFT JOIN locations l ON t.location_id = l.id \
            WHERE ";

        let postfix_query = "GROUP BY "+group_by;

        let query = prefix_query;

        let is_and = false;
        for(let i=0; i<where.length; i++){
          if(where[i] !== ""){
            query += (is_and? "AND ":"") + where[i]+" ";
            is_and = true;
          }
        }
        if(is_and === false){
          query += "1 ";
        }

        query += postfix_query;

        res = await db.query(query);

      }catch (err) {
        console.error("Error in query", err);
        throw err;
      }

    return res;

}

async function main() {
  await connect();

  app.get("/", (req, res) => {
    res.send("Hello!");
  });

  app.post("/tasks/worker", (req,res)=> {

    let params = req.body;
    params["endpoint"] = "worker";
    getTasks(params).then((tasks)=>{

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        "result": "OK",
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

    let params = req.body;
    params["endpoint"] = "location";
    getTasks(params).then((tasks)=>{

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        "result": "OK",
        "tasks": tasks
      }));

    }).catch((err)=>{
      console.error(err);
      res.send(JSON.stringify({
        "result": "ERROR"
      }));
    });

  })

  app.listen(port, "0.0.0.0", () => {
    console.info(`App listening on ${port}.`);
  });
}

await main();
