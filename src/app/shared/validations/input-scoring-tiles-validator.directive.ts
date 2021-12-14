import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { ScoringTile } from '../../model/scoring-tile';

@Directive({
  selector: '[appScoringTilesValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ScoringTilesValidatorDirective, multi: true }]
})
export class ScoringTilesValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors {
    const scoringTiles = control.value as ScoringTile[];
    if (!scoringTiles) { return null; }
    // TODO
    return { invalidScoringTiles: true };
  }

}
