import { Component } from '@angular/core';
import * as _ from 'lodash';
import { Artifact, ARTIFACTS_ALL } from 'src/app/model/artifact';
import { BonusCard } from 'src/app/model/bonus-card';
import { ExtraFinalScoringTile } from 'src/app/model/extra-final-scoring-tile';
import { Faction } from 'src/app/model/faction';
import { GameBoard } from 'src/app/model/game-board';
import { ArtifactPickMode, FactionPickMode } from 'src/app/model/game-setup-options';
import { ScoringTile } from 'src/app/model/scoring-tile';
import { TOTAL_ROUNDS } from 'src/app/shared/constants';
import { isValidCombinationScoringTiles } from 'src/app/shared/validators/scoring-tiles-validator.directive';
import { GameSetupService } from '../../../shared/services/game-setup.service';

@Component({
  selector: 'app-generate-setup',
  templateUrl: './generate-setup.page.html',
  styleUrls: ['./generate-setup.page.scss']
})
export class GenerateSetupPage {

  // Generated game setup
  pickedFactionsBid: Faction[] | null;
  pickedFactionsTwoAlternatives: Faction[][] | null;
  pickedBonusCards: BonusCard[];
  pickedScoringTiles: ScoringTile[];
  pickedExtraFinalScoringTile: ExtraFinalScoringTile;
  pickedGameBoard: GameBoard;
  pickedArtifacts: Artifact[] | null;
  pickedArtifactsTwoAlternatives: Artifact[][] | null;
  playerOrder: number[];

  readonly factionPickMode = FactionPickMode;
  readonly artifactPickMode = ArtifactPickMode;

  constructor(
    public setup: GameSetupService
  ) {

    // Group factions by terrain (color)
    // Pick randomly as many terrains as players
    const groupedByTerrain = _.sampleSize(_.groupBy(this.setup.factions, 'terrain'), this.setup.numPlayers);
    if (this.setup.factionPickMode === FactionPickMode.bid) {
      // Pick randomly one faction of each terrain
      this.pickedFactionsBid = groupedByTerrain.map(l => _.sample(l)!);
      this.pickedFactionsTwoAlternatives = null;
    } else {
      // Pick randomly two factions of each terrain
      this.pickedFactionsTwoAlternatives = groupedByTerrain.map(l => _.sampleSize(l, 2));
      this.pickedFactionsBid = null;
    }

    // Pick bonus cards randomly
    this.pickedBonusCards = _.sampleSize(this.setup.bonusCards, this.setup.numPlayers + 3);

    // Pick scoring tiles randomly
    let maxIter = 100; /* Safe guard: try max 100 times to get a valid combination. The generate button should not be
                          enabled unless there is a valid combination, but still be sure to avoid infinite loops. */
    do {
      this.pickedScoringTiles = _.sampleSize(this.setup.scoringTiles, TOTAL_ROUNDS);
      maxIter--;
    } while (
      !isValidCombinationScoringTiles(this.pickedScoringTiles, {
        preventTownScoring1stRound: this.setup.preventTownScoring1stRound,
        preventTripleActionPhaseScoring: this.setup.preventTripleActionPhaseScoring
      })
      && maxIter >= 0);

    // Pick extra final scoring tile randomly
    this.pickedExtraFinalScoringTile = _.sample(this.setup.extraFinalScoringTiles)!;

    // Pick game board randomly
    this.pickedGameBoard = _.sample(this.setup.gameBoards)!;

    // Pick artifacts
    switch (this.setup.artifacts) {
      case ArtifactPickMode.asNumPlayersLessOne:
        this.pickedArtifacts = _.sampleSize(ARTIFACTS_ALL, this.setup.numPlayers - 1);
        this.pickedArtifactsTwoAlternatives = null;
        break;
      case ArtifactPickMode.asNumPlayers:
        this.pickedArtifacts = _.sampleSize(ARTIFACTS_ALL, this.setup.numPlayers);
        this.pickedArtifactsTwoAlternatives = null;
        break;
      case ArtifactPickMode.assignToFaction:
        if (this.setup.factionPickMode === FactionPickMode.bid) {
          this.pickedArtifacts = _.sampleSize(ARTIFACTS_ALL, this.pickedFactionsBid!.length);
          this.pickedArtifactsTwoAlternatives = null;
        } else {
          this.pickedArtifacts = null;
          const allPickedArtifacts: Artifact[] = _.sampleSize(ARTIFACTS_ALL, _.flatten(this.pickedFactionsTwoAlternatives).length);
          this.pickedArtifactsTwoAlternatives =
            this.pickedFactionsTwoAlternatives!.map(alternatives => allPickedArtifacts.splice(0, alternatives.length));
        }
        break;
      default:
        this.pickedArtifacts = null;
        this.pickedArtifactsTwoAlternatives = null;
    }

    this.playerOrder = _.shuffle(_.take([1, 2, 3, 4, 5], this.setup.numPlayers));
  }

}
