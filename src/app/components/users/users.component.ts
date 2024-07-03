import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InviteComponent } from 'src/app/forms/invite/invite.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  foundOne: any;

  constructor(private api: ApiService, private dialog: MatDialog) {
    this.foundOne = this.api.get('searched', 'session')
  }

  invite() {
    this.dialog.open(InviteComponent, {
      width: '30vw',
      maxWidth: '100vw',
      height: '35vh'
    });
  }
}
