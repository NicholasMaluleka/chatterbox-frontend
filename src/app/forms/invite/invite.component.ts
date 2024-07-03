import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent {
  inviteForm: FormGroup
  constructor(private dialogRef: MatDialogRef<InviteComponent>, private router: Router,
    private snackbar: MatSnackBar, private api: ApiService) {

    this.user = this.api.get('user', 'session')
    this.searched = this.api.get('searched', 'session')

    this.inviteForm = new FormGroup({
      username: new FormControl(this.user.username, [Validators.required]),
      sendTo: new FormControl(this.searched.username, [Validators.required]),
      message: new FormControl('', [Validators.required, Validators.maxLength(30)])
    })

    console.log(this.user.username)
    console.log(this.searched.username)
  }

  user: any;
  searched:any;

  invite(){
    let formValue = this.inviteForm.value;

    if (this.inviteForm.invalid) {
      this.snackbar.open("fill in fields", "OK", { duration: 4000 })
      return
    }
    this.api.genericPost('/send-invite', formValue).subscribe({
      next: (res:any) =>{
        this.dialogRef.close()
        this.snackbar.open("Invite successfully sent", "OK", {duration:3000})
        console.log(res)
      }
    })
  }

  close(){
    this.dialogRef.close()
  }
}
