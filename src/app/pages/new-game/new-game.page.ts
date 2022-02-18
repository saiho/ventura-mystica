import { Component, OnInit } from '@angular/core';
import { BASIC_PROFILE, PREDEFINED_PROFILES, Profile } from 'src/app/model/profile';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss']
})
export class NewGamePage implements OnInit {

  readonly allProfiles = PREDEFINED_PROFILES;

  // Selected profile
  profile: Profile = BASIC_PROFILE;

  constructor() {
  }

  ngOnInit() {
  }

}
