import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
loginForm:FormGroup

constructor(private router: Router, private snackbar:MatSnackBar, private service:ApiService){
  this.loginForm = new FormGroup({
    email: new FormControl ('',[Validators.required]),
    password: new FormControl ('',[Validators.required, Validators.minLength(4),Validators.minLength(8)])
  })
}

reset(){
  this.loginForm.reset()
}

register(){
  this.router.navigate(['register'])
}

submit() {
  this.service.genericGet('/get-users').subscribe({
    next: (res: any) => {
      const user = res.find((admin: any) => admin.email == this.loginForm.controls['email'].value);

      if (user) {
        // Check if the password matches the confirm password stored during registration
        if (user.confirmPassword === this.loginForm.controls['password'].value) {
          this.snackbar.open('Logged in', 'OK', { duration: 3000 });
          sessionStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['home/landing']);
        } else {
          this.snackbar.open('Invalid password', 'OK', { duration: 3000 });
        }
      } else {
        this.snackbar.open('Invalid email', 'OK', { duration: 3000 });
      }
    },
    error: (err: any) => {
      console.error(err);
    },
  });
}

  }
