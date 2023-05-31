import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
})
export class RegisterformComponent {
  dataSelects = {
    "0": "Cédula de ciudadanía",
    "1": "Cédula de Extranjería",
    "2": "Tarjeta de Identidad",
    "3": "Pasaporte",
  }
  agreeToTerms = false;

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]),
    adress: new FormControl('', Validators.required),
    idDniType: new FormControl('', [Validators.required]),
    dniNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  constructor(private noti: NotificationService, private auth: AuthService) { }

  onSubmit() {
    if (this.formGroup.invalid) {
      console.log(this.formGroup)
      for (const key in this.formGroup.errors) {
        this.noti.onError(key + ' es requerido');
      }
      return;
    }

    this.auth.register(new NuevoUsuario(this.formGroup.value)).subscribe({
      next: (res: any) => {
        this.noti.onSuccesfull(res.Message);
        this.formGroup.reset();
      },
      error: (err: any) => {
        this.noti.onError(err.error.error);
      }
    });
  }

}
