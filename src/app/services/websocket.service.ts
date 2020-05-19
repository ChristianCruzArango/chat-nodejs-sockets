import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { UsuarioModel } from '../models/Usuario.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketsStatus = false;
  private usuario:UsuarioModel;

  constructor(private socket:Socket) {
    this.checkStatus();
    this.cargarStorage();
  }

  checkStatus(){
    this.socket.on('connect',()=>{
      console.log('conectado al servidor');
      this.socketsStatus = true;
    });

    this.socket.on('disconnect',()=>{
      console.log('desconectado el servidor');
      this.socketsStatus = false;
    });
  }

  emitir(evento:string,payload?:any,callback?:Function){
    this.socket.emit(evento,payload,callback);
  }

  escuchar( evento:string){
    return this.socket.fromEvent(evento);
  }

  loginWS(nombre:string){

    return new Promise((resolve ,reject)=>{
      this.emitir('configurar-usuario',{nombre},resp=>{
        this.usuario = new UsuarioModel(nombre);
        this.guardarStorage();

        resolve();
      });
    });
  }

  getUsuario(){
    return this.usuario;
  }

  guardarStorage(){
    localStorage.setItem('usuario',JSON.stringify(this.usuario));
  }

  cargarStorage(){

    if(localStorage.getItem('usuario')){
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      //esta funcion se coloca para mantener la sesion asi se recargue
      this.loginWS(this.usuario.nombre);
    }

  }

}
