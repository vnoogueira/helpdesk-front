import { TecnicoService } from 'src/app/services/tecnico.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Tecnico } from 'src/app/models/tecnico';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

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
    private route: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.tecnico.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.tecnicoService.findById(this.tecnico.id).subscribe(response => {
      response.perfis = []
      this.tecnico = response;
    })
  }

  validarCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }

  updateTecnico(): void {
    this.tecnicoService.update(this.tecnico).subscribe(() => {
      this.toastMessage.success('Técnico atualizado com sucesso !', 'Atualização de Cadastro');
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
