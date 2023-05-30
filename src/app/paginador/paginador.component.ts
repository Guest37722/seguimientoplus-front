import { Component, OnInit, SimpleChanges, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styles: []
})
export class PaginadorComponent implements OnInit, OnChanges {

  @Input() paginador: any;
  @Output() numeroPagina = new EventEmitter<number>();

  paginas: number[];

  desde: number;
  hasta: number;
  total: number;

  constructor() { }

  ngOnInit() {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges) {
    const paginadorActualizado = changes['paginador'];

    if (paginadorActualizado.previousValue) {
      this.initPaginator();
    }

  }

  private initPaginator(): void {
    this.desde = Math.min(Math.max(1, this.paginador.number - 4), this.paginador.totalPages - 10);
    this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number + 9), 11);
    this.total = this.paginador.totalElements;
    if (this.paginador.totalPages > 10) {
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((valor, indice) => indice + this.desde);
    } else {
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }

  emitirPagina(pagina: number) {
    this.numeroPagina.emit(pagina);
  }


}
