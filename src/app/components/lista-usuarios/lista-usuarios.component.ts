import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuarioActivosObs:Observable<any>;

  constructor(private chatService:ChatService) { }

  ngOnInit() {
    this.usuarioActivosObs = this.chatService.getusuariosActivos();

    //emitir obtener usuarios
    this.chatService.emitirUsuariosActivos();
  }

}
