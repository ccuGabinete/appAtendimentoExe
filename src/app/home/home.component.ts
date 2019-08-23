import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private router: Router, public usuario: Usuario){

  }
 
     
  ngOnInit(): void {
   this.usuario = new Usuario();
  }  
  
  onSubmit() {
    // aqui você pode implementar a logica para fazer seu formulário salvar
    console.log(this.usuario);
  }

  ngOnDestroy(): void {
    console.log("ok");
  }

}
