import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PaisService} from "../../services/pais.service";
import {Country} from "../../interfaces/pais.interface";

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.scss']
})
export class PorPaisComponent implements OnInit {
  // @ViewChild('txtPais') txtPais!: ElementRef<HTMLInputElement>;

  termino: string = '';
  buscarPais: string = 'Buscar país...';
  hayError: boolean = false;
  paises: Country[] = [];

  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(
    private paisService: PaisService
  ) { }

  ngOnInit(): void {
  }

  buscar(termino: string) {
    // this.paisService.buscarPais( this.txtPais.nativeElement.value )
    this.mostrarSugerencias = false;
    this.termino = termino;
    this.paisService.buscarPais( this.termino )
      .subscribe({
        next: (paises) => {
          this.hayError = false;
            console.log(paises);
            this.paises = paises;
      },
        error: (err) => {
            this.hayError = true;
            this.paises = [];
            console.log('Error');
            console.info(err);
        }});
  }

  sugerencias( termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais( termino )
      .subscribe( {
        next: (paises) => {
        this.paisesSugeridos = paises.splice(0,5);
      },
      error: (err) => {
          this.paisesSugeridos = [];
      }});

  }

  buscarSugerido( termino: string) {
    this.buscar( termino );
  }


}
