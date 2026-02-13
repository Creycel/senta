// Creacion del objeto Profesionales para exportar y definir la logica de negocios, flujo y rutras para registrar datos en la tabla.

export type carreraespecializacion =
  | "Técnico en Informática"
  | "Técnico en Soporte de Computadoras"
  | "Técnico en Redes"
  | "Técnico en Desarrollo de Software"
  | "Técnico en Electrónica o Telecomunicaciones"
  | "Tecnólogo en Sistemas"
  | "Tecnólogo en Análisis y Desarrollo de Software"
  | "Tecnólogo en Seguridad Informática"
  | "Tecnólogo en Ciberseguridad y Redes"
  | "Tecnólogo en Inteligencia Artificial o Datos"
  | "Ingeniería en Sistemas"
  | "Ingeniería en Software"
  | "Ingeniería en Computación"
  | "Ingeniería en Tecnologías de la Información"
  | "Licenciatura en Informática"
  | "Licenciatura en Ciencias de la Computación"
  | "Licenciatura en Tecnología Educativa"
  | "Licenciatura en Seguridad Informática"
  | "Especialización en Seguridad Informática"
  | "Especialización en Big Data y Análisis de Datos"
  | "Especialización en Redes y Comunicaciones"
  | "Maestría en Ciencias de la Computación"
  | "Maestría en Ingeniería de Software"
  | "Maestría en Ciberseguridad"
  | "Maestría en Inteligencia Artificial"
  | "Maestría en Ciencia de Datos (Data Science)"
  | "Maestría en Administración de Tecnologías de la Información (TI Management)"
  | "Doctorado en Ciencias de la Computación (Ph.D.)"
  | "Doctorado en Inteligencia Artificial"
  | "Doctorado en Ingeniería de Software"
  | "Doctorado en Seguridad Informática o Criptografía"
  | "Certificación CompTIA (A+, Network+, Security+)"
  | "Certificación Cisco (CCNA, CCNP, CCIE)"
  | "Certificación Microsoft (Azure, MCSA, MCSE)"
  | "Certificación AWS (Amazon Web Services)"
  | "Certificación Google Cloud"
  | "Certificación CEH (Certified Ethical Hacker)"
  | "Certificación PMP (Project Management Professional)"
  | "Certificación ITIL (Gestión de Servicios TI)"
  | "Certificación Scrum Master / Agile";

export default interface Profesionales {
  IDProfesional: number;
  nombre: string;
  apellidos: string;
  carreraespecializacion: carreraespecializacion;
  telefono: string;
  correousuario: string;
  contrasena: string;
}
