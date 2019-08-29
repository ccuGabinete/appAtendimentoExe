import { Component, OnInit } from '@angular/core';
import { Setores } from '../models/setores';
import { Documentos } from '../models/documentos';
import { Cadastro } from '../models/cadastro';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss']
})
export class DadosComponent implements OnInit {

  constructor(public cadastro: Cadastro) { }

  setores = new Setores().getTipos();
  documentos = new Documentos().getDocs();
  

  ngOnInit() {
  this.cadastro = new Cadastro();
  }

  onSubmit(value){
    console.log(value)
  }

}
