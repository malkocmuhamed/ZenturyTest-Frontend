import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddsongComponent } from './addsong/addsong.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditsongComponent } from './editsong/editsong.component';

const routes: Routes = [

  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'addsong',
    component: AddsongComponent
  },
  {
    path: 'editsong/:id',
    component: EditsongComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
