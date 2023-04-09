import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
})
export class SelectComponent implements OnInit {
  @Input() inputId = "";
  @Input() control = new FormControl();
  @Input() label = "";
  @Input() placeholder: string = 'Nombres';
  @Input() dataSelects: any = {};
  @Input() iconClass: string = 'tim-icons icon-single-02';
  focus = false;
  danger = false
  success = false
  keys = []

  ngOnInit() {
    this.keys = Object.keys(this.dataSelects)
    this.control.setValue(this.keys[0]);
  }
}
