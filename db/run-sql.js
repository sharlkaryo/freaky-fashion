const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/freakyfashion.db");

const initSql = fs.readFileSync("./db/init.sql", "utf8");
const seedSql = fs.readFileSync("./db/seed.sql", "utf8");

db.exec(initSql, (err) => {
  if (err) {
    return console.log(err.message);
  }

  console.log("init.sql körd");

  db.exec(seedSql, (err) => {
    if (err) {
      return console.log(err.message);
    }

    console.log("seed.sql körd");
    db.close();
  });
});
