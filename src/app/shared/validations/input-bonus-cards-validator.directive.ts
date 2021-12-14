import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { BonusCard } from '../../model/bonus-card';

@Directive({
  selector: '[appBonusCardsValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: BonusCardsValidatorDirective, multi: true }]
})
export class BonusCardsValidatorDirective implements Validator {

  @Input()
  numPlayers: number;

  validate(control: AbstractControl): ValidationErrors {
    const bonusCards = control.value as BonusCard[];
    if (!bonusCards) { return null; }
    return this.numPlayers + 3 > bonusCards.length ? { invalidBonusCards: true } : null;
  }

}
