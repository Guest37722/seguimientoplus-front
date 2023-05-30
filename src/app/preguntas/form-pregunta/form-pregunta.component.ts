import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import { Pregunta } from 'src/app/models/pregunta';
import { PreguntaService } from 'src/app/services/pregunta.service';

@Component({
  selector: 'app-form-pregunta',
  templateUrl: './form-pregunta.component.html'
})
export class FormPreguntaComponent {

  public pregunta: Pregunta = new Pregunta;
  public idPregunta: number;

  constructor(private preguntaService: PreguntaService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.cargarPregunta();
  }

  private cargarPregunta(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.idPregunta = params['idPregunta'];
        if (this.idPregunta) {
          this.preguntaService.getPreguntaById(this.idPregunta).subscribe(
            data => this.pregunta = data
          );
        }
      }
    );
  }

  public guardar(): void {
    if (this.pregunta.id) {
      this.actualizarPregunta();
    } else {
      this.crearPregunta();
    }
  }

  private crearPregunta(): void {
    this.preguntaService.crearPregunta(this.pregunta).subscribe(
      (data) => {
        this.pregunta = data;
        Swal.fire('Información','Pregunta creada correctamente','success').then(
          result => this.router.navigate(['/preguntas'])
        );
        
      }
    );
  }

  private actualizarPregunta(): void {
    this.preguntaService.actualizarPregunta(this.pregunta).subscribe(
      (data) => {
        this.pregunta = data;
        Swal.fire('Información','Pregunta actualizada correctamente','success').then(
          result => this.router.navigate(['/pregunta/form/',this.pregunta.id])
        );
        
      }
    );
  }
}
