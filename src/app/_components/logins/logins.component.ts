import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserLogin } from 'src/app/_models/userLogin.model';
import { UserLoginService } from 'src/app/_services/userLogin.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
  totalUserLoginsCount: number = 0;
  currentPageIndex: number = 0;
  pageSize: number = 10;

  constructor(private userLoginsService: UserLoginService) { }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    const pageNumber = 1; // Adjust to your desired page number
    const pageSize = 10; // Adjust to your desired page size
    this.loadUserLogins(pageNumber, pageSize);
    this.loadAllUserLogins();
    // this.userLogins.paginator = this.paginator;
    // this.userLogins = new MatTableDataSource<UserLogin>(/* Your array of UserLogin objects */);
    // this.userLogins.sort = this.sort;
    // this.userLogins.sortingDataAccessor = (login, property) => {
    //   switch (property) {
    //     case 'loginDateTime': return new Date(login.loginDateTime);
    //     default: return login[property];
    //   }
    // };
    // // this.userLogins.sort.direction = 'desc';
    // this.userLogins.sort.active = 'loginDateTime';
  }

  pageChanged(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  
    // Load the user logins for the current page
    this.loadUserLogins(this.currentPageIndex + 1, this.pageSize);
  }

  loadAllUserLogins(): void {
    this.userLoginsService.getAllUserLogins()
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

  loadUserLogins(page: number, pageSize: number): void {
    this.userLoginsService.getUserLogins(page, pageSize).subscribe(paginatedResponse => {
      this.userLogins = new MatTableDataSource<UserLogin>(paginatedResponse.items);
      this.totalUserLoginsCount = paginatedResponse.totalItems;
    });
  }

  userFilter = '';
  applyFilter(): void {
    this.userLogins.filter = this.userFilter.trim().toLowerCase();
  }

}
