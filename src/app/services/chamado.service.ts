import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chamado } from '../models/chamados';
import { API_CONFIG } from '../config/api.config';

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
}
