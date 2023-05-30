import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL_SRV } from '../config/constantes';
import { Seguimiento } from '../models/seguimiento'; 
import Swal from 'sweetalert2';

@Injectable()
export class SeguimientoService {

  private url: string = URL_SRV + '/seguimiento'

  constructor(private http: HttpClient) { }

  getAllSeguimientoByPacienteId(pacienteId: number, page: number): Observable<any> {
    return this.http.get<Seguimiento[]>(this.url + '/all/' + pacienteId + '/' + page).pipe(
      catchError(e => {
        Swal.fire('Error al obtener los seguimientos del paciente',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }

  getSeguimientoById(id: number): Observable<Seguimiento> {
    return this.http.get<Seguimiento>(this.url + '/' + id).pipe(
      map((respuesta: any) => respuesta as Seguimiento),
      catchError(e => {
        Swal.fire('Error al obtener el seguimiento',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }

  crearSeguimiento(seguimiento: Seguimiento): Observable<Seguimiento> {
    return this.http.post<Seguimiento>(this.url + '/new', seguimiento).pipe(
      map((respuesta: any) => respuesta as Seguimiento),
      catchError(e => {
        Swal.fire('Error al crear seguimiento',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }

  actualizarSeguimiento(seguimiento: Seguimiento): Observable<Seguimiento> {
    return this.http.put<Seguimiento>(this.url + '/update', seguimiento).pipe(
      map((respuesta: any) => respuesta as Seguimiento),
      catchError(e => {
        Swal.fire('Error al actualizar seguimiento',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }

  borrarSeguimiento(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id).pipe(
      catchError(e => {
        Swal.fire('Error al borrar seguimiento',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }
}
