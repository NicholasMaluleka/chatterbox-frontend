import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SearchUserComponent } from 'src/app/popUps/search-user/search-user.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  constructor(private router: Router, private api: ApiService, private dialog: MatDialog) {
    this.user = this.api.get('user', 'session')
    this.fRequests()
  }

  user: any;
  friendReq:any;

  fRequests(){
    let number;
    this.api.genericGet('/get-invites').subscribe({
      next: (res:any) =>{
        number = res.filter((invite: any) => invite.sendTo === this.user.username)
        this.friendReq = number.length
        console.log(number.length)
      }
    })
  }

  search() {
    this.dialog.open(SearchUserComponent, {
      width: '30vw',
      maxWidth: '100vw',
      height: '35vh'
    });
  }

  home(){
    this.router.navigate(['/home/landing'])
  }

  logout(){
    this.router.navigate(['login'])
    sessionStorage.clear()
  }

  requests(){
    this.router.navigate(['/home/requests'])
  }

  friends(){
    this.router.navigate(['/home/friends'])
  }


}
