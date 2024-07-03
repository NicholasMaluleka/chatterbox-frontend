import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {
constructor(private api:ApiService){
  this.user = this.api.get('user','session')
  this.friends()
}

user:any
accepted:any[] =[];

friends(){
  this.api.genericGet('/get-accepted').subscribe({
    next: (res: any) => {
      this.accepted = res.filter((invite: any) => invite.sendTo === this.user.username);
      console.log(this.accepted);
    },
    error: (err: any) => console.log("error", err)
  });
}
}
