import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from './../../../models/chamados';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {
  ELEMENT_DATA: Chamado[] = [
    {
      id: 1,
      dataAbertura: '10/10/2021',
      dataFechamento: '11/10/2021',
      prioridade: 'Alta',
      status: 'ANDAMENTO',
      titulo: 'Chamado 1',
      descricao: 'Chamado teste',
      tecnico: 1,
      cliente: 6,
      nomeCliente: 'Valdir',
      nomeTecnico: 'Albert Einstein'
    }
  ];

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
