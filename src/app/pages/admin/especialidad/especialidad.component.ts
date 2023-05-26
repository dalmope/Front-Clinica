import { Component, OnDestroy, OnInit } from '@angular/core';
import { Role } from 'src/app/models/Role';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',})
export class EspecialidadComponent implements OnInit, OnDestroy {

  totalItems: number = 0;
  pagination = 1;
  ListaRoles: Role[] = [];

  constructor(private roleService: RoleService) { }

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
        console.log(res);
      }
    });
  }

  onSubmit(): void {

  }

}
