import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_components/login/login.component';
import { UsersComponent } from './_components/users/users.component';
import { LoginsComponent } from './_components/logins/logins.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-logins',
    component: LoginsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
