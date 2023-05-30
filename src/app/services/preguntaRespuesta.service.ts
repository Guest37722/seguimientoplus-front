import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL_SRV } from '../config/constantes';
import { Pregunta_Respuesta } from '../models/pregunta_respuesta';
import Swal from 'sweetalert2';

@Injectable()
export class PreguntaRespuestaService {

  private url: string = URL_SRV + '/pregunta_respuesta'

  constructor(private http: HttpClient) { }

  getAllRespuestasByPacienteId(pacienteId:number, page: number): Observable<any> {
    return this.http.get(this.url + '/all/' + pacienteId + '/' + page).pipe(
      catchError(e => {
        Swal.fire('Error al obtener las respuestas',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }

  getRespuestaById(id: number): Observable<Pregunta_Respuesta> {
    return this.http.get(this.url + '/' + id).pipe(
      map((respuesta: any) => respuesta as Pregunta_Respuesta),
      catchError(e => {
        Swal.fire('Error al obtener la respuesta',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }

  crearRespuestas(preguntaRespuesta: Pregunta_Respuesta): Observable<Pregunta_Respuesta> {
    return this.http.post(this.url + '/new', preguntaRespuesta).pipe(
      map((respuesta: any) => respuesta as Pregunta_Respuesta),
      catchError(e => {
        Swal.fire('Error al crear la respuesta',e.error.error,'error');
        console.log(e);
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }

  actualizarRespuesta(preguntaRespuesta: Pregunta_Respuesta): Observable<Pregunta_Respuesta> {
    return this.http.put(this.url + '/update', preguntaRespuesta).pipe(
      map((respuesta: any) => respuesta as Pregunta_Respuesta),
      catchError(e => {
        Swal.fire('Error al actualizar la respuesta',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }

  borrarRespuesta(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id).pipe(
      catchError(e => {
        Swal.fire('Error al borrar la respuesta',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }
}
