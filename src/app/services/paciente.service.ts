import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL_SRV } from '../config/constantes';
import { Paciente } from '../models/paciente';
import Swal from 'sweetalert2';

@Injectable()
export class PacienteService {

  private url: string = URL_SRV + '/paciente'

  constructor(private http: HttpClient) { }

  getAllPacientes(page: number): Observable<any> {
    return this.http.get(this.url + '/all/' + page).pipe(
      catchError(e => {
        Swal.fire('Error al obtener los pacientes',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }

  getPacienteById(id: number): Observable<Paciente> {
    return this.http.get(this.url + '/' + id).pipe(
      map((respuesta: any) => respuesta as Paciente),
      catchError(e => {
        Swal.fire('Error al obtener los datos del paciente',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }

  crearPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post(this.url + '/new', paciente).pipe(
      map((respuesta: any) => respuesta as Paciente),
      catchError(e => {
        Swal.fire('Error al crear el paciente',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }

  actualizarPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.put(this.url + '/update', paciente).pipe(
      map((respuesta: any) => respuesta as Paciente),
      catchError(e => {
        Swal.fire('Error al actualizar el paciente',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }

  borrarPaciente(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id).pipe(
      catchError(e => {
        Swal.fire('Error al borrar el paciente',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }
}
