import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent {
  constructor(private api: ApiService, private dialog:MatDialog, private snackbar:MatSnackBar) {
    this.fetch();
    this.user = this.api.get('user', 'session');
  }

  user: any;
  invites: any[] = [];

  fetch() {
    this.api.genericGet('/get-invites').subscribe({
      next: (res: any) => {
        this.invites = res.filter((invite: any) => invite.sendTo === this.user.username);
        console.log(this.invites);
        
        if (this.invites.length > 0) {
          console.log('Invites:', this.invites);
        } else {
          console.log('No invites found for', this.user.username);
        }
      },
      error: (err: any) => console.log("error", err)
    });
  }

  accept(invite: any){
    this.api.genericPost('/accept-invite', invite).subscribe({
      next: (res:any) =>{
        console.log(res)
        this.DeleteRow(invite);
      },
      error: (err:any) => console.log("error",err),
      complete: ()=>{}
    })
  }

  delete(inviteItem: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '42vw',
      maxWidth: '100vw',
      height: '32vh'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRow(inviteItem);
      }
    });
  }

  deleteRow(inviteItem: any) {
    const username = inviteItem.username; 
    this.api.genericDelete(`/delete-request`).subscribe({
      next: (res: any) => {
        console.log('Invite deleted successfully:', res);
        this.fetch(); 
        this.snackbar.open('Invite deleted successfully', 'Ok', { duration: 3000 });
      },
      error: (error: any) => {
        console.error('Error deleting Invite:', error);
        this.snackbar.open('Error deleting Invite', 'Ok', { duration: 3000 });
      }
    });
  }

  DeleteRow(inviteItem: any) {
    const username = inviteItem.username; 
    this.api.genericDelete(`/delete-request`).subscribe({
      next: (res: any) => {
        console.log('Invite deleted successfully:', res);
        this.fetch(); 
        this.snackbar.open('Request accepted successfully', 'Ok', { duration: 3000 });
      },
      error: (error: any) => {
        console.error('Error deleting Invite:', error);
        this.snackbar.open('Error deleting Invite', 'Ok', { duration: 3000 });
      }
    });
  }
}
