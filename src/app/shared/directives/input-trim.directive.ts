import { Directive, HostListener } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';

@Directive({ selector: 'ion-input[appTrim],ion-textarea[appTrim]' })
export class InputTrimDirective {

  private readonly formControl: FormControl;

  constructor(ngControl: NgModel) {
    this.formControl = ngControl.control;
  }

  @HostListener('ionBlur')
  onBlur() {
    if (this.formControl.value) {
      this.formControl.setValue(this.formControl.value.trim());
    }
  }

}
