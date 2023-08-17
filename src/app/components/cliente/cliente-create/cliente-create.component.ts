import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit{

  cliente : Cliente = {
    id: '',
    nome: '',
    email: '',
    cpf: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));


  constructor(
    private clienteService : ClienteService,    
    private toastMessage : ToastrService,
    private route : Router
  ){}

  ngOnInit(): void {
    
  }

  //Inserindo um cliente novo na base
  createClient() :  void{
    this.clienteService.createClient(this.cliente).subscribe(() => {
      this.toastMessage.success('Cadastro realizado com sucesso', 'Cadastro')
      this.route.navigate(['clientes'])
    }), ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toastMessage.error(element.message);
        });
      } else {
        this.toastMessage.error(ex.error.message);
      }
    }
  }

  //Validando os campos de criação do cliente
  validarCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
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
