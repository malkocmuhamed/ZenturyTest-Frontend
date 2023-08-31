import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirmDelete(): void {
    this.userService.deleteUser(this.data.userId).subscribe(() => {
      this.dialogRef.close(true); // Indicate successful deletion
    });
  }

  cancel(): void {
    this.dialogRef.close(false); // Indicate cancellation
  }

}
