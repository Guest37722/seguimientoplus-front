import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Pregunta_Respuesta } from '../../../models/pregunta_respuesta';
import { PreguntaRespuestaService } from '../../../services/preguntaRespuesta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-respuestas-paciente',
  templateUrl: './respuestas-paciente.component.html'
})
export class RespuestasPacienteComponent {

  public respuestas: Pregunta_Respuesta[];
  public pacienteId: number;
  public paginador: any;
  private page: any;

  constructor(private preguntaRespuestaService: PreguntaRespuestaService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.cargarRespuestasPaciente();
  }

  private cargarRespuestasPaciente(): void {
    if (!this.page){
      this.page = 0;
    }
    this.activatedRoute.params.subscribe(
      params => {
        this.pacienteId = params['idPaciente'];
        if (this.pacienteId) {
          this.preguntaRespuestaService.getAllRespuestasByPacienteId(this.pacienteId,this.page).subscribe(
            data => {
              this.respuestas = data.content as Pregunta_Respuesta[];
              this.paginador = data;
            }
          );
        }
      }
    );
  }

  public obtenerPagina(event: any): any {
    this.page = event;
    this.cargarRespuestasPaciente();
  }

  public borrarRespuesta(idRespuesta: number): void {
    Swal.fire({
      title: 'Información',
      text: "¿Desea borrar la respuesta seleccionada?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then(
      result => {
        if (result.isConfirmed) {
          this.preguntaRespuestaService.borrarRespuesta(idRespuesta).subscribe(
            data => {
              this.respuestas.splice(this.respuestas.findIndex(respuesta => respuesta.id === idRespuesta), 1);
              Swal.fire('Información', 'Respuesta borrado correctamente', 'success');
            }
          );
        }
      }
    );
  }
}
