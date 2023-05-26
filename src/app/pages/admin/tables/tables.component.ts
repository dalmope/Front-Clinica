import { Component, OnDestroy, OnInit } from '@angular/core';
import { Consultorio } from 'src/app/models/Consultorio';
import { ConsultorioService } from 'src/app/services/consultorio.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',})
export class TablesComponent implements OnInit, OnDestroy {

  totalItems: number = 0;
  pagination = 1;
  ListaConsultorios: Consultorio[] = [];

  constructor(private consulService: ConsultorioService) { }

  ngOnDestroy(): void {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }

  ngOnInit(): void {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");

    this.consulService.getAllActivos().subscribe({
      next: (res: any) => {
        this.ListaConsultorios = res;
        this.totalItems = this.ListaConsultorios.length;
        console.log(res);
      }
    });
  }

  onSubmit(): void {

  }

}
