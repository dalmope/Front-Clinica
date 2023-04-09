import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
})
export class SelectComponent {
  @Input() inputId = "";
  @Input() control = new FormControl();
  @Input() label = "";
  @Input() placeholder: string = 'Nombres';
  @Input() dataSelects: any = {
    "1": "Option 1",
    "2": "Option 2",
    "3": "Option 3",
  };
  @Input() iconClass: string = 'tim-icons icon-single-02';
  focus = false;
  danger = false
  success = false
  keys = []

  constructor() {
    this.keys = Object.keys(this.dataSelects)
    console.log(this.keys);
  }

  onBlur(){
    console.log(this.dataSelects);
    console.log(this.control)
  }
}
