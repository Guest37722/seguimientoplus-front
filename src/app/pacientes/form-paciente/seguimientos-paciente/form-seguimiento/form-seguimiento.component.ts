import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import { Seguimiento } from '../../../../models/seguimiento';
import { SeguimientoService } from '../../../../services/seguimiento.service';

@Component({
  selector: 'app-form-seguimiento',
  templateUrl: './form-seguimiento.component.html'
})
export class FormSeguimientoComponent implements OnInit {

  public seguimiento: Seguimiento = new Seguimiento;
  public idPaciente: number;
  private idSeguimiento: number;

  constructor(private seguimientoService: SeguimientoService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.cargarSeguimiento();
  }

  private cargarSeguimiento(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.idPaciente = params['idPaciente'];
        this.idSeguimiento = params['idSeguimiento'];
        if (this.idSeguimiento && this.idPaciente) {
          this.seguimientoService.getSeguimientoById(this.idSeguimiento).subscribe(
            data => this.seguimiento = data
          );
        }
      }
    );
  }

  public guardar(): void {
    if (this.seguimiento.id) {
      this.actualizarSeguimiento();
    } else {
      this.crearSeguimiento();
    }
  }

  private crearSeguimiento(): void {
    this.seguimiento.pacienteId = this.idPaciente;
    this.seguimientoService.crearSeguimiento(this.seguimiento).subscribe(
      (data) => {
        this.seguimiento = data;
        Swal.fire('Información','Seguimiento creado correctamente','success').then(
          result => this.router.navigate(['/paciente/form/',this.idPaciente])
        );
        
      }
    );
  }

  private actualizarSeguimiento(): void {
    this.seguimientoService.actualizarSeguimiento(this.seguimiento).subscribe(
      (data) => {
        this.seguimiento = data;
        console.log(this.seguimiento);
        Swal.fire('Información','Seguimiento actualizado correctamente','success').then(
          result => this.router.navigate(['/paciente/form/' + this.idPaciente + '/seguimiento/' + this.seguimiento.id])
        );
        
      }
    );
  }
}
