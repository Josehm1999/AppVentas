import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './models/usuario';
import { ApiauthService } from './services/apiauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AppVentas';
  usuario!: Usuario;
  
  constructor(public apiAuth: ApiauthService,
              private router: Router) {
    this.apiAuth.usuario.subscribe( res =>{
      this.usuario = res;
    });
  }

  logout(): void{
    this.apiAuth.logout();
    this.router.navigate(['/Login']);
  }
}
