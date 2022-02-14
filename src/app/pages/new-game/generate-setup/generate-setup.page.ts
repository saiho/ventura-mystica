import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { BonusCard } from 'src/app/model/bonus-card';
import { ExtraFinalScoringTile } from 'src/app/model/extra-final-scoring-tile';
import { Faction } from 'src/app/model/faction';
import { GameBoard } from 'src/app/model/game-board';
import { FactionSelectMode } from 'src/app/model/game-setup-options';
import { ScoringTile } from 'src/app/model/scoring-tile';
import { TOTAL_ROUNDS } from 'src/app/shared/constants';
import { isValidCombinationScoringTiles } from 'src/app/shared/validations/scoring-tiles-validator.directive';
import { GameSetupService } from '../../../shared/services/game-setup.service';

@Component({
  selector: 'app-generate-setup',
  templateUrl: './generate-setup.page.html',
  styleUrls: ['./generate-setup.page.scss']
})
export class GenerateSetupPage implements OnInit {

  // Generated game setup
  pickedFactionsBid: Faction[];
  pickedFactionsTwoAlternatives: Faction[][];
  pickedBonusCards: BonusCard[];
  pickedScoringTiles: ScoringTile[];
  pickedExtraFinalScoringTile: ExtraFinalScoringTile;
  pickedGameBoard: GameBoard;
  playerOrder: number[];

  constructor(
    public setup: GameSetupService
  ) {
  }

  ngOnInit() {
    this.generateSetup();
  }

  private generateSetup() {
    // Group factions by terrain (color)
    // Pick randomly as many terrains as players
    const groupedByTerrain = _.sampleSize(_.groupBy(this.setup.factions, 'terrain'), this.setup.numPlayers);
    if (this.setup.factionSelectMode === FactionSelectMode.bid) {
      // Pick randomly one faction of each terrain
      this.pickedFactionsBid = groupedByTerrain.map(l => _.sample(l));
    } else {
      // Pick randomly two factions of each terrain
      this.pickedFactionsTwoAlternatives = groupedByTerrain.map(l => _.sampleSize(l, 2));
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
      !isValidCombinationScoringTiles(this.pickedScoringTiles, { allowTownScoring1stRound: this.setup.allowTownScoring1stRound })
      && maxIter >= 0);

    // Pick extra final scoring tile randomly
    this.pickedExtraFinalScoringTile = _.sample(this.setup.extraFinalScoringTiles);

    // Pick game board randomly
    this.pickedGameBoard = _.sample(this.setup.gameBoards);

    this.playerOrder = _.shuffle(_.take([1, 2, 3, 4, 5], this.setup.numPlayers));
  }

}
