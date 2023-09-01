import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_models/user.model';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent implements OnInit {
  public form: FormGroup | any;

  constructor(
    private dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.form = new FormGroup(
      {
        firstName: new FormControl(this.data.user.firstName, [Validators.required]),
        lastName:new FormControl(this.data.user.lastName, [Validators.required]),
        userName: new FormControl(this.data.user.userName, [Validators.required]),
        email: new FormControl(this.data.user.email, [Validators.required, Validators.email]),
        passwordHash: new FormControl(this.data.user.passwordHash, [Validators.required, Validators.minLength(6)])
      },
    );
  }

  get f() {
    return this.form.controls;
  }

  onSave(): void {
    if (this.form.invalid) {
      return;
    }
    const updatedUser: User = {
      ...this.data.user,
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      userName: this.f.userName.value,
      email: this.f.email.value,
      passwordHash: this.f.passwordHash.value
    };

    this.userService.updateUser(updatedUser.id, updatedUser).subscribe(() => {
      this.dialogRef.close(true);
      this.userService.getAllUsers();
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
