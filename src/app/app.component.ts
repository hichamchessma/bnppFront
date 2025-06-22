import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { GlobalConstants } from './common/global-constants';
import { Traduction } from './common/Traduction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  protected traduction: any;

  constructor(private router: Router, private httpClient: HttpClient) {
    this.traduction = Traduction.get();

    // REFRESH TOKEN MANAGEMENT //
    // on attend une seconde pour l’ancien token, on peut le faire grâce à la marge
    setTimeout(() => {
      this.refreshToken(GlobalConstants.getRefreshToken());
    }, 1000);
  }

  // private function for refreshing token
  private refreshToken(refresh_token: string) {
    this.httpClient.get(GlobalConstants.apiURL + '/sso/refresh/' + refresh_token)
      .subscribe((res: any) => {
        this.setTokenAndTimeoutLoop(res.access_token, refresh_token, res.expires_in);
      });
  }

  setTokenAndTimeoutLoop(access_token: string, refresh_token: string, expires_in: number) {
    // cookies token
    document.cookie = 'access_token=' + access_token + '; max-age=' + expires_in;
    document.cookie = 'refresh_token=' + refresh_token + '; max-age=' + expires_in;

    // next refresh
    setTimeout(() => {
      this.refreshToken(refresh_token);
    }, expires_in * 0.8 * 1000); // ~20% pour la marge, x1000 pour millisecondes
  }

  ngOnInit() {
    // reload enable
    // this.router.routeReuseStrategy.shouldReuseRoute = () => { return false }
  }

  protected checkSSO() {
    return GlobalConstants.enableSSO;
  }

  protected getGivenName() {
    return localStorage.getItem('given_name');
  }

  protected getFamilyName() {
    return localStorage.getItem('family_name');
  }

  protected getIsSEC09() {
    return GlobalConstants.getIsSEC09();
  }

  protected getIsCelluleCentraleOrLocale() {
    return GlobalConstants.isCellule();
  }

  protected shouldShowRequestsPage() {
    return GlobalConstants.shouldShowRequestsPage();
  }

  protected shouldShowRightsExtractionPage() {
    return GlobalConstants.shouldShowRightsExtractionPage();
  }

  protected shouldShowHabilitationsPage() {
    return GlobalConstants.shouldShowhabilitationsPage();
  }

  protected shouldShowReportsPage() {
    return GlobalConstants.shouldShowreportsPage();
  }

  protected shouldShowAssetsPage() {
    return GlobalConstants.shouldShowAssetsPage();
  }
}
