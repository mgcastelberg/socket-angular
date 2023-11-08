import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'basico';

  constructor( public wsService: WebsocketService,
              public chatService: ChatService ){}

  ngOnInit() {
    //  console.log('hello');
    //  this.chatService.sendMessage('Hola desde Angular');

    // Codigo que se este ejecutando todo el tiempo para Mensajes privados
    this.chatService.getMessagesPrivate().subscribe( msg => {
      console.log(msg);
    });

  }
}
