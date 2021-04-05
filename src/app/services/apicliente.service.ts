import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from "../models/response";
import { Cliente } from '../models/cliente';

const HttpOption = {
headers: new HttpHeaders({
  'Content-Type': 'application/json' 
})
};

@Injectable({
  providedIn: 'root'
})
export class ApiclienteService {

  url: string='https://localhost:5001/api/cliente'; 
  constructor(private http: HttpClient) { }

  getClientes(): Observable<Response>{
    return this.http.get<Response>(this.url);
  }

  addCliente(cliente: Cliente): Observable<Response>{
    return this.http.post<Response>(this.url, cliente, HttpOption);
  }

  editCliente(cliente: Cliente): Observable<Response>{
    return this.http.put<Response>(this.url, cliente, HttpOption);
  }

  deleteCliente(id:number):Observable<Response>{
    return this.http.delete<Response>(`${this.url}/${id}`);
  }

}
