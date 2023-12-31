import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
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
        userName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        passwordHash: new FormControl('', 
        [Validators.required, 
        Validators.minLength(6),
        // Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]).*$')
      ])
      },
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  createUser(): void {
    if (this.form.invalid) {
      return;
    }
    this.userService.createUser(this.form.value).subscribe(() => {
      this.dialogRef.close(true); 
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}