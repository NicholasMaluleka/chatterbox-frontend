import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent {
  searcher: FormGroup;

  constructor(private matDialog: MatDialogRef<SearchUserComponent>,
     private api: ApiService, private router: Router) {
    this.searcher = new FormGroup({
      search: new FormControl('', [Validators.required])
    });

  }

  close() {
    this.matDialog.close();
  }
  found: any;

  search() {
    const username = this.searcher.get('search')?.value;
  
    this.api.genericGet(`/get-users`).subscribe({
      next: (res: any) => {
        this.found = res.find((user:any) => user.username === username);
        
        if (this.found) {
          console.log('User found:', this.found);
          sessionStorage.setItem('searched', JSON.stringify(this.found))
          this.router.navigate(['home/add'])
          this.matDialog.close()
        } else {
          console.log('User not found');
        }
      },
      error: (err: any) => console.log("error", err),
      complete: () => {}
    });
  }}
