import { Component, OnInit } from '@angular/core';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.setMessage('Hello Message Service!');
  }
}
