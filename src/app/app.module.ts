import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './_components/users/users.component';
import { LoginsComponent } from './_components/logins/logins.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { AuthService } from './_services/auth.service';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { UserEditDialogComponent } from './users/user-edit-dialog/user-edit-dialog.component';
import { DeleteUserDialogComponent } from './_components/users/delete-user-dialog/delete-user-dialog.component';
import { CreateUserDialogComponent } from './_components/users/create-user-dialog/create-user-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersComponent,
    LoginsComponent,
    UserEditDialogComponent,
    DeleteUserDialogComponent,
    CreateUserDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
