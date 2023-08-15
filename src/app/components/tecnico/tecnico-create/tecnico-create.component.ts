import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
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
    private tecnicoService: TecnicoService,
    private toastMessage: ToastrService,
    private route: Router
  ) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  validarCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }

  createTecnico(): void {
    this.tecnicoService.create(this.tecnico).subscribe(() => {
      this.toastMessage.success('Técnico cadastrado com sucesso !', 'Cadastro');
      this.route.navigate(['tecnicos']);
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toastMessage.error(element.message);
        });
      } else {
        this.toastMessage.error(ex.error.message);
      }
    })
  }

  addPerfil(codPerfil: any): void {
    if (this.tecnico.perfis.includes(codPerfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(codPerfil), 1);
    } else {
      this.tecnico.perfis.push(codPerfil);
    }
  }

}
