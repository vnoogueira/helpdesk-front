import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit{

  cliente : Cliente = {
    id: '',
    nome: '',
    email: '',
    cpf: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(
    private clienteService : ClienteService,
    private activatedRoute : ActivatedRoute,
    private toastMessage : ToastrService,
    public dialog: MatDialog,
    private route : Router
  ){}

  ngOnInit(): void {
    this.cliente.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.findClientById();
  }

  findClientById() : void{
    this.clienteService.findClientById(this.cliente.id).subscribe(resp => {
      resp.perfis = [];
      this.cliente = resp;
    })
  }

  deleteCliente(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: `Tem certeza que deseja excluir o técnico ${this.cliente.nome} ?`,
    });

    dialogRef.afterClosed().subscribe((result : boolean) => {
      if(result){
        this.clienteService.deleteCliente(this.cliente.id).subscribe(() => {
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
    });
  }   
}
