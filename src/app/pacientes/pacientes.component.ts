import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../services/paciente.service';
import { Paciente } from '../models/paciente';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html'
})
export class PacientesComponent implements OnInit {

  public pacientes: Paciente[];
  public paginador: any;
  private page: any;
  

  constructor(private pacienteService: PacienteService) {}

  ngOnInit() {
    this.cargarPacientes();
  }

  public cargarPacientes(): void {
    if(!this.page) {
      this.page = 0;
    }
    this.pacienteService.getAllPacientes(this.page).subscribe(
      data => {
        this.pacientes = data.content as Paciente[];
        this.paginador = data;
      }
    );
  }

  public obtenerPagina(event: any): any {
    this.page = event;
    this.cargarPacientes();
  }

  public borrarPaciente(idPaciente: number): void {
    Swal.fire({
      title: 'Información',
      text: "¿Desea borrar el paciente seleccionado?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then(
      result => {
        if (result.isConfirmed) {
          this.pacienteService.borrarPaciente(idPaciente).subscribe(
            data => {
              this.pacientes.splice(this.pacientes.findIndex(paciente => paciente.id === idPaciente), 1);
              Swal.fire('Información', 'Paciente borrado correctamente', 'success');
            }
          );
        }
      }
    );
  }
}
