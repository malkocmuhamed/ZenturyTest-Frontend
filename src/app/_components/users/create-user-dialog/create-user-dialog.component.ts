import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.css']
})
export class CreateUserDialogComponent {
  public form: FormGroup | any;


  constructor(
    private dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initializeForm();
  }

  initializeForm(){
    this.form = new FormGroup(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName:new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        passwordHash: new FormControl('', [Validators.required, Validators.minLength(8)])
      },
    );
  }

  createUser(): void {
    if (this.form.invalid) {
      return;
    }
   console.log("CREATE")
    this.userService.createUser(this.form.value).subscribe(() => {
      this.dialogRef.close(true); // Indicate successful creation
    });
  }

  cancel(): void {
    this.dialogRef.close(false); // Indicate cancellation
  }
}