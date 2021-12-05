import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BuildInfo } from 'src/app/model/build-info';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  buildInfo: BuildInfo = { version: '?', buildDate: null };

  constructor(
    private httpClient: HttpClient
  ) {
  }

  ngOnInit() {
    this.httpClient.get('assets/build-info.json').subscribe((buildInfo: BuildInfo) => {
      this.buildInfo = buildInfo;
    });
  }

}
