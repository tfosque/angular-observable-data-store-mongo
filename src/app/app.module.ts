import { CartComponent } from './components/cart/cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionModule } from 'ngx-bootstrap/accordion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { CredentialsComponent } from './components/credentials/credentials.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/shared/list/list.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { SuggestiveSellingComponent } from './components/shared/suggestive-selling/suggestive-selling.component';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { ThumbsComponent } from './components/shared/thumbs/thumbs.component';
import { CartNavComponent } from './components/cart/cart-nav/cart-nav.component';
import { ShoppingCartListComponent } from './components/shopping-cart-list/shopping-cart-list.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { StoreComponent } from './components/store/store.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplatesComponent,
    LoginComponent,
    LandingPageComponent,
    MainNavComponent,
    CredentialsComponent,
    SearchBarComponent,
    LogoutComponent,
    HomeComponent,
    ListComponent,
    ModalComponent,
    CartComponent,
    SuggestiveSellingComponent,
    PaginationComponent,
    ThumbsComponent,
    CartNavComponent,
    ShoppingCartListComponent,
    OrderSummaryComponent,
    CheckoutComponent,
    StoreComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    AccordionModule.forRoot(),
    HttpClientModule
  ],
  exports: [
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
