import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  register:FormGroup

  constructor(private router: Router, private api: ApiService, private snackbar: MatSnackBar){
    this.register = new FormGroup({
      email: new FormControl ('',[Validators.required]),
      username: new FormControl ('',[Validators.required]),
      password: new FormControl ('',[Validators.required, Validators.minLength(4),Validators.minLength(8)]),
      confirmPassword: new FormControl('',[Validators.required]),
      status: new FormControl('available',[Validators.required])
    })
  }
  
  reset(){
    this.register.reset()
  }
  
  login(){
    this.router.navigate(['login'])
  }

  submit(){
    let formValue = this.register.value;

    if (this.register.invalid) {
      this.snackbar.open("fill in fields", "OK", { duration: 3000 })
      return
    }

    this.api.genericPost('/add-user', formValue)
      .subscribe({
        next: (res: any) => {
          this.router.navigate(['login'])
        },
        error: (err: any) => console.log("error", err),
        complete: () => { }
      })
     this.snackbar.open('registration successfull', "OK", { duration: 3000 })
  }
  }
