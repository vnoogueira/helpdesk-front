import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chamado } from '../models/chamados';
import { API_CONFIG } from '../config/api.config';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  constructor(
    private httpCliente : HttpClient,
  ) { }

  findAllChamado() : Observable<Chamado[]> {
    return this.httpCliente.get<Chamado[]>(`${API_CONFIG.baseUrl}/chamados`);
  }

  findChamadoById(id : any) : Observable<Chamado> {
    return this.httpCliente.get<Chamado>(`${API_CONFIG.baseUrl}/chamados/${id}`)
  }

  insertChamado(body : Chamado) : Observable<Chamado> {
    return this.httpCliente.post<Chamado>(`${API_CONFIG.baseUrl}/chamados`, body);
  }

  updateChamado(body : Chamado) : Observable<Chamado> {
    return this.httpCliente.put<Chamado>(`${API_CONFIG.baseUrl}/chamados/${body.id}`, body);
  }
}
