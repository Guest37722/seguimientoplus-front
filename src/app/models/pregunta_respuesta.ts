import { Pregunta } from "./pregunta";

export class Pregunta_Respuesta {
    id: number;
    idPaciente: number;
    pregunta: Pregunta;
    fechaRegistro: Date;
    respuesta: String;
}