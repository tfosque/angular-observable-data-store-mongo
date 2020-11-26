import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionModule } from 'ngx-bootstrap/accordion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { CredentialsComponent } from './components/credentials/credentials.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    TemplatesComponent,
    LoginComponent,
    LandingPageComponent,
    MainNavComponent,
    CredentialsComponent,
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    AccordionModule.forRoot()
  ],
  exports: [CommonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
