import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnico } from 'src/app/models/tecnico';


@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {
  ELEMENT_DATA: Tecnico [] = [
    {
      id: 1,
      nome: 'Vitor Ferreira',
      cpf: '456.309.168-58',
      email: 'vitor@gmail.com',
      senha: '1234',
      perfis: ['0'],
      dataCriacao: '10/10/2023'
    }
  ]

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  constructor(){

  }

  ngOnInit(): void {
    
  }

  @ViewChild(MatPaginator) paginator:any = MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

