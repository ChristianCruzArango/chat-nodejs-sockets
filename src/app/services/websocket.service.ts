import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketsStatus = false;

  constructor(private socket:Socket) {
    this.checkStatus();
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

}
