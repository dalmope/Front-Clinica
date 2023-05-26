import { Component, OnInit, OnDestroy } from "@angular/core";
import noUiSlider from "nouislider";

@Component({
  selector: "app-home",
  templateUrl: "home.component.html"
})
export class HomeComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }
}
