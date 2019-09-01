import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario/usuario';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogadoService {

  public message = new Usuario();
  public messageSource = new BehaviorSubject(this.message.login);
  currentMessage = this.messageSource.asObservable();

  constructor() { 
      this.message.login = '000';
  }

  mudarUsuario(login: string){
      this.messageSource.next(login);
  }
}
