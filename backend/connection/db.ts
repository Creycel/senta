// Configuracion de base de datos.
import mssql, { type config } from "mssql";
import dotenv from "dotenv";

dotenv.config();

type SQLConfig = mssql.config;
const dbConfig: SQLConfig = {
  server: process.env.DB_SERVER || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
    connectTimeout: 5000,
    requestTimeout: 5000,
  },
};

const informacion: config = {
  server: "Servidor Local",
  user: "Creycel AKA sa",
  password: "🗿",
  database: "SENTA",
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true,
    connectTimeout: 5000,
    requestTimeout: 5000,
  },
};

export const poolPromise: Promise<mssql.ConnectionPool> = mssql
  .connect(dbConfig) // Usar dbConfig para la conexión real
  .then((pool) => {
    const database = process.env.DB_DATABASE;
    console.log(
      `Conexión establecida con SQL Server en la base de datos "${database}". Detalles de configuracion para conectar la base de datos "${database}".`
    );
    console.table(informacion);
    return pool;
  })
  .catch((error) => {
    console.log(`Error al conectar con SQL Server: ${error}`);
    throw error;
  });

// Función reutilizable para obtener el pool en toda la app. Es necesaria para controladores, servicios y rutas
export async function verificarConexionSENTA(): Promise<mssql.ConnectionPool> {
  try {
    const pool = await poolPromise;
    return pool;
  } catch (error) {
    console.error(`Error obteniendo el pool de SQL Server: ${error}`);
    throw error;
  }
}

export { mssql };
