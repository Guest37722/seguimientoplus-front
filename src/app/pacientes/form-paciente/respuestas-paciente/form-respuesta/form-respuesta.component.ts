import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import { Pregunta_Respuesta } from '../../../../models/pregunta_respuesta';
import { PreguntaRespuestaService } from '../../../../services/preguntaRespuesta.service';
import { Pregunta } from 'src/app/models/pregunta';
import { PreguntaService } from 'src/app/services/pregunta.service';

@Component({
  selector: 'app-form-respuesta',
  templateUrl: './form-respuesta.component.html'
})
export class FormRespuestaComponent implements OnInit {

  public respuesta: Pregunta_Respuesta = new Pregunta_Respuesta;
  public idPaciente: number;
  public preguntaSelectId: number;
  public preguntaSelect: Pregunta = new Pregunta;
  private idRespuesta: number;
  public preguntas: Pregunta[];

  constructor(private preguntaRespuestaService: PreguntaRespuestaService, private preguntaService: PreguntaService,private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarRespuesta();
  }

  private cargarRespuesta(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.idPaciente = params['idPaciente'];
        this.idRespuesta = params['idRespuesta'];
        if (this.idRespuesta && this.idPaciente) {
          this.preguntaRespuestaService.getRespuestaById(this.idRespuesta).subscribe(
            data => {
              this.respuesta = data;
              this.preguntaSelectId = data.pregunta.id;
              console.log(this.preguntaSelectId);
            }
          );
        } else {
          this.cargarPreguntas();
        }
      }
    );
  }

  public capturarPregunta(): void {
    this.preguntaService.getPreguntaById(this.preguntaSelectId).subscribe(
      data => this.preguntaSelect = data
    );
  }

  private cargarPreguntas(): void {
    this.preguntaService.getAll().subscribe(
      data => this.preguntas = data
      );
  }

  public guardar(): void {
    if (this.respuesta.id) {
      this.actualizarRespuesta();
    } else {
      this.crearRespuesta();
    }
  }

  private crearRespuesta(): void {
    this.respuesta.idPaciente = this.idPaciente;
    this.respuesta.pregunta = this.preguntaSelect;
    this.preguntaRespuestaService.crearRespuestas(this.respuesta).subscribe(
      (data) => {
        this.respuesta = data;
        Swal.fire('Información', 'Respuesta creada correctamente', 'success').then(
          result => this.router.navigate(['/paciente/form/', this.idPaciente])
        );

      }
    );
  }

  private actualizarRespuesta(): void {
    this.preguntaRespuestaService.actualizarRespuesta(this.respuesta).subscribe(
      (data) => {
        this.respuesta = data;
        console.log(this.respuesta);
        Swal.fire('Información', 'Respuesta actualizada correctamente', 'success').then(
          result => this.router.navigate(['/paciente/form/' + this.idPaciente + '/seguimiento/' + this.respuesta.id])
        );

      }
    );
  }

}
