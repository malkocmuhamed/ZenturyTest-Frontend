import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserLogin } from 'src/app/_models/userLogin.model';
import { UserLoginService } from 'src/app/_services/userLogin.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeleteLoginDialogComponent } from './delete-login-dialog/delete-login-dialog.component';

@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.css']
})
export class LoginsComponent implements OnInit {

  displayedColumns: string[] = [
    'userName', 
    'loginDateTime',
    'loginTime',
    'isLoginSuccessful',
    'actions']; 
  userLogins:  MatTableDataSource<UserLogin>;
  totalUserLoginsCount: number = 0;
  currentPageIndex: number = 0;
  pageSize: number = 10;

  constructor(
    private userLoginsService: UserLoginService, 
    private dialog: MatDialog 
  ) { }

  @ViewChild(MatSort) sortLogins: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    const pageNumber = 1;
    const pageSize = 10;
    this.loadUserLogins(pageNumber, pageSize);
    this.loadAllUserLogins();
    // this.userLogins.sort = this.sortLogins;
  }

  openDeleteDialog(userLogin: UserLogin): void {
    const dialogRef = this.dialog.open(DeleteLoginDialogComponent, {
      width: '300px',
      data: { userId: userLogin.id } // Pass the user ID to the dialog
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadAllUserLogins();
      }
    });
  }

  pageChanged(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  
    // Load the user logins for the current page
    this.loadUserLogins(this.currentPageIndex + 1, this.pageSize);
  }

  loadAllUserLogins(): void {
    this.userLoginsService.getAllUserLogins()
      .subscribe(users => {
        this.userLogins = new MatTableDataSource<UserLogin>(users);
      });
  }

  loadUserLogins(page: number, pageSize: number): void {
    this.userLoginsService.getUserLogins(page, pageSize).subscribe(paginatedResponse => {
      this.userLogins = new MatTableDataSource<UserLogin>(paginatedResponse.items);
      this.totalUserLoginsCount = paginatedResponse.totalItems;
    });
  }

  deleteUserLogin(id: number): void {
    this.userLoginsService.deleteUserLogin(id).subscribe(
      () => {},
      error => {
        console.error('Error deleting user login:', error);
      }
    );
  }
}
