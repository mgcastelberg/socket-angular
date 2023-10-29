import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus:boolean = false;

  constructor( private socket: Socket) {
    this.checkStatus();
  }

  checkStatus(){
    // Observables
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  emit( evento: string, payload?:any, callback?: Function ){

    console.log('Emitiendo evento');
    this.socket.emit(evento, payload, callback);

  }

  // No olvidar cerrar el listener al cambiar de componente
  listen( evento: string ){
    return this.socket.fromEvent( evento );
  }

}
