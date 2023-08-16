import { TecnicoService } from 'src/app/services/tecnico.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Tecnico } from 'src/app/models/tecnico';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit{
  tecnico: Tecnico = {
    id: '',
    nome: '',
    email: '',
    cpf: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

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

  deleteTecnico(): void {
    this.tecnicoService.delete(this.tecnico.id).subscribe(() => {
      this.toastMessage.success('Técnico excluido com sucesso !', 'Exclusão de Cadastro');
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

}
