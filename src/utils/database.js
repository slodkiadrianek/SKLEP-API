import { configDotenv } from "dotenv";
configDotenv();
import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "mysql-shop-adikurek11-e377.e.aivencloud.com",
    port: 10074,
    user: "avnadmin",
    password: process.env.MYSQL_PASS,
    database: "defaultdb",
  })
  .promise();

export { pool };
