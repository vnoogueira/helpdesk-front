import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlOptions, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    email: '',
    cpf: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  };

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  email: FormControl = new FormControl(null, Validators.email);
  cpf: FormControl = new FormControl(null, Validators.required);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.findClientById();    
  }

  //Procurando o cliente pelo ID
  findClientById(): void {
    this.clienteService.findClientById(this.cliente.id).subscribe(resp => {
      resp.perfis = [];
      this.cliente = resp;
    })
  }

  //Atualizando CLiente
  updateTecnico(): void {
    this.clienteService.updateClient(this.cliente).subscribe(() => {
      this.toast.success('Cliente atualizado com sucesso', 'Atualização Cadastral');
      this.route.navigate(['clientes'])
    }), ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.meessage);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    }
  }

  //Validando os campos para habilitar o botão de atualizar
  validarCampos() : boolean{
    return this.nome.valid && this.email.valid && this.cpf.valid && this.senha.valid;
  }

  //Adicionando o perfil ao cliente
  addPerfil(codPerfil: any): void {
    if (this.cliente.perfis.includes(codPerfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(codPerfil), 1);
    } else {
      this.cliente.perfis.push(codPerfil);
    }
  }

}
