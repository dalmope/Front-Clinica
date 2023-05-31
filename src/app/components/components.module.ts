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
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BrowserModule } from '@angular/platform-browser';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { CardComponent } from './card/card.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';



@NgModule({
  declarations: [
    LoginComponent,
    FooterComponent,
    NavbarComponent,
    InputGroupComponent,
    SelectComponent,
    RegisterformComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [
    LoginComponent,
    FooterComponent,
    NavbarComponent,
    InputGroupComponent,
    SelectComponent,
    RegisterformComponent,
    CardComponent
  ]
})
export class ComponentsModule {}
