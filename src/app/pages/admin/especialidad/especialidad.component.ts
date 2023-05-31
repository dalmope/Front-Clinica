import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/models/Role';
import { NotificationService } from 'src/app/services/notification.service';
import { RoleService } from 'src/app/services/role.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
})
export class EspecialidadComponent implements OnInit, OnDestroy {

  editRowIndex: number = -1;
  totalItems: number = 0;
  pagination = 1;
  ListaRoles: Role[] = [];
  create = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

  constructor(private roleService: RoleService,
    private token: TokenService, private noti: NotificationService) { }

  ngOnDestroy(): void {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }

  ngOnInit(): void {
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");

    this.roleService.getEspecialidades().subscribe({
      next: (res: any) => {
        this.ListaRoles = res;
        this.totalItems = this.ListaRoles.length;
      },
      error: () => {
        this.token.logOut();
      }
    });
  }

  onSubmit(): void {
    this.roleService.getEspecialidades().subscribe({
      next: (res: any) => {
        this.ListaRoles = res;
        this.totalItems = this.ListaRoles.length;
      },
      error: () => {
        this.token.logOut();
      }
    });
  }

  createEspecialidad(): void {
    this.roleService.create(new Role(this.create.value)).subscribe({
      next: (res: any) => {
        this.noti.onSuccesfull("Especialidad creada correctamente");
        this.onSubmit();
      },
      error: () => {
        this.noti.onError("No se pudo crear la especialidad");
      }
    });
  }

  deleteEspecialidad(id: number): void {
    this.roleService.delete(id).subscribe({
      next: () => {
        this.noti.onSuccesfull("Especialidad eliminada correctamente");
        this.onSubmit();
      },
      error: () => {
        this.noti.onError("No se pudo eliminar la especialidad");
      }
    });
  }

  pageChanged(event: any): void {
    this.pagination = event;
  }

  updateEspecialidad(rowIndex: number): void {
    this.roleService.update(this.ListaRoles[rowIndex]).subscribe({
      next: (res: any) => {
        this.noti.onSuccesfull(res.message);
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

  saveEditMode(rowIndex: number) {
    this.cancelEditMode()
    this.updateEspecialidad(rowIndex);
  }

}
