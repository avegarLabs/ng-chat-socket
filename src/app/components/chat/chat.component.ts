import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from 'src/app/models/chat-message';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  messageInput: string = '';
  userId: string = "";
  messageList: any[] = [];



  constructor(
    private chatService: ChatService,
    private actRoute: ActivatedRoute) {}

  ngOnInit() {
    this.userId = this.actRoute.snapshot.params["userId"];
    this.chatService.joinRoom('ABC');
    this.listenerMessage();
  }

  send() {
    const chatMessage = {
      message: this.messageInput,
      user: this.userId,
    } as ChatMessage;
    this.chatService.sendMessage('ABC', chatMessage);
    this.messageInput = '';
  }

  listenerMessage(){
    this.chatService.getMessageSubject().subscribe((messages: any) => {
     this.messageList = messages
    });
  }
}
