import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

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
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private activatedRoute: ActivatedRoute,
    private tecnicoService : TecnicoService
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

  onNoClick(result: boolean): void {
    this.dialogRef.close(result);
  }


}
