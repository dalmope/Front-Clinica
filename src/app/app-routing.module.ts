import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { ProfilepageComponent } from "./pages/examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/examples/landingpage/landingpage.component";
import { HomeComponent } from "./pages/home/home.component";
import { IndexComponent } from "./pages/index/index.component";
import { PagesModule } from "./pages/pages.module";
import { ComponentsModule } from "./components/components.module";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ConsultoriosComponent } from "./pages/admin/consultorios/consultorios.component";
import { EspecialidadComponent } from "./pages/admin/especialidad/especialidad.component";
import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";
import { CitaComponent } from "./pages/user/cita/cita.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "index", component: IndexComponent },
  { path: "profile", component: ProfilepageComponent },
  { path: "register", component: RegisterpageComponent },
  { path: "landing", component: LandingpageComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  { path: "citas", component: CitaComponent, canActivate: [AuthGuard]},
  { path: "admin/consultorio", component: ConsultoriosComponent, canActivate: [AdminGuard] },
  { path: "admin/especialidad", component: EspecialidadComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    }),
    PagesModule,
    ComponentsModule
  ],
  exports: []
})
export class AppRoutingModule {}
