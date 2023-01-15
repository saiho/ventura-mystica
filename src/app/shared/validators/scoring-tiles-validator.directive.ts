import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { ActionPhaseScoring, EndRoundRewardCondition, ScoringTile } from '../../model/scoring-tile';
import { MAX_OCCURRENCES_ACTION_PHASE_SCORING, MAX_OCCURRENCES_END_ROUND_REWARD_CONDITION, TOTAL_ROUNDS } from '../constants';

interface Options {
  preventTownScoring1stRound: boolean;
  preventTripleActionPhaseScoring: boolean;
}

// Provided to check if the scoring tiles picked randomly are valid
export const isValidCombinationScoringTiles = (scoringTiles: ScoringTile[], options: Options): boolean => {
  if (!scoringTiles || scoringTiles.length !== TOTAL_ROUNDS) {
    return false;
  }

  // Non official rule: prevent town scoring in the first round
  if (options.preventTownScoring1stRound && scoringTiles[0].actionPhaseScoring === ActionPhaseScoring.town) {
    return false;
  }

  // Spades cannot score in the last two rounds
  if (scoringTiles[TOTAL_ROUNDS - 1].actionPhaseScoring === ActionPhaseScoring.spade
    || scoringTiles[TOTAL_ROUNDS - 2].actionPhaseScoring === ActionPhaseScoring.spade) {
    return false;
  }

  // No more than 2 rewards can be based in the same cult
  for (let i = 0; i < TOTAL_ROUNDS - 1 - MAX_OCCURRENCES_END_ROUND_REWARD_CONDITION; i++) {
    const endRoundRewardCondition = scoringTiles[i].endRoundRewardCondition;
    let occurrencesEndRoundRewardCondition = 1;
    for (let j = i + 1; j < TOTAL_ROUNDS - 1; j++) {
      if (endRoundRewardCondition === scoringTiles[j].endRoundRewardCondition) {
        occurrencesEndRoundRewardCondition++;
        if (occurrencesEndRoundRewardCondition > MAX_OCCURRENCES_END_ROUND_REWARD_CONDITION) {
          return false;
        }
      }
    }
  }

  // Non official rule: no more than 2 action phase scoring of the same type
  if (options.preventTripleActionPhaseScoring) {
    for (let i = 0; i < TOTAL_ROUNDS - MAX_OCCURRENCES_ACTION_PHASE_SCORING; i++) {
      const actionPhaseScoring = scoringTiles[i].actionPhaseScoring;
      let occurrencesActionPhaseScoring = 1;
      for (let j = i + 1; j < TOTAL_ROUNDS; j++) {
        if (actionPhaseScoring === scoringTiles[j].actionPhaseScoring) {
          occurrencesActionPhaseScoring++;
          if (occurrencesActionPhaseScoring > MAX_OCCURRENCES_ACTION_PHASE_SCORING) {
            return false;
          }
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
  preventTownScoring1stRound = false;

  @Input()
  preventTripleActionPhaseScoring = false;

  validate(control: AbstractControl): ValidationErrors | null {
    const scoringTiles = control.value as ScoringTile[];
    if (!scoringTiles) { return null; }
    return this.isValidCombinationPossible(scoringTiles, {
      preventTownScoring1stRound: this.preventTownScoring1stRound,
      preventTripleActionPhaseScoring: this.preventTripleActionPhaseScoring
    })
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

    if (round === 1 && options.preventTownScoring1stRound) {
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

    if (round > MAX_OCCURRENCES_END_ROUND_REWARD_CONDITION && round < TOTAL_ROUNDS) {
      // No more than 2 rewards can be based in the same cult
      for (const endRoundRewardCondition in EndRoundRewardCondition) {
        if (selectedScoringTiles.filter(
          scoringTile => scoringTile.endRoundRewardCondition === endRoundRewardCondition
        ).length > MAX_OCCURRENCES_END_ROUND_REWARD_CONDITION) {
          return false;
        }
      }
    }

    // Non official rule: no more than 2 action phase scoring of the same type
    if (options.preventTripleActionPhaseScoring) {
      if (round > MAX_OCCURRENCES_ACTION_PHASE_SCORING) {
        for (const actionPhaseScoring in ActionPhaseScoring) {
          if (selectedScoringTiles.filter(
            scoringTile => scoringTile.actionPhaseScoring === actionPhaseScoring
          ).length > MAX_OCCURRENCES_ACTION_PHASE_SCORING) {
            return false;
          }
        }
      }
    }

    // If no more tiles to pick, everything is OK
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
