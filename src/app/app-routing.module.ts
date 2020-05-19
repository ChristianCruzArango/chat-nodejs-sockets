import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule, Router } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { UsuarioGuard } from './guards/usuario-guard.service';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'mensajes', component: MensajesComponent,canActivate:[UsuarioGuard] },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
