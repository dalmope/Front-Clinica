import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Consultorio } from 'src/app/models/Consultorio';
import { ConsultorioService } from 'src/app/services/consultorio.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-tables',
  styleUrls: ['./consultorios.component.scss'],
  templateUrl: './consultorios.component.html',
})
export class ConsultoriosComponent implements OnInit, OnDestroy {

  editRowIndex: number = -1;
  totalItems: number = 0;
  pagination = 1;
  canDelete = 0;
  canDeleteName = '';
  getALl = false;
  ListaConsultorios: Consultorio[] = [];
  create = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
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
    this.getAllActivos();
  }

  getAllActivos() {
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

  toggleGetAll() {
    if (this.getALl) {
      this.getAll();
    } else {
      this.getAllActivos();
    }
  }

  getAll() {
    this.consulService.getAll().subscribe({
      next: (res: any) => {
        this.ListaConsultorios = res;
        this.totalItems = this.ListaConsultorios.length;
      },
      error: () => {
        this.noti.onWarning('Tu sesión ha expirado');
        this.token.logOut();
      }
    });
  }

  onSubmit(): void {
    console.log(this.create.value);
    this.consulService.create(new Consultorio(this.create.value)).subscribe({
      next: (res: any) => {
        this.ListaConsultorios.push(res);
        this.totalItems = this.ListaConsultorios.length;
        this.noti.onSuccesfull(res.message);
        this.toggleGetAll();
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

  setDelete(id: number, nombre: string) {
    this.canDelete = id;
    this.canDeleteName = nombre;
  }

  cancelEditMode() {
    this.editRowIndex = -1;
  }

  toggleDelete(id: number) {
    this.consulService.desactivate(id).subscribe({
      next: (res: any) => {
        this.getAllActivos();
      },
      error: () => {
        this.token.logOut();
      }
    });
  }

  guardarCambios(rowIndex: number) {
    this.consulService.update(this.ListaConsultorios[rowIndex]).subscribe({
      next: (res: any) => {
        this.noti.onSuccesfull(res.message);
        this.toggleGetAll();
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
