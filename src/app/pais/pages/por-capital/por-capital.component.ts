import { Component } from '@angular/core';
import {Country} from "../../interfaces/pais.interface";
import {PaisService} from "../../services/pais.service";

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.scss']
})
export class PorCapitalComponent {

  buscarCapital: string = 'Buscar capital...';
  termino: string = '';
  hayError: boolean = false;
  capitales: Country[] = [];


  constructor(
    private paisService: PaisService
  ) { }

  buscar( termino: string ) {
    this.termino = termino;

    this.paisService.buscarCapital( this.termino )
      .subscribe({
        next: (capitales) => {
          this.hayError = false;
          this.capitales = capitales;
        }
      , error: (err) => {
          this.hayError = true;
          this.capitales = [];
          console.log('Error', err);
          console.error(err);
        }
      })

  }
  sugerencias( sugerencia: string ) {
    this.hayError = false;
  }

}
