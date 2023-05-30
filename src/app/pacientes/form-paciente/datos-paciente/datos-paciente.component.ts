import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../../models/paciente';
import { PacienteService } from '../../../services/paciente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-datos-paciente',
  templateUrl: './datos-paciente.component.html'
})
export class DatosPacienteComponent {

  public paciente: Paciente = new Paciente;

  constructor(private pacienteService: PacienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(parametros => {
      let page: number = + parametros.get('page');
      if (!page) {
        page = 0;
      }
      this.cargarPaciente();
    });

  }

  private cargarPaciente(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['idPaciente'];
        if (id) {
          this.pacienteService.getPacienteById(id).subscribe(
            data => this.paciente = data
          );
        }
      }
    );
  }

  public guardar(): void {
    if (this.paciente.id) {
      this.actualizarPaciente();
    } else {
      this.crearPaciente();
    }
  }

  private crearPaciente(): void {
    this.pacienteService.crearPaciente(this.paciente).subscribe(
      (data) => {
        this.paciente = data;
        Swal.fire('Información', 'Paciente creado correctamente', 'success').then(
          result => this.router.navigate(['/pacientes'])
        );

      }
    );
  }

  private actualizarPaciente(): void {
    this.pacienteService.actualizarPaciente(this.paciente).subscribe(
      (data) => {
        this.paciente = data;
        Swal.fire('Información', 'Paciente actualizado correctamente', 'success').then(
          result => this.router.navigate(['/paciente/form/', this.paciente.id])
        );

      }
    );
  }
}
