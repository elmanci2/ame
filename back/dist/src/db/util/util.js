"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allQueryAsync = exports.queryAsync = exports.createUserDb = void 0;
const createUserDb = (db) => {
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
exports.createUserDb = createUserDb;
function queryAsync(db, sql, params) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}
exports.queryAsync = queryAsync;
function allQueryAsync(db, sql, params) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}
exports.allQueryAsync = allQueryAsync;
