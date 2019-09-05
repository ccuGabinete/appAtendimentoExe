import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Cadastro } from '../../models/cadastro/cadastro';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = 'https://ccuapi.herokuapp.com/';
const local = 'https://ccuapi.herokuapp.com/buscarDoc';


@Injectable({
  providedIn: 'root'
})
export class SalvarcadastroService {

  constructor(private http: HttpClient) { }

  salvarCadastro (cadastro: Cadastro): Observable<Cadastro> {
    return this.http.post<any>(apiUrl, cadastro, httpOptions)
    .pipe(
      tap(itens => console.log('saved data')),
      catchError(this.handleError('', []))
    );
  }

  buscarCadastro (numero: string): Observable<Cadastro> {
    return this.http.post<any>(local, {numero: numero}, httpOptions)
    .pipe(
      tap(itens => console.log('loaded data')),
      catchError(this.handleError('', []))
    );
  }

    private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
