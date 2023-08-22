import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamados';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  chamados: Chamado = {
    prioridades: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: ''
  }

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = []

  prioridades: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  titulo: FormControl = new FormControl(null, [Validators.required]);
  observacoes: FormControl = new FormControl(null, [Validators.required]);
  tecnico: FormControl = new FormControl(null, [Validators.required]);
  cliente: FormControl = new FormControl(null, [Validators.required]);


  constructor(
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private chamadoService: ChamadoService,
    private toastMessage: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  insertChamado(): void {
    this.chamadoService.insertChamado(this.chamados).subscribe(response => {
      this.toastMessage.success('Chamado criado com sucesso', 'Novo Chamado');
      this.router.navigate(['chamados'])
    }, ex => {
      console.error(ex);
      
      this.toastMessage.error(ex.error.error);
    });
  }

findAllClientes(): void {
  this.clienteService.findAllClient().subscribe(response => {
    this.clientes = response;
  })
}

findAllTecnicos(): void {
  this.tecnicoService.findAll().subscribe(response => {
    this.tecnicos = response
  })
}

validateFields(): boolean {
  return this.prioridades.valid && this.status.valid && this.titulo.valid && this.observacoes.valid && this.tecnico.valid && this.cliente.valid;
}

}
