import { Usuario } from './../../models/usuario/usuario';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = 'http://localhost:3000/acesso/validar';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getUser (usuario: Usuario): Observable<boolean> {
    return this.http.post<any>(apiUrl, usuario, httpOptions)
    .pipe(
      tap(itens => console.log('loaded data')),
      catchError(this.handleError('getProdutos', []))
    );
  }

    private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

}
