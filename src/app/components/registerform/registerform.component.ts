import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
})
export class RegisterformComponent {
  dataSelects = {
    "1": "Seleccione su tipo de documento",
    "2": "Cédula de ciudadanía",
    "3": "Cédula de Extranjería",
    "4": "Tarjeta de Identidad",
    "5": "Pasaporte",
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

  constructor(private noti: NotificationService) { }

  onSubmit() {
    console.log("si sirvo")
    Object.keys(this.formGroup.controls).forEach(key => {
      // Get errors of every form control
      if (this.formGroup.get(key).errors) {
        this.noti.onError(key + ' es requerido');
      }
    });
    if (this.formGroup.invalid) {
      console.log("si sirvo")
      //recorrer el objeto this.formGroup.invalid
      console.log(this.formGroup)
      for (const key in this.formGroup.errors) {
        console.log(key);
        this.noti.onError(key + ' es requerido');
      }
    }
  }

}
