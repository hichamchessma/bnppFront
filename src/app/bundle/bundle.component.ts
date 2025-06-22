import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { GlobalConstants } from '../common/global-constants'
import { HttpClient } from '@angular/common/http'
import { catchError } from 'rxjs/operators'
import { Traduction } from '../common/Traduction'

@Component({
  selector: 'app-bundle',
  templateUrl: './bundle.component.html',
  styleUrls: ['./bundle.component.css']
})
export class BundleComponent implements OnInit {

  protected traduction: any

  protected id: string
  public error: string
  protected finishLoading: boolean
  // les habilitations si équipe pour membre équipe
  protected habilitations: any[]
  // liste droits uniquement profil métier
  protected liste_droits: any[]
  // le cycle de vue
  protected historisation: any
  // les attributs
  protected keys: any[]

  constructor(private route: ActivatedRoute, private _httpClient: HttpClient) {
    this.traduction = Traduction.get()
    this.id = this.route.snapshot.params['id']
    this.historisation = {}
  }

  implement(res: any): void {
    if (this.error) return
    // on ne montre pas les attributs utilitaires techniques
    delete res.right['scopes']
    delete res.right['poles']
    delete res.right['id_myaccess']
    // liste droits pour profil métier
    if (res.right.type != 'business') delete res.right['liste_droits']
    // transformer les valeurs de la colonne type
    if (res.right.type == 'bnpp_equipe') {
      res.right.type = 'Equipe'
    } else if (res.right.type == 'business') {
      res.right.type = 'Profil métier'
    } else if (res.right.type == 'it') {
      res.right.type = 'Droit'
    }

    // les attributs
    this.keys = Object.keys(res.right)
    this.historisation = res.right
    // after implement histories, habilitations if equipe
    if (this.historisation.type == 'Equipe') {
      this.habilitations = res.habilitations
    } else if (this.historisation.type == 'Profil métier') {
      this.liste_droits = res.liste_droits
    }

    this.finishLoading = true
  }

  ngOnInit(): void {
    // Call API pour avoir le cycle de vie de ce droit
    this._httpClient.get(GlobalConstants.apiURL + 'rights/' + this.id, { headers: { Authorization: GlobalConstants.getAccessToken() } })
      .pipe(catchError(err => this.error = err.message))
      .subscribe((res: any) => {
        // les attributs
        this.implement(res)
      })
  }

  // Permet de savoir si une variable est de type Array ou non
  isArray(value: any): boolean {
    return Array.isArray(value)
  }
}
