import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
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
  
}
