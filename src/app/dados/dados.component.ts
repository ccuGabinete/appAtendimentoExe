import { CadastroService } from './../services/cadastro/cadastro.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Setores } from '../models/setores/setores';
import { Documentos } from '../models/documentos/documentos';
import { Cadastro } from '../models/cadastro/cadastro';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { AvisosalvarService } from '../services/avisosalvar/avisosalvar.service';
import { AvisosalvarComponent } from '../avisosalvar/avisosalvar.component';
import { AvisocamposComponent } from '../avisocampos/avisocampos.component';
import { SalvarcadastroService } from '../services/salvarcadastro/salvarcadastro.service';
import { LogadoService } from '../services/logado/logado.service';
import { AvisocamposService } from '../services/avisocampos/avisocampos.service';
import * as moment from 'moment-timezone';
import { Buscacadastro } from '../models/busca/buscacadastro';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss']
})

export class DadosComponent implements OnInit, OnDestroy {
  nome: string;
  usuario: string;

  constructor(
    private router: Router,
    public cadastro: Cadastro,
    private _snackBar: MatSnackBar,
    private serviceSalvar: AvisosalvarService,
    private serviceCampos: AvisocamposService,
    private salvarservice: SalvarcadastroService,
    private logado: LogadoService,
    private cadastroservice: CadastroService,
    public documento: Buscacadastro,
  ) { }

  setores = new Setores().getTipos();
  documentos = new Documentos().getDocs();
  
  @ViewChild('submitButton') submitButton;
  ngOnInit() {
    this.cadastro = new Cadastro();
    this.documento = new Buscacadastro(); // classe que representa apenas um atributo para resgatar o número do documento entre views
    this.documento.numero = '';

    this.cadastro.matricula = '';
    this.cadastro.data = this.gerarData();
    this.logado.currentMessage.subscribe(user => {
      this.cadastro.matricula = user.login;
      this.usuario = user.nome;
    });
  }

  changeEvent($event){
    this.submitButton.focus();
  }


  onSubmit() {
    if (
      !this.nome
      || !this.cadastro.destino
      || !this.cadastro.documento
      || !this.cadastro.numero
    ) {
      this.serviceCampos.mudarAviso(false);
      this.openSnackBarCampos();
    } else {
      this.cadastro.atendido = this.nome.toUpperCase();
      this.cadastro.numero = this.cadastro.numero.split('/').join('').split('.').join('').split('-').join('');
      this.salvarservice.salvarCadastro(this.cadastro).subscribe(data => {
        if (data.atendido) {
          this.serviceSalvar.mudarAviso(true);
          this.openSnackBarSalvar();
          this.cadastroservice.getCadastro(this.cadastro);
          this.reset();
        } else {
          this.openSnackBarSalvar();
        }
      }
      );
    }
  }

  openSnackBarSalvar() {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.verticalPosition = 'top';
    this._snackBar.openFromComponent(AvisosalvarComponent, config);
  }

  openSnackBarCampos() {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.verticalPosition = 'top';
    this._snackBar.openFromComponent(AvisocamposComponent, config);
  }

  reset() {
    this.nome = null;
    this.cadastro.destino = 'Setor';
    this.cadastro.documento = 'Documento';
    this.cadastro.numero = null;
  }

  gerarData() {
    const data = Date.now();
    const dateMoment = moment(data);
    return dateMoment.tz('America/Sao_Paulo').format('DD/MM/YYYY hh:mm:ss A');
  }

  openSource() {
    this.documento.numero = this.documento.numero
      .split('/').join('')
      .split('.').join('')
      .split('-').join('')
      .split(',').join('');

    this.salvarservice.buscarCadastro(this.documento.numero)
      .subscribe(data => {
        const cadastro = new Cadastro();
        cadastro.atendido = data[0].atendido;
        cadastro.data = data[0].data;
        cadastro.destino = data[0].destino;
        cadastro.documento = data[0].documento;
        cadastro.matricula = this.usuario;
        cadastro.numero = data[0].numero;
        this.cadastroservice.getCadastro(cadastro);

        this.cadastroservice.currentMessage.subscribe(data => {
          if (data.numero) {
            this.router.navigateByUrl('formulario');
          }
        });
      });
  }

  ngOnDestroy(): void {

  }

}
