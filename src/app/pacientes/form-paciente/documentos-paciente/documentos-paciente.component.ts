import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Documento } from '../../../models/documento';
import { DocumentoService } from '../../../services/documento.service';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-documentos-paciente',
  templateUrl: './documentos-paciente.component.html'
})
export class DocumentosPacienteComponent {

  public documentos: Documento[];
  public pacienteId: number;
  public paginador: any;
  private page: any;
  private file: File;

  constructor(private documentoService: DocumentoService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.cargarDocumentosPaciente();
  }

  private cargarDocumentosPaciente(): void {
    if (!this.page){
      this.page = 0;
    }
    this.activatedRoute.params.subscribe(
      params => {
        this.pacienteId = params['idPaciente'];
        if (this.pacienteId) {
          this.documentoService.getAllDocumentoByPacienteId(this.pacienteId,this.page).subscribe(
            data => {
              this.documentos = data.content as Documento[];
              this.paginador = data;
            }
          );
        }
      }
    );
  }

  public obtenerPagina(event: any): any {
    this.page = event;
    this.cargarDocumentosPaciente();
  }

  public borrarDocumento(idDocumento: number): void {
    Swal.fire({
      title: 'Información',
      text: "¿Desea borrar el documento seleccionado?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then(
      result => {
        if (result.isConfirmed) {
          this.documentoService.borrarDocumento(idDocumento).subscribe(
            data => {
              this.documentos.splice(this.documentos.findIndex(documento => documento.id === idDocumento), 1);
              Swal.fire('Información', 'Documento borrado correctamente', 'success');
            }
          );
        }
      }
    );
  }

  public capturarArchivo(event): void {
    console.log(event);
    this.file = event.target.files[0];
    this.subirDocumento();
  }

  private subirDocumento(): void {
    const formData: FormData = new FormData();
    formData.append('paciente', this.pacienteId.toString());
    formData.append('file', this.file, this.file.name);
    this.documentoService.subirDocumento(formData).subscribe(
      res => {
        Swal.fire('Información', 'Documento subido correctamente', 'success');
        this.cargarDocumentosPaciente();
      }
    );
  }

  public descargarDocumento(doc: Documento): void {
    this.documentoService.descargarDocumento(doc).subscribe(
      blob => saveAs(blob, doc.nombre)
    );
  }

}
