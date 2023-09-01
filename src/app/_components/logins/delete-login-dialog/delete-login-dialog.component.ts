import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserLoginService } from 'src/app/_services/userLogin.service';

@Component({
  selector: 'app-delete-login-dialog',
  templateUrl: './delete-login-dialog.component.html', // Create the template for the delete dialog
  styleUrls: ['./delete-login-dialog.component.css']
})
export class DeleteLoginDialogComponent {
  constructor(
    private userLoginsService: UserLoginService,
    public dialogRef: MatDialogRef<DeleteLoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirmDelete(): void {
    this.userLoginsService.deleteUserLogin(this.data.userId).subscribe(() => {
      this.dialogRef.close(true); // Indicate successful deletion
    });
  }

  cancel(): void {
    this.dialogRef.close(false); // Indicate cancellation
  }
}
