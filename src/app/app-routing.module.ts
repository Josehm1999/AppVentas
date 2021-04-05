import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login/login.component';
import { AuthGuard } from './security/auth.guard';
import { VentaComponent } from './venta/venta.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'Home',
    pathMatch: 'full',
  },
  { path:'Home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Cliente',
    component:ClienteComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'Venta',
    component:VentaComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'Login',
    component:LoginComponent
  },
  {
    path: '**',
    redirectTo: 'Home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
