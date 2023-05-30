import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL_SRV } from '../config/constantes';
import { Pregunta } from '../models/pregunta';
import Swal from 'sweetalert2';

@Injectable()
export class PreguntaService {

  private url: string = URL_SRV + '/pregunta'

  constructor(private http: HttpClient) { }

  getAllPreguntas(page: number): Observable<any> {
    return this.http.get(this.url + '/all/' + page).pipe(
      catchError(e => {
        Swal.fire('Error al obtener las preguntas',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }

  getAll(): Observable<Pregunta[]> {
    return this.http.get(this.url + '/all').pipe(
      map((respuesta: any) => respuesta as Pregunta[]),
      catchError(e => {
        Swal.fire('Error al obtener las preguntas',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }

  getPreguntaById(id: number): Observable<Pregunta> {
    return this.http.get(this.url + '/' + id).pipe(
      map((respuesta: any) => respuesta as Pregunta),
      catchError(e => {
        Swal.fire('Error al obtener la pregunta',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }

  crearPregunta(pregunta: Pregunta): Observable<Pregunta> {
    return this.http.post(this.url + '/new', pregunta).pipe(
      map((respuesta: any) => respuesta as Pregunta),
      catchError(e => {
        Swal.fire('Error al crear la pregunta',e.error.error,'error');
        console.log(e);
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }

  actualizarPregunta(pregunta: Pregunta): Observable<Pregunta> {
    return this.http.put(this.url + '/update', pregunta).pipe(
      map((respuesta: any) => respuesta as Pregunta),
      catchError(e => {
        Swal.fire('Error al actualizar la pregunta',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }

  borrarPregunta(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id).pipe(
      catchError(e => {
        Swal.fire('Error al borrar la pregunta',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }
}
