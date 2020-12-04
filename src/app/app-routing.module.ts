import { ProductDisplayComponent } from './components/product-display/product-display.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CartComponent } from './components/cart/cart.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { StoreComponent } from './components/store/store.component';
import { CheckoutComponent } from './components/checkout/checkout.component';


const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: StoreComponent },
  { path: 'shopping-cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'templates', component: TemplatesComponent },
  { path: 'templates-details/:id', component: TemplatesComponent },
  { path: 'product-details/:id', component: ProductDisplayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
