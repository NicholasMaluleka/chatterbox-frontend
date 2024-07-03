import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent {

  chats: FormGroup;

  constructor(private api:ApiService){
    this.sender = this.api.get('user', 'session')
    this.receiver = this.api.get('sendTo','session')
    this.messages(); //Fetch messages when component initializes

    this.chats = new FormGroup({
      text: new FormControl(''),
      sender: new FormControl(this.sender.username),
      receiver: new FormControl(this.receiver.username)
    })
  }

  sender:any;
  receiver:any;
  receivedText:any[] = [];

  sentText:any[] = [];

  onEnterPressed() {
    let message = this.chats.value;

    this.api.genericPost('/send-message', message).subscribe({
      next: (res:any) =>{
        console.log(res)
        this.sentText.push(res.text); 
        this.chats.controls['text'].reset()
        console.log(this.sentText,"het")
      },
      error: (err:any) => console.log("error", err),
      complete: () => {}
    })
  }

  messages(){
    this.api.genericGet('/get-messages').subscribe({
      next: (res:any) =>{
        console.log(res)
        // Assuming the response contains an array of messages in 'text' field
        this.sentText = res.map((message: any) => message.text);
      },
      error: (err:any) => console.log("error", err),
      complete: () => {}
    })
  }
}
