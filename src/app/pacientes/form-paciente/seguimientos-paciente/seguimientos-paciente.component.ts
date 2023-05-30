import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Seguimiento } from '../../../models/seguimiento';
import { SeguimientoService } from '../../../services/seguimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seguimientos-paciente',
  templateUrl: './seguimientos-paciente.component.html'
})
export class SeguimientosPacienteComponent implements OnInit {

  public seguimientos: Seguimiento[];
  public pacienteId: number;
  public paginador: any;
  private page: any;

  constructor(private seguimientoService: SeguimientoService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.cargarSeguimientosPaciente();
  }

  private cargarSeguimientosPaciente(): void {
    if (!this.page){
      this.page = 0;
    }
    this.activatedRoute.params.subscribe(
      params => {
        this.pacienteId = params['idPaciente'];
        if (this.pacienteId) {
          this.seguimientoService.getAllSeguimientoByPacienteId(this.pacienteId,this.page).subscribe(
            data => {
              this.seguimientos = data.content as Seguimiento[];
              this.paginador = data;
            }
          );
        }
      }
    );
  }

  public obtenerPagina(event: any): any {
    this.page = event;
    this.cargarSeguimientosPaciente();
  }

  public borrarSeguimiento(idSeguimiento: number): void {
    Swal.fire({
      title: 'Información',
      text: "¿Desea borrar el seguimiento seleccionado?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then(
      result => {
        if (result.isConfirmed) {
          this.seguimientoService.borrarSeguimiento(idSeguimiento).subscribe(
            data => {
              this.seguimientos.splice(this.seguimientos.findIndex(pregunta => pregunta.id === idSeguimiento), 1);
              Swal.fire('Información', 'Seguimiento borrado correctamente', 'success');
            }
          );
        }
      }
    );
  }

}
