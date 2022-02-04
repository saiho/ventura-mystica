import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appSelectedMinimumValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: SelectedMinimumDirective, multi: true }]
})
export class SelectedMinimumDirective implements Validator {

  @Input()
  minimum: number;

  validate(control: AbstractControl): ValidationErrors {
    const items = control.value as any[];
    if (!items) { return null; }
    return this.minimum > items.length ? { invalidMinimum: true } : null;
  }

}
