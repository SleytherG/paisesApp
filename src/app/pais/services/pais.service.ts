import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {Country} from "../interfaces/pais.interface";

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  get httpParams() {
    return new HttpParams().set('fields', 'name,capital,flags,cca2');
  }

  constructor(
    private http: HttpClient
  ) {
  }

  buscarPais(pais: string): Observable<Country[]> {

    const url = `${this.apiUrl}/name/${pais}`
    return this.http.get<Country[]>(url, { params: this.httpParams });
    // .pipe(
    //   catchError( err => of(['Hola Mundo']))
    // );
  }

  buscarCapital(capital: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${capital}`;
    return this.http.get<Country[]>(url, { params: this.httpParams });

  }

  getPaisPorAlpha( id: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country[]>( url );
  }

  getPaisPorRegion( region: string ): Observable<Country[]> {



    const url = `${this.apiUrl}/region/${region}`;
    return this.http.get<Country[]>( url, { params: this.httpParams } )
      .pipe(
        tap( console.log)
      )
  }
}
