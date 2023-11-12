import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus:boolean = false;
  // public usuario: Usuario = new Usuario('');
  public usuario!: Usuario;

  constructor( private socket: Socket,
              private router: Router) {
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus(){
    // Observables
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      // Reutilizamos esta funcion por si se cae el servidor
      this.cargarStorage();
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

  // Para logearnos
  loginWS( nombre: string ){
    // Como no es asincrono lo convertimos a promesa
    return new Promise<void>( (resolve, reject ) => {
      this.emit('configurar-usuario', {nombre}, (resp:any) => {
        console.log(resp);
        this.usuario = new Usuario( nombre );
        this.guardarStorage()
        resolve();
      });
    });
    // this.socket.emit('configurar-usuario', { nombre }, ( resp:any ) => {
    //   console.log(resp);
    // });
  }

  logoutWS(){
    this.usuario = new Usuario( null );
    localStorage.removeItem('usuario');
    const payload = {
      nombre: 'sin-nombre'
    }
    this.emit('configurar-usuario', payload, () => {});
    this.router.navigateByUrl('/');
  }

  getUsuario(){
    return this.usuario;
  }

  guardarStorage(){
    localStorage.setItem('usuario',JSON.stringify( this.usuario ));
  }

  cargarStorage(){
    const usuarioJSON = localStorage.getItem('usuario');
    if (usuarioJSON !== null) {
      this.usuario = JSON.parse( usuarioJSON );
      this.loginWS( this.usuario.nombre );
    }
  }

}
