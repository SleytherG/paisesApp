import { Component, OnInit } from '@angular/core';
import {PaisService} from "../../services/pais.service";
import {Country} from "../../interfaces/pais.interface";
import {tap} from "rxjs";

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.scss']
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  paises: Country[] = [];

  constructor(
    private paisService: PaisService
  ) { }

  getClaseCss( region: string): string {
    return (region === this.regionActiva) ? 'btn btn-primary': 'btn btn-outline-primary';
  }

  ngOnInit(): void {
  }

  activarRegion( region: string) {
    console.log(region);
    if (region === this.regionActiva) { return; }
    this.regionActiva = region;
    this.paises = [];

    this.paisService.getPaisPorRegion( region )
      .pipe(
        tap(console.log)
      )
      .subscribe({
        next: (paises) => {
          this.paises = paises;
        }
      })
  }

}
