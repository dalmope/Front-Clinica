import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})

export class NavbarComponent implements OnInit {
  isLogged = false
  isAdmin = false
  isSecretary = false
  isCollapsed = true;
  focus1;
  focus2;
  user: UntypedFormGroup;

  constructor(
    private router: Router, 
    private tokenService: TokenService, 
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private noti: NotificationService,) { }

  ngOnInit(): void {
    this.user = this.fb.group({
      nombreUsuario: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', Validators.required]
    });
    
    this.isCollapsed = true
    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin();
  }

  cerrarSesion() {
    this.isLogged = false
    this.tokenService.logOut();
  }

  onSubmit(): void {
    this.auth.login(this.user.value).subscribe({
      next: data => {
        this.tokenService.setToken(data.token);
        this.isLogged = true;
        location.reload();
      },
      error: err => {
        this.noti.onError(err.error.error);
      },
    });
  }

}
