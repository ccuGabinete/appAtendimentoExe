import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { Usuario } from '../models/usuario';

import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

import {OverlayContainer} from '@angular/cdk/overlay';



@NgModule({
  declarations: [HomeComponent],
  imports: [  CommonModule,
              SharedModule,
              HomeRoutingModule,
              BrowserAnimationsModule,
              MatInputModule,
              FormsModule,
              MatButtonModule
            ],
  providers: [Usuario]
})


export class HomeModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
  }
}
