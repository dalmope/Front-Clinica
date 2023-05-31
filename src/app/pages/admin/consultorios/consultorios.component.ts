import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Consultorio } from 'src/app/models/Consultorio';
import { ConsultorioService } from 'src/app/services/consultorio.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-tables',
  templateUrl: './consultorios.component.html',
})
export class ConsultoriosComponent implements OnInit, OnDestroy {

  editRowIndex: number = -1;
  totalItems: number = 0;
  pagination = 1;
  ListaConsultorios: Consultorio[] = [];
  create = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

  constructor(private consulService: ConsultorioService,
    private noti : NotificationService,
    private token: TokenService) { }

  ngOnDestroy(): void {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }

  ngOnInit(): void {
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");

    this.consulService.getAllActivos().subscribe({
      next: (res: any) => {
        this.ListaConsultorios = res;
        this.totalItems = this.ListaConsultorios.length;
        console.log(res);
      },
      error: () => {
        this.noti.onWarning('Tu sesión ha expirado');
        this.token.logOut();
      }
    });
  }

  onSubmit(): void {
    this.consulService.create(new Consultorio(this.create.value)).subscribe({
      next: (res: any) => {
        console.log(res);
        this.ListaConsultorios.push(res);
        this.totalItems = this.ListaConsultorios.length;
      },
      error: () => {
        this.token.logOut();
      }
    });
  }

  toggleEditMode(rowIndex: number) {
    if (this.editRowIndex === -1) {
      this.editRowIndex = rowIndex;
    } else {
      this.cancelEditMode();
    }
  }

  cancelEditMode() {
    this.editRowIndex = -1;
  }

  guardarCambios(rowIndex: number) {
    this.consulService.update(this.ListaConsultorios[rowIndex]).subscribe({
      next: (res: any) => {
        this.noti.onSuccesfull(res.message);
      },
      error: () => {
        this.token.logOut();
      }
    });
  }

  saveEditMode(rowIndex: number) {
    this.cancelEditMode();
    this.guardarCambios(rowIndex);
  }

}
