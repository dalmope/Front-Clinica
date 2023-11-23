import { Component, OnInit, OnDestroy  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import noUiSlider from "nouislider";
import { ChangePassword } from 'src/app/models/change-passwrord';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit, OnDestroy {
  newPass: ChangePassword;
  token: string;
  isToken: boolean = false;
  focus = false;
  danger = false
  success = false
  recovery = new FormGroup({
    dniNumber: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern('^[0-9]*$')])
  })

  changePassword = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)] ),
  })

  constructor(private _route: ActivatedRoute, private authService: AuthService, private noti: NotificationService) {
    this.token = this._route.snapshot.paramMap.get('token');
    if(this.token !== "false"){
      this.isToken = true;
    }
   }

   scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");

    const slider = document.getElementById("sliderRegular");

    noUiSlider.create(slider, {
      start: 40,
      connect: false,
      range: {
        min: 0,
        max: 100
      }
    });

    const slider2 = document.getElementById("sliderDouble");

    noUiSlider.create(slider2, {
      start: [20, 60],
      connect: true,
      range: {
        min: 0,
        max: 100
      }
    });
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

  onFocus() {
    this.focus = true;
  }

  onBlur() {
    this.focus = false;
  }

  submitRecovery(){
    this.noti.onInformation("Enviando correo de recuperación de contraseña");
    this.authService.recoveryPassword(this.recovery.value.dniNumber).subscribe({
      next: (res: any) => {
        this.noti.onSuccesfull("Correo enviado");
      },
      error: (e) => {
        console.log(e);
        this.noti.onError('Ha ocurrido un error, inténtelo más tarde');
      }
    });
  }

  submitChange(){
    console.log(this.changePassword.value);
    this.newPass = new ChangePassword(this.token, this.changePassword.value.password, this.changePassword.value.confirmPassword);
    if(this.newPass.password !== this.newPass.confirmPassword){
      this.noti.onError('Las contraseñas no coinciden');
      return;
    }
    this.noti.onInformation("Cambiando contraseña");
    this.authService.changePassword(this.newPass).subscribe({
      next: (res: any) => {
        this.noti.onSuccesfull("Contraseña cambiada");
      },
      error: () => {
        this.noti.onError('Ha ocurrido un error, inténtelo más tarde');
      }
    });
  }
}
