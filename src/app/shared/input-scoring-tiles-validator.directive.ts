import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { ScoringTile } from '../model/scoring-tile';

@Directive({
  selector: '[appInputScoringTilesValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: InputScoringTilesValidatorDirective, multi: true }]
})
export class InputScoringTilesValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors {
    const scoringTiles = control.value as ScoringTile[];
    if (!scoringTiles) { return null; }
    // TODO
    return { invalidInputScoringTiles: true };
  }

}
