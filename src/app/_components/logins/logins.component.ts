import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserLogin } from 'src/app/_models/userLogin.model';
import { UserLoginService } from 'src/app/_services/userLogin.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.css']
})
export class LoginsComponent implements OnInit {

  userLogins:  MatTableDataSource<UserLogin>;
  userLogins_: UserLogin[] = [];
  displayedColumns: string[] = [
    'userName', 
    'loginDateTime',
    'loginTime',
    'isLoginSuccessful']; // Add more column names as needed

  constructor(private userLoginsService: UserLoginService) { }
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadUserLogins();
    this.userLogins = new MatTableDataSource<UserLogin>(/* Your array of UserLogin objects */);
    this.userLogins.sort = this.sort;
    this.userLogins.sortingDataAccessor = (login, property) => {
      switch (property) {
        case 'loginDateTime': return new Date(login.loginDateTime);
        default: return login[property];
      }
    };
    // this.userLogins.sort.direction = 'desc';
    this.userLogins.sort.active = 'loginDateTime';

  }

  loadUserLogins(): void {
    this.userLoginsService.getUserLogins()
      .subscribe({
        next: (logins: UserLogin[]) => {
          this.userLogins_ = logins;
          console.log(logins);
        },
        error: (error: any) => {
          console.error('Error loading user logins:', error);
        }
      });
  }

  userFilter = '';

  applyFilter(): void {
    this.userLogins.filter = this.userFilter.trim().toLowerCase();
  }

}
