import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { ActionPhaseScoring, EndRoundRewardCondition, ScoringTile } from '../../model/scoring-tile';

const MAX_ROUNDS = 6;
const MAX_OCURRENCES_END_ROUND_REWARD_CONDITION = 2;

class Options {
  allowCityScoring1stRound: boolean;
}

export const isValidScoringTiles = (
  scoringTiles: ScoringTile[],
  options: Options): boolean => {

  if (!scoringTiles || scoringTiles.length < MAX_ROUNDS) {
    return false;
  }
  return isValidScoringTilesInternal(scoringTiles, [], options);
};

const isValidScoringTilesInternal = (
  availableScoringTiles: ScoringTile[],
  selectedScoringTiles: ScoringTile[],
  options: Options): boolean => {

  const round = selectedScoringTiles.length;

  if (round === 1 && !options.allowCityScoring1stRound) {
    // Non official rule: prevent town scoring in the first round
    if (selectedScoringTiles[0].actionPhaseScoring === ActionPhaseScoring.town) {
      return false;
    }
  }

  if (round === MAX_ROUNDS - 1 || round === MAX_ROUNDS) {
    // Spades cannot score in the last two rounds
    if (selectedScoringTiles[round - 1].actionPhaseScoring === ActionPhaseScoring.spade) {
      return false;
    }
  }

  if (round > MAX_OCURRENCES_END_ROUND_REWARD_CONDITION) {
    // No more than 2 rewards can be based in the same cult
    for (const endRoundRewardCondition in EndRoundRewardCondition) {
      if (selectedScoringTiles.filter(
        scoringTile => scoringTile.endRoundRewardCondition === endRoundRewardCondition
      ).length > MAX_OCURRENCES_END_ROUND_REWARD_CONDITION) {
        return false;
      }
    }
  }

  // In no more tiles to pick, everything is OK
  if (round === MAX_ROUNDS) {
    return true;
  }

  // For each available scoring tile, pick it and check if some combination is valid
  return availableScoringTiles.some((scoringTile, i) => {
    const nextAvailableScoringTiles = availableScoringTiles.slice(0, i).concat(availableScoringTiles.slice(i + 1)); // Remove element i
    const nextSelectedScoringTiles = selectedScoringTiles.concat(scoringTile);
    return isValidScoringTilesInternal(nextAvailableScoringTiles, nextSelectedScoringTiles, options);
  });
};

@Directive({
  selector: '[appScoringTilesValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ScoringTilesValidatorDirective, multi: true }]
})
export class ScoringTilesValidatorDirective implements Validator {

  @Input()
  allowCityScoring1stRound = true;

  validate(control: AbstractControl): ValidationErrors {
    const scoringTiles = control.value as ScoringTile[];
    if (!scoringTiles) { return null; }
    return isValidScoringTiles(scoringTiles, { allowCityScoring1stRound: this.allowCityScoring1stRound })
      ? null
      : { invalidScoringTiles: true };
  }

}
