import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
constructor(private router: Router, private api:ApiService){
  this.user = this.api.get('user','session')
  this.friends()
}

chats(){
  this.router.navigate(['/home/chats'])
}

accepted:any;
user:any;

friends(){
  this.api.genericGet('/get-accepted').subscribe({
    next: (res: any) => {
      this.accepted = res.filter((invite: any) => invite.sendTo === this.user.username);
    },
    error: (err: any) => console.log("error", err)
  });
}

accept(acceptedItem: any){
console.log(acceptedItem)
sessionStorage.setItem('sendTo', JSON.stringify(acceptedItem))
this.router.navigate(['/home/chats'])
}

}
