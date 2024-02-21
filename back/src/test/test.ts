/* 
import countries from "../data/countries.json";

*/
import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./src/db/db_users.db");

/* const addCountry = (
  value number,
  label string,
  id_country number
) Promise<number> => {
  return new Promise((resolve, reject) => {
    const insertCountryQuery =
      "INSERT INTO states (value, label , id_country ) VALUES (?, ? , ? )";
    db.run(insertCountryQuery, [value, label , id_country], function (err) {
      if (err) {
        console.error("Error al agregar un país", err.message);
        reject(err);
      }
      resolve(this.lastID);
    });
  });
};

export const addCountriesFromArray = async (
  countries { value number; label string; id_country number }[]
) Promise<number[]> => {
  const addedCountryIds number[] = [];

  for (const country of countries) {
    console.log('add ' + country );
    
    try {
      const countryId = await addCountry(
        country.value,
        country.label,
        country.id_country
      );
      addedCountryIds.push(countryId);
    } catch (error any) {
      console.error("Error al agregar un país desde el array", error.message);
    }
  }

  return addedCountryIds;
};
 */
// Consulta SQL para crear la tabla "countries"
/* const createTableQuery = `
    CREATE TABLE IF NOT EXISTS states (
        id INTEGER PRIMARY KEY,
        id_country INTEGER,
        value INTEGER,
        label TEXT
    )
`;

// Ejecuta la consulta SQL
db.run(createTableQuery, (err) => {
  if (err) {
    console.error("Error al crear la tabla back_account", err.message);
  } else {
    console.log("Tabla states creada exitosamente.");
  }
});  */

// Asegúrate de que el contenido de countries sea un array de objetos
//@ts-ignore
/*   if (Array.isArray(countries?.states)) {
  //@ts-ignore
  addCountriesFromArray(countries?.states)
    .then((addedCountryIds) => {
      console.log("Países agregados con éxito. IDs", addedCountryIds);
    })
    .catch((error) => {
      console.error("Error al agregar países desde el array", error.message);
    });
} else {
  console.error("El contenido de countries.json no es un array válido.");
}
 */

/* const deleteTable = (tableNamestring) => {
  return new Promise((resolve, reject) => {
    const deleteTableQuery = `DROP TABLE IF EXISTS ${tableName}`;

    db.run(deleteTableQuery, function (err) {
      if (err) {
        console.error(`Error al eliminar la tabla ${tableName} ${err.message}`);
        reject(err);
        return;
      }

      console.log(`Tabla ${tableName} eliminada con éxito.`);
    });
  });
};

// Uso de la función para eliminar la tabla 'back_account'
deleteTable('states')
  .then(() => {
    // Hacer algo después de eliminar la tabla si es necesario
  })
  .catch((error) => {
    // Manejar el error si ocurre
  }); 



 */
/* 
const sqlQuery = "ALTER TABLE cities ADD COLUMN cit TEXT";

// Ejecutar la consulta
db.run(sqlQuery, (err) => {
  if (err) {
    console.error("Error al agregar la columna", err.message);
  } else {
    console.log('Columna "code" agregada correctamente.');
  }

  // Cerrar la conexión a la base de datos
  db.close();
}); */

/* function agregarCodigoPais(valuenumber, codestring) {
  // Consulta SQL para agregar el código a la fila del país específico
  const sqlQuery = 'UPDATE countries SET code = ? WHERE value = ?';

  // Ejecutar la consulta
  db.run(sqlQuery, [code, value], (err) => {
    if (err) {
      console.error('Error al agregar el código', err.message);
    } else {
      console.log(`Código ${code} agregado correctamente para el país con valor ${value}.`);
    }

  });
}


for (const pais of countries?.countries) {
  agregarCodigoPais(pais.value, pais.code);
}
 */

// Conectar a la base de datos (si no existe, se creará)

// Consulta SQL para crear la tabla
/* const createTableQuery = `
    CREATE TABLE usuarios (
        id_usuario TEXT PRIMARY KEY,
        address TEXT,
        barrio TEXT,
        city INTEGER,
        country INTEGER,
        date TEXT,
        document TEXT,
        documentType TEXT,
        email TEXT,
        lastName TEXT,
        name TEXT,
        password TEXT,
        phoneNumber TEXT,
        state INTEGER,
        verified INTEGER DEFAULT 0,
        active INTEGER DEFAULT 1,
        photo BLOB
    );
`; */

/* // Ejecutar la consulta SQL para crear la tabla
db.run(`ALTER TABLE usuarios ADD COLUMN type TEXT;`, (errany) => {
  if (err) {
    console.error("Error al crear la tabla", err.message);
  } else {
    console.log("Tabla usuarios creada con éxito.");
  }

  // Cerrar la conexión a la base de datos
  db.close();
});
 */





/* 

db.run(`
  CREATE TABLE IF NOT EXISTS reminders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    notification_id TEXT,
    mensaje TEXT,
    medicamento TEXT,
    dosis TEXT,
    unidad TEXT,
    type TEXT,
    color TEXT,
    date TEXT,
    time TEXT,
    repeat TEXT,
    formate TEXT,
    originalTime TEXT,
    patient_id TEXT,
    add_by TEXT
  )
`);
 */


function eliminarContenidoTabla(nombreTabla: string) {
  const query = `DELETE FROM ${nombreTabla}`;
  
  db.run(query, function(err) {
      if (err) {
          console.error('Error al eliminar el contenido de la tabla:', err.message);
      } else {
          console.log('Contenido de la tabla eliminado con éxito.');
      }
  });
}

// Llamar a la función para eliminar el contenido de la tabla
const nombreTabla = 'reminders';
eliminarContenidoTabla(nombreTabla);



//db.run(`DROP TABLE IF EXISTS vital_signes`);