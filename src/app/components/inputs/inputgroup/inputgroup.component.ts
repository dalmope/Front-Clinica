import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-group',
  templateUrl: './inputgroup.component.html',
})
export class InputGroupComponent{
  @Input() inputId = "";
  @Input() control = new FormControl();
  @Input() label = "";
  @Input() placeholder: string = 'Nombres';
  @Input() inputType: string = 'text';
  @Input() iconClass: string = 'tim-icons icon-single-02';
  focus = false;
  danger = false
  success = false

  constructor() {
    console.log(this.control);
  }

  onFocus() {
    this.focus = true;
  }

  onBlur() {
    console.log(this.control);
    this.danger = this.control.invalid;
    this.success = this.control.valid;
    this.focus = false;
  }

}
