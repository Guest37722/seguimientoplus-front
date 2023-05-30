import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PacienteService } from './services/paciente.service';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { HttpClientModule } from '@angular/common/http';
import { FormPacienteComponent } from './pacientes/form-paciente/form-paciente.component'
import { FormsModule } from '@angular/forms';
import { DatosPacienteComponent } from './pacientes/form-paciente/datos-paciente/datos-paciente.component';
import { SeguimientosPacienteComponent } from './pacientes/form-paciente/seguimientos-paciente/seguimientos-paciente.component';
import { DocumentosPacienteComponent } from './pacientes/form-paciente/documentos-paciente/documentos-paciente.component';
import { FormSeguimientoComponent } from './pacientes/form-paciente/seguimientos-paciente/form-seguimiento/form-seguimiento.component';
import { SeguimientoService } from './services/seguimiento.service';
import { FormPreguntaComponent } from './preguntas/form-pregunta/form-pregunta.component';
import { PreguntaService } from './services/pregunta.service';
import { PaginadorComponent } from './paginador/paginador.component';
import { RespuestasPacienteComponent } from './pacientes/form-paciente/respuestas-paciente/respuestas-paciente.component';
import { FormRespuestaComponent } from './pacientes/form-paciente/respuestas-paciente/form-respuesta/form-respuesta.component';
import { PreguntaRespuestaService } from './services/preguntaRespuesta.service';
import { DocumentoService } from './services/documento.service';

const routes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'pacientes', component: PacientesComponent },
  { path: 'preguntas', component: PreguntasComponent },
  { path: 'paciente/form', component: FormPacienteComponent },
  { path: 'paciente/form/:idPaciente', component: FormPacienteComponent },
  { path: 'paciente/form/:idPaciente/seguimiento', component: FormSeguimientoComponent },
  { path: 'paciente/form/:idPaciente/seguimiento/:idSeguimiento', component: FormSeguimientoComponent },
  { path: 'paciente/form/:idPaciente/respuesta', component: FormRespuestaComponent },
  { path: 'paciente/form/:idPaciente/respuesta/:idRespuesta', component: FormRespuestaComponent },
  { path: 'pregunta/form', component: FormPreguntaComponent },
  { path: 'pregunta/form/:idPregunta', component: FormPreguntaComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    PacientesComponent,
    PreguntasComponent,
    FormPacienteComponent,
    DatosPacienteComponent,
    SeguimientosPacienteComponent,
    DocumentosPacienteComponent,
    FormSeguimientoComponent,
    FormPreguntaComponent,
    PaginadorComponent,
    RespuestasPacienteComponent,
    FormRespuestaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    PacienteService,
    SeguimientoService,
    PreguntaService,
    PreguntaRespuestaService,
    DocumentoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
