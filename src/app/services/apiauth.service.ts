import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Login } from '../models/login';
import { Response } from '../models/response';
import { Usuario } from '../models/usuario';

const HttpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json' 
  })
  };
  
@Injectable({
  providedIn: 'root'
})
export class ApiauthService {
  url: string = 'https://localhost:5001/api/Usuario/Login';

  private usuarioSubject: BehaviorSubject<Usuario>;
  public usuario: Observable<Usuario>;
  public get usuarioData(): Usuario | null {
    return this.usuarioSubject.value;
  } 

  constructor(private _http: HttpClient) {
    this.usuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem("Usuario")!))
    this.usuario = this.usuarioSubject.asObservable(); 
   }

  login(login: Login): Observable<Response>{
    console.log(login);
    return this._http.post<Response>(this.url,login,HttpOption).pipe(
      map(res =>{
        if(res.exito===1){
          const usuario:Usuario= res.data;
          localStorage.setItem("Usuario", JSON.stringify(usuario));
          this.usuarioSubject.next(usuario); 
        }
        return res;
      })
    );
  }

  logout(){
    localStorage.removeItem("Usuario");
    this.usuarioSubject.next(null!);
  }
}
