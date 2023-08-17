import { Cliente } from './../models/cliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private httpCliente: HttpClient
  ) { }

  findAllClient() : Observable<Cliente[]>{
    return this.httpCliente.get<Cliente[]>(`${API_CONFIG.baseUrl}/clientes`);
  }

  findClientById(id : number) : Observable<Cliente> {
    return this.httpCliente.get<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }

  updateClient(cliente : Cliente) : Observable<Cliente>{
    return this.httpCliente.put<Cliente>(`${API_CONFIG.baseUrl}/clientes/${cliente.id}`, cliente);
  }

  createClient(cliente : Cliente) : Observable<Cliente>{
    return this.httpCliente.post<Cliente>(`${API_CONFIG.baseUrl}/clientes`, cliente);
  }

  deleteCliente(id : any) : Observable<Cliente>{
    return this.httpCliente.delete<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }  
}
