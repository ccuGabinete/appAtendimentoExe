
import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DadosComponent } from './dados/dados.component';
import { Cadastro } from './models/cadastro/cadastro';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginService } from './services/acesso/login.service';
import { Usuario } from './models/usuario/usuario';
import { HomeComponent } from './home/home.component';

import { AppComponent } from './app.component';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AlertaComponent } from './alerta/alerta.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, DadosComponent, HomeComponent, AlertaComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgbModule,
    MatToolbarModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [Usuario, Cadastro, LoginService],
  bootstrap: [AppComponent],
  exports: [AlertaComponent],
  entryComponents: [AlertaComponent]

})
export class AppModule {}
