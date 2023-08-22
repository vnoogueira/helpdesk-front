import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamados';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

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
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.chamados.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.findChamadoById(),
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findChamadoById() : void {
    this.chamadoService.findChamadoById(this.chamados.id).subscribe(response => {
      this.chamados = response
    }, ex => {
      console.error(ex);
      
      this.toastMessage.error(ex.error.error);
    })
  }

  updateChamado(): void {
    this.chamadoService.updateChamado(this.chamados).subscribe(response => {
      this.toastMessage.success('Chamado atualizado com sucesso', 'Atualização de chamado');
      this.router.navigate(['chamados'])
    }, ex => {
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

  returnStatus(status: any): string {
    if (status == '0') {
      return 'ABERTO'
    } else if (status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return 'FECHADO'
    }
  }

  returnPrioridade(prioridade: any): string {
    if (prioridade == '0') {
      return 'BAIXA'
    } else if (prioridade == '1') {
      return 'MEDIA'
    } else {
      return 'ALTA'
    }
  }

}
