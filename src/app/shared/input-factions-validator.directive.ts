import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import * as _ from 'lodash';
import { Faction } from '../model/faction';

@Directive({
  selector: '[appInputFactionsValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: InputFactionsValidatorDirective, multi: true }]
})
export class InputFactionsValidatorDirective implements Validator {

  @Input()
  numPlayers: number;

  validate(control: AbstractControl): ValidationErrors {
    const factions = control.value as Faction[];
    if (!factions) { return null; }
    const maxNumFactions = _.uniqBy(factions, 'terrain').length;
    return this.numPlayers > maxNumFactions ? { invalidInputFactions: true } : null;
  }

}
