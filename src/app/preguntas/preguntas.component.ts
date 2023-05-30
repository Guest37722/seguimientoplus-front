import { Component } from '@angular/core';
import { Pregunta } from '../models/pregunta';
import { PreguntaService } from '../services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html'
})
export class PreguntasComponent {

  public preguntas: Pregunta[];
  public paginador: any;
  private page: any;

  constructor(private preguntaService: PreguntaService) { }

  ngOnInit() {
    this.cargarPreguntas();
  }

  private cargarPreguntas(): void {
    if(!this.page){
      this.page = 0
    }
    this.preguntaService.getAllPreguntas(this.page).subscribe(
      data => {
        this.preguntas = data.content as Pregunta[];
        this.paginador = data;
      }
    );
  }

  public obtenerPagina(event: any): any {
    this.page = event;
    this.cargarPreguntas();
  }

  public borrarPregunta(idPregunta: number): void {
    Swal.fire({
      title: 'Información',
      text: "¿Desea borrar la pregunta seleccionada?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then(
      result => {
        if (result.isConfirmed) {
          this.preguntaService.borrarPregunta(idPregunta).subscribe(
            data => {
              this.preguntas.splice(this.preguntas.findIndex(pregunta => pregunta.id === idPregunta), 1);
              Swal.fire('Información', 'Pregunta borrada correctamente', 'success');
            }
          );
        }
      }
    );
  }

}
