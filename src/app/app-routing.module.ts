import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_components/login/login.component';
import { UsersComponent } from './_components/users/users.component';
import { LoginsComponent } from './_components/logins/logins.component';

const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },
  {
    path:'dashboard',
    component: LoginComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'user-logins',
    component: LoginsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
