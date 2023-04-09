import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './modals/login/login.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from "@angular/router";
import { NavbarComponent } from './navbar/navbar.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { InputGroupComponent } from './inputs/inputgroup/inputgroup.component';
import { SelectComponent } from './inputs/select/select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterformComponent } from './registerform/registerform.component';



@NgModule({
  declarations: [
    LoginComponent,
    FooterComponent,
    NavbarComponent,
    InputGroupComponent,
    SelectComponent,
    RegisterformComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
  ],
  exports: [
    LoginComponent,
    FooterComponent,
    NavbarComponent,
    InputGroupComponent,
    SelectComponent,
    RegisterformComponent
  ]
})
export class ComponentsModule {}
