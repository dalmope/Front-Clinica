import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { PopoverModule } from "ngx-bootstrap/popover";

import { IndexComponent } from "./index/index.component";
import { HomeComponent } from "./home/home.component"
import { ProfilepageComponent } from "./examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./examples/landingpage/landingpage.component";
import { ComponentsModule } from "../components/components.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ConsultoriosComponent } from "./admin/consultorios/consultorios.component";
import { EspecialidadComponent } from "./admin/especialidad/especialidad.component";
import { CitaComponent } from './user/cita/cita.component';
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { RecoveryComponent } from './user/recovery-password/recovery/recovery.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentsModule,
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
  declarations: [
    IndexComponent,
    HomeComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent,
    DashboardComponent,
    ConsultoriosComponent,
    EspecialidadComponent,
    CitaComponent,
    RecoveryComponent,
  ],
  exports: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent,
    DashboardComponent,
    ConsultoriosComponent,
    CitaComponent,
    EspecialidadComponent,
    RecoveryComponent,
  ],
  providers: []
})
export class PagesModule {}
