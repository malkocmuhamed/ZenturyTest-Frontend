import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from 'src/app/_models/authenticatedresponse.model';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;
  invalidLogin: boolean | any;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder, 
    private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        userName: ['', [Validators.required]],
        password: ['', Validators.required],
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {  
    if (this.form.invalid) {
      return;
    }
    const user = {
      userName: this.f['userName'].value,
      password: this.f['password'].value,
    }
    this.authService.login(user.userName, user.password)
    .subscribe({
      next: (response: AuthenticatedResponse) => {
        const token = response.token;
        localStorage.setItem("token", token); 
        this.invalidLogin = false; 
        this.router.navigate(["/users"]);
        // this.toastr.success('User authenticated successfully.', "WELCOME!");
      },
      error: (err: HttpErrorResponse) =>{ 
        this.invalidLogin = true;
      }
    });
  }  

  onReset(): void {
    this.form.reset();
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/dashboard']);
    // this.toastr.info("Login session has expired.");
  }
}
