import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  // Pipe async de angular para obtener y destruir cuando cambiamos de componente
  usuariosActivosObs!: Observable<any>;

  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
    this.usuariosActivosObs = this.chatService.getUsuariosActivos();

    // Emitir Obtener usuarios
    this.chatService.emitirUsuariosActivos();

  }

}
