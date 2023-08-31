import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  username: string = '';
  password: string = '';

  onSubmit() {
    // Here you can add your authentication logic
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    // You can replace the above log statements with your actual authentication code
  }
}
