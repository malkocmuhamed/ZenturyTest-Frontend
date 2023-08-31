import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_models/user.model';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: [this.data.user.firstName, Validators.required],
      lastName: [this.data.user.lastName, Validators.required],
      userName: [this.data.user.userName, Validators.required],
      email: [this.data.user.email, [Validators.required, Validators.email]]
    });
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
      email: this.f.email.value
    };

    this.userService.updateUser(updatedUser.id, updatedUser).subscribe(() => {
      this.dialogRef.close(true);
      this.userService.getUsers();
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
