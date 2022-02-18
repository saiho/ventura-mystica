import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { ActionPhaseScoring, EndRoundRewardCondition, ScoringTile } from '../../model/scoring-tile';
import { MAX_OCURRENCES_END_ROUND_REWARD_CONDITION, TOTAL_ROUNDS } from '../constants';

class Options {
  allowTownScoring1stRound: boolean;
}

// Provided to check if the scoring tiles picked randomly are valid
export const isValidCombinationScoringTiles = (scoringTiles: ScoringTile[], options: Options): boolean => {
  if (!scoringTiles || scoringTiles.length !== TOTAL_ROUNDS) {
    return false;
  }

  // Non official rule: prevent town scoring in the first round
  if (!options.allowTownScoring1stRound && scoringTiles[0].actionPhaseScoring === ActionPhaseScoring.town) {
    return false;
  }

  // Spades cannot score in the last two rounds
  if (scoringTiles[TOTAL_ROUNDS - 1].actionPhaseScoring === ActionPhaseScoring.spade
    || scoringTiles[TOTAL_ROUNDS - 2].actionPhaseScoring === ActionPhaseScoring.spade) {
    return false;
  }

  // No more than 2 rewards can be based in the same cult
  for (let i = 0; i < TOTAL_ROUNDS - 1 - MAX_OCURRENCES_END_ROUND_REWARD_CONDITION; i++) {
    const endRoundRewardCondition = scoringTiles[i].endRoundRewardCondition;
    let ocurrencesEndRoundRewardCondition = 1;
    for (let j = i + 1; j < TOTAL_ROUNDS - 1; j++) {
      if (endRoundRewardCondition === scoringTiles[j].endRoundRewardCondition) {
        ocurrencesEndRoundRewardCondition++;
        if (ocurrencesEndRoundRewardCondition > MAX_OCURRENCES_END_ROUND_REWARD_CONDITION) {
          return false;
        }
      }
    }
  }

  return true;
};

@Directive({
  selector: '[appScoringTilesValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ScoringTilesValidatorDirective, multi: true }]
})
export class ScoringTilesValidatorDirective implements Validator {

  @Input()
  allowTownScoring1stRound = true;

  validate(control: AbstractControl): ValidationErrors {
    const scoringTiles = control.value as ScoringTile[];
    if (!scoringTiles) { return null; }
    return this.isValidCombinationPossible(scoringTiles, { allowTownScoring1stRound: this.allowTownScoring1stRound })
      ? null
      : { invalidScoringTiles: true };
  }

  private isValidCombinationPossible(scoringTiles: ScoringTile[], options: Options): boolean {
    if (!scoringTiles || scoringTiles.length < TOTAL_ROUNDS) {
      return false;
    }
    return this.isValidCombinationPossibleRecursive(scoringTiles, [], options);
  }

  private isValidCombinationPossibleRecursive(
    availableScoringTiles: ScoringTile[],
    selectedScoringTiles: ScoringTile[],
    options: Options): boolean {

    const round = selectedScoringTiles.length;

    if (round === 1 && !options.allowTownScoring1stRound) {
      // Non official rule: prevent town scoring in the first round
      if (selectedScoringTiles[0].actionPhaseScoring === ActionPhaseScoring.town) {
        return false;
      }
    }

    if (round === TOTAL_ROUNDS - 1 || round === TOTAL_ROUNDS) {
      // Spades cannot score in the last two rounds
      if (selectedScoringTiles[round - 1].actionPhaseScoring === ActionPhaseScoring.spade) {
        return false;
      }
    }

    if (round > MAX_OCURRENCES_END_ROUND_REWARD_CONDITION && round < TOTAL_ROUNDS) {
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
    if (round === TOTAL_ROUNDS) {
      return true;
    }

    // For each available scoring tile, pick it and check if some combination is valid
    return availableScoringTiles.some((scoringTile, i) => {
      const nextAvailableScoringTiles = availableScoringTiles.slice(0, i).concat(availableScoringTiles.slice(i + 1)); // Remove element i
      const nextSelectedScoringTiles = selectedScoringTiles.concat(scoringTile);
      return this.isValidCombinationPossibleRecursive(nextAvailableScoringTiles, nextSelectedScoringTiles, options);
    });
  }

}
