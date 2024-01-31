import sqlite3 from "sqlite3";
const user_db = new sqlite3.Database("./src/db/db_users.db");
const data_db = new sqlite3.Database("./src/db/dta.db");

export { user_db, data_db };
