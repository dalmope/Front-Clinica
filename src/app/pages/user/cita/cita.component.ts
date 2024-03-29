import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Citas } from 'src/app/models/Citas';
import { CrearCita } from 'src/app/models/CrearCita';
import { NotificationService } from 'src/app/services/notification.service';
import { TokenService } from 'src/app/services/token.service';
import { CitaService } from 'src/app/services/cita.service';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/Role';
import { Usuario } from 'src/app/models/usuario';
import { UserService } from 'src/app/services/user.service';
import { ConsultorioService } from 'src/app/services/consultorio.service';
import { AsignarCita } from 'src/app/models/AsignarCita';
import { EstadoCitaEnum } from 'src/app/models/EstadoCitaEnum';


@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss']
})
export class CitaComponent implements OnInit, OnDestroy {

  constructor(
    private token: TokenService,
    private noti: NotificationService,
    private citaService: CitaService,
    private especService: RoleService,
    private userService: UserService,
    private consulService: ConsultorioService) { }

    getAll = false;
    dataSelects: any = {};
    showTimePicker = false;
    username: string = this.token.getUserName();
    isSecretary: boolean = this.token.isSecretary();
    date = new Date();
    editRowIndex: number = -1;
    pagination = 1;
    misCitas: Citas[] = [];
    totalMisCitas: number = 0;
    listAllCitas: Citas[] = [];
    totalAllCitas: number = 0;
    listEspecialidades: Role[] = [];
    listDoctores: Usuario[] = [];
    listConsultorios: any[] = [];
    citaDelete = -1;
    create = new FormGroup({
      idEspecialidad: new FormControl('', [Validators.required]),
      codigo: new FormControl(this.username),
      motivo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]),
    })

    asing = new FormGroup({
      idCita: new FormControl('', [Validators.required]),
      fechaHora: new FormControl('', [Validators.required]),
      idMedico: new FormControl('', [Validators.required]),
      idConsultorio: new FormControl('', [Validators.required]),
    })

  ngOnDestroy(): void {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }

  ngOnInit(): void {
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
    this.getCitas();
    this.getEspecialidades();
    if (this.isSecretary) {
      this.getDoctores();
      this.getConsultorios();
      this.getAllCitas();
    }
  }

  getAllCitas(): void {
    this.citaService.getAll().subscribe({
      next: (res: any) => {
        this.listAllCitas = res;
        this.totalAllCitas = this.listAllCitas.length;
      },
      error: (err: any) => {
        this.token.logOut();
      }
    });
  }
  
  getDoctores(): void {
    this.userService.getAllMeds().subscribe({
      next: (res: any) => {
        this.listDoctores = res;
        console.log(this.listDoctores);
      },
      error: (err: any) => {
        this.token.logOut();
      }
    });
  }

  getConsultorios(): void {
   this.consulService.getAllActivos().subscribe({
      next: (res: any) => {
        this.listConsultorios = res;
        console.log(this.listConsultorios);
      },
      error: (err: any) => {
        this.token.logOut();
      }
    });
  }

  setDataSelects(): void {
    for (let especialidad of this.listEspecialidades) {
      this.dataSelects[especialidad.id] = especialidad.name;
    }
  }

  getCitas(): void {
    this.citaService.getAllByUser().subscribe({
      next: (res: any) => {
        this.misCitas = res;
        this.totalMisCitas = this.misCitas.length;
      },
      error: () => {
        this.token.logOut();
      }
    });
  }

  getCitasPorAsignar(): void {
    this.getCitasByEstado(EstadoCitaEnum.POR_ASIGNAR);
  }

  getCitasByEstado(estado: EstadoCitaEnum): void {
    this.citaService.getAllByEstado(estado).subscribe({
      next: (res: any) => {
        this.listAllCitas = res;
        this.totalAllCitas = this.listAllCitas.length;
      },
      error: () => {
        this.token.logOut();
      }
    });
  }

  setDeleteCita(i:number): void {
    this.citaDelete = i;
  }

  cancelarCita(i: number): void {
    this.citaService.deleteCita(i).subscribe({
      next: (res: any) => {
        this.noti.onSuccesfull("Cita cancelada correctamente");
        this.getCitas();
      },
      error: () => {
        this.token.logOut();
      }
    });
  }

  getEspecialidades(): void {
    this.especService.getEspecialidades().subscribe({
      next: (res: any) => {
        this.listEspecialidades = res;
        this.setDataSelects();
      },
      error: () => {
        this.token.logOut();
      }
    });
  }

  createEspecialidad(): void {
    this.citaService.create(new CrearCita(this.create.value)).subscribe({
      next: (res: any) => {
        this.noti.onSuccesfull("Cita creada correctamente");
        this.getCitas();
      },
      error: (err: any) => {
        this.noti.onError(err.error.error);
      }
    });
  }

  asignarCita(i): void {
    this.asing.get('idCita').setValue(i);
    this.citaService.asignarCita(new AsignarCita(this.asing.value)).subscribe({
      next: (res: any) => {
        this.noti.onSuccesfull("Cita asignada correctamente");
        console.log(res);
        this.getCitas();
      },
      error: (err: any) => {
        this.noti.onError(err.error.error);
      }
    });
  }

  pageChanged(event: any): void {
    this.pagination = event;
  }

  toggleEditMode(rowIndex: number) {
    if (this.editRowIndex === -1) {
      this.editRowIndex = rowIndex;
    } else {
      this.cancelEditMode();
    }
  }

  toggleGetAll() {
    this.getAll = !this.getAll;
    if (this.getAll) {
      this.getAllCitas();
    } else {
      this.getCitasPorAsignar();
    }
  }

  cancelEditMode() {
    this.editRowIndex = -1;
  }

  toggleTimePicker() {
    this.showTimePicker = !this.showTimePicker;
  }

  toggleCancelarCita(id: number) {
    this.citaService.deleteCita(id).subscribe({
      next: (res: any) => {
        this.noti.onSuccesfull("Cita cancelada correctamente");
        this.getCitas();
      },
      error: () => {
        this.token.logOut();
      }
    });
  }

}
