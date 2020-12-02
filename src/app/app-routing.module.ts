import { TemplatesComponent } from './components/templates/templates.component';
import { StoreComponent } from './components/store/store.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CartComponent } from './components/cart/cart.component';


const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: StoreComponent },
  { path: 'shopping-cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'templates', component: TemplatesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
