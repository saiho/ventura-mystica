import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { BonusCard } from '../model/bonus-card';

@Directive({
  selector: '[appInputBonusCardsValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: InputBonusCardsValidatorDirective, multi: true }]
})
export class InputBonusCardsValidatorDirective implements Validator {

  @Input() numPlayers: number;

  constructor() { }

  validate(control: AbstractControl): ValidationErrors {
    const bonusCards = control.value as BonusCard[];
    if (!bonusCards) { return null; }
    return this.numPlayers + 3 > bonusCards.length ? { invalidInputBonusCards: true } : null;
  }

}
