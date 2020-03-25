import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CustomersComponent } from './customers/customers.component';
import { AddressesComponent } from './addresses/addresses.component';


const routes: Routes = [
    {path: '', redirectTo: '/customers', pathMatch: 'full'},
    {path: 'customers', component: CustomersComponent},
    {path: 'customers/:id', component: AddressesComponent},
    {path: 'not-found', component: ErrorPageComponent},
    {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }







