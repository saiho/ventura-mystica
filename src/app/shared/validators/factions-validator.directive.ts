import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { uniqBy } from 'lodash-es';
import { Faction } from '../../model/faction';

@Directive({
  selector: '[appFactionsValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: FactionsValidatorDirective, multi: true }]
})
export class FactionsValidatorDirective implements Validator {

  @Input()
  numPlayers!: number;

  validate(control: AbstractControl): ValidationErrors | null {
    const factions = control.value as Faction[];
    if (!factions) { return null; }
    const maxNumFactions = uniqBy(factions, 'terrain').length;
    return this.numPlayers > maxNumFactions ? { invalidFactions: true } : null;
  }

}
