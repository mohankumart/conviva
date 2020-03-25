import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ErrorPageComponent } from './error-page/error-page.component';


const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'not-found', component: ErrorPageComponent},
    {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }







