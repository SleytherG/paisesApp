import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Country} from "../interfaces/pais.interface";

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(
    private http: HttpClient
  ) {
  }

  buscarPais(pais: string): Observable<Country[]> {

    const url = `${this.apiUrl}/name/${pais}`
    return this.http.get<Country[]>(url);
    // .pipe(
    //   catchError( err => of(['Hola Mundo']))
    // );
  }

  buscarCapital(capital: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${capital}`;
    return this.http.get<Country[]>(url);

  }

  getPaisPorAlpha( id: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country[]>( url );
  }
}
