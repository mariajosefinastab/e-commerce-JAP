const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "Tonterias123!",
    database: "ecommerce",
    connectionLimit: 5,
  });

async function queryDB(query, values=null){
    //console.log("queryDB:", query, values)
    let conn;
    try {
        conn = await pool.getConnection();
        let rows;
        if(values !== null){
            //console.log("query con values", query, values)
            rows = await conn.query(query, values);
        }else{
            rows = await conn.query(query);
        }
        return rows
      } catch (error) {
        return false;
      } finally {
        if (conn) conn.release();
      }
}

module.exports = queryDB;