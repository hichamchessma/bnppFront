import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { catchError } from 'rxjs'
import { GlobalConstants } from '../common/global-constants'
import { Traduction } from './../common/Traduction'

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {

  protected traduction: any
  protected error: any
  public options: any
  public option: any

  protected type: any

  constructor(private _httpClient: HttpClient) {
    this.traduction = Traduction.get()
    this.options = {}
  }

  // return api http observable on init
  httpRequestsOptions() {
    return this._httpClient.get(GlobalConstants.apiURL + 'assets/getOptions', { headers: { Authorization: GlobalConstants.getAccessToken() } })
      .pipe(catchError(err => this.error = err.message))
  }

  generate() {
    // reset valeur d'erreur
    this.error = ''

    // check si option est bien cochée
    this.option = (<HTMLInputElement>document.querySelector('input[name="requests-options"]:checked'))?.value || this.option
    if (!this.option) {
      this.error = this.traduction.select_dispo_options
    } else {
      this.type = ['assets/' + this.option]
    }
  }


  ngOnInit(): void {
    this.httpRequestsOptions().subscribe((res: any) => {
      this.options = res
    })
  }
}
