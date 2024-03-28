/* eslint-disable @typescript-eslint/no-explicit-any */
import sqlite3, { Database } from "sqlite3";

export const createUserDb = (db: Database) => {
  db.run(`
CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER,
  name TEXT,
  lastname TEXT,
  email TEXT,
  password TEXT,
  phoneNumber TEXT,
  country TEXT,
  city TEXT,
  estado TEXT,
  age INTEGER,
  fechaNacimiento DATE,
  photo BLOB,
  fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`);
};

export function queryAsync(
  db: sqlite3.Database,
  sql: string,
  params: any[]
): Promise<any> {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export function allQueryAsync(
  db: sqlite3.Database,
  sql: string,
  params: string[]
): Promise<any> {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
