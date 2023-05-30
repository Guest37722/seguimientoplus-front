import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL_SRV } from '../config/constantes';
import { Documento } from '../models/documento'; 
import Swal from 'sweetalert2';

@Injectable()
export class DocumentoService {

  private url: string = URL_SRV + '/documento'

  constructor(private http: HttpClient) { }

  getAllDocumentoByPacienteId(pacienteId: number, page: number): Observable<any> {
    return this.http.get<Documento[]>(this.url + '/all/' + pacienteId + '/' + page).pipe(
      catchError(e => {
        Swal.fire('Error al obtener los documentos del paciente',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }

  descargarDocumento(doc: Documento): Observable<any> {
    return this.http.post(this.url + '/descargarDocumento', doc, {responseType: 'blob'}).pipe(
      catchError(e => {
        Swal.fire('Error al descargar documento',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }

  subirDocumento(formData: any): Observable<Documento> {
    return this.http.post<Documento>(this.url + '/adjuntarDoc', formData).pipe(
      map((respuesta: any) => respuesta as Documento),
      catchError(e => {
        Swal.fire('Error al subir documento',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }

  borrarDocumento(id: number): Observable<any> {
    return this.http.delete(this.url + '/eliminarDocumento/' + id).pipe(
      catchError(e => {
        Swal.fire('Error al borrar documento',e.error.error,'error');
        return throwError(()=> new HttpErrorResponse(e));
      })
    );
  }
}
