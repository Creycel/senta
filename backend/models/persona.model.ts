// Estructura de datos, manera en las que las tablas se presentan como objetos.
// Tengo que profundizar mas a fondo en la manera que funciona models en express.
export type Nacionalidad =
  | "India"
  | "Estadounidense"
  | "China"
  | "Alemana"
  | "Británica"
  | "Canadiense"
  | "Francesa"
  | "Brasileña"
  | "Vietnamita"
  | "Filipina"
  | "Nigeriana"
  | "Ucraniana"
  | "Polaca"
  | "Mexicana"
  | "Argentina"
  | "Rusa"
  | "Sudafricana"
  | "Indonesia"
  | "Tailandesa"
  | "Coreana"
  | "Dominicana";

export type Pais =
  | "India"
  | "Estados Unidos"
  | "China"
  | "Alemania"
  | "Reino Unido"
  | "Canadá"
  | "Francia"
  | "Brasil"
  | "Vietnam"
  | "Filipinas"
  | "Nigeria"
  | "Ucrania"
  | "Polonia"
  | "México"
  | "Argentina"
  | "Rusia"
  | "Sudáfrica"
  | "Indonesia"
  | "Tailandia"
  | "Corea del Sur"
  | "República Dominicana";

export interface Personas {
  IDPersona?: number; // Este atributo es opcional porque es identity en el script de desarrollo de la base de datos "senta"
  nombre: string;
  apellidos: string;
  fechanacimiento: Date;
  nacionalidad: Nacionalidad;
  pais: Pais;
  sexo: "M" | "F";
  Usuario: string;
  Contrasena: string;
}
