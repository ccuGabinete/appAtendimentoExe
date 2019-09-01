import { Component, OnInit, OnDestroy } from '@angular/core';
import { Setores } from '../models/setores/setores';
import { Documentos } from '../models/documentos/documentos';
import { Cadastro } from '../models/cadastro/cadastro';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material';
import { AvisosalvarService } from '../services/avisosalvar/avisosalvar.service';
import { AvisosalvarComponent } from '../avisosalvar/avisosalvar.component';
import { AvisocamposComponent } from '../avisocampos/avisocampos.component';
import { SalvarcadastroService } from '../services/salvarcadastro/salvarcadastro.service';
import { LogadoService } from '../services/logado/logado.service';
import { AvisocamposService } from '../services/avisocampos/avisocampos.service';


@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss']
})

export class DadosComponent implements OnInit, OnDestroy {

  constructor(
    public cadastro: Cadastro,
    private _snackBar: MatSnackBar,
    private serviceSalvar: AvisosalvarService,
    private serviceCampos: AvisocamposService,
    private salvarservice: SalvarcadastroService,
    private logado: LogadoService
  ) { }

  setores = new Setores().getTipos();
  documentos = new Documentos().getDocs();

  ngOnInit() {
    this.cadastro = new Cadastro();
    this.cadastro.matricula = '';
    this.logado.currentMessage.subscribe(user => {
      this.cadastro.matricula = user;
    })
  
  }

  onSubmit(value){
   if(
        !this.cadastro.atendido 
    ||  !this.cadastro.destino 
    ||  !this.cadastro.documento
    ||  !this.cadastro.numero
   ){
      this.serviceCampos.mudarAviso(false);
      this.openSnackBarCampos();
   }else{
      this.salvarservice.salvarCadastro(this.cadastro).subscribe(data => {        
        if (data.atendido){
          this.serviceSalvar.mudarAviso(true);
          this.openSnackBarSalvar();
          this.reset();
        }else{
          this.openSnackBarSalvar();
        }
        
      }
    )
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
    this.cadastro.atendido = null;
    this.cadastro.destino = "Setor";
    this.cadastro.documento = "Documento";
    this.cadastro.numero = null;
  }

  ngOnDestroy(): void {

  }

}
