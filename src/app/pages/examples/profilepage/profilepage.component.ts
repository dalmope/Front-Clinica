import { Component, OnInit, OnDestroy } from "@angular/core";
import { ConsultorioService } from "src/app/services/consultorio.service";

@Component({
  selector: "app-profilepage",
  templateUrl: "profilepage.component.html",
  styleUrls: ["profilepage.component.scss"]
})
export class ProfilepageComponent implements OnInit, OnDestroy {

  constructor(private consulService: ConsultorioService) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }
}
