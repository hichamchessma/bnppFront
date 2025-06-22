import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Traduction } from '../common/Traduction';
import { catchError } from 'rxjs';
import { CertificationService } from '../services/certification.service';

@Component({
  selector: 'app-certification-rapport',
  templateUrl: './certification-rapport.component.html',
  styleUrls: ['./certification-rapport.component.css']
})
export class CertificationRapportComponent implements OnInit {

  public options: any
  public option: any
  public error: any
  public type: any

  public traduction: any

  rafraichissement: boolean = false;
  toutLeContenu: boolean = false;
  contenuVisible1ePartie: boolean = false;
  contenuVisible2ePartie: boolean = false;
  contenuVisible: boolean = false;
  contenuVisible2: boolean = false;
  contenuVisible3: boolean = true;
  contenuVisible5: boolean = false;
  contenuVisible4: boolean = false;
  contenutoujoursINVisible: boolean = false;
  contenuVisibleTableauSansPointRight: boolean = false;
  contenuVisibleTableauAvecPointRight: boolean = true;
  public v3poleDeLaPersonne: any;
  public v3poleDeLaPersonne2: any;
  public selectionMotCampagnes: any = [];
  public selectionMotCampagnesNull: any = [];
  public selectionMotDate: any = [];
  public selectionMotDateEgalA1: boolean = false;
  public selectionMotDateEgalA1FirstTime: boolean = false;
  authCertif: boolean = false;
  public getJsonValue3: any;
  public v3dropdownListCampagnesStage1: any;
  public v3dropdownListCampagnesStage2: any;
  public dropdownListDate: any;
  public v3dropdownListDateStage1: any;
  public dropdownSettings: any;
  public dropdownSettingsCampagnes: any;
  public v3dropdownSettingsCampagnesStage: any;
  public dropdownSettingsDate: any;
  private fb: FormBuilder;
  form!: FormGroup;
  public selectedTeam: any = [];
  public selectedCampagnes: any = [];
  public v3postStage1: any;
  public uidsso: any;
  public messageHabilitation : string = '';
  public finishLoader: boolean = true;

  constructor(private _httpClient: HttpClient,
              public _router: Router,
              public _location: Location,
              private certificationService: CertificationService) {
    this.traduction = Traduction.get()
    this.options = {}
  }

  ngOnInit(): void {
    // this.v3getUIDS0502();
    //this.v3getUIDS0503();
    this.rafraichissementBDD();
    this.httpRequestOptions().subscribe((res: any) => {
      this.options = res
    })

    this.contenuVisible1ePartie = false;
    this.contenuVisible2ePartie = false;
    this.authCertif=true ; 
    this.v3dropdownSettingsCampagnesStage = {
      singleSelection: false,
      idField: 'nom_de_la_campagne_de_certification',
      textField: 'nom_de_la_campagne_de_certification',




      selectAllText: 'Tout sélectionner',
      unSelectAllText: 'Tout désélectionner',
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: "Aucun filtre disponible",
      itemsShowLimit: 6
    }
  
    this.dropdownSettingsDate = {
      singleSelection: false,
      idField: 'substr',
      textField: 'substr',
      selectAllText: 'Tout sélectionner',
      unSelectAllText: 'Tout désélectionner',
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: "Aucun filtre disponible",
      selectionLimit: 1,
    }
  }
  
  onSelectPoleCampagnes(event: any) {
    this.selectionMotCampagnes.push.apply(this.selectionMotCampagnes, [event]);
    if (this.selectionMotCampagnes.length == 0) {
      this.selectionMotCampagnesNull = true;
    } else {
      this.selectionMotCampagnesNull = false;
    }
  }
  
  onSelectPoleDate(event: any) {
    this.selectionMotDate.push.apply(this.selectionMotDate, [event]);
    if (this.selectionMotDate.length === 1) {
      this.selectionMotDateEgalA1 = true;
      this.selectionMotDateEgalA1FirstTime = false;
    } else {
      this.selectionMotDateEgalA1 = false;
      this.selectionMotDateEgalA1FirstTime = true;
    }
  }
  
  httpRequestOptions() {
    return this._httpClient.get(GlobalConstants.apiURL + 'requests_options', {
      headers: { Authorization: GlobalConstants.getAccessToken() }
    }).pipe(catchError(err => this.error = err.message))
  }
  




  onDeSelectPoleCampagnes(event: any) {
    for (var i = 0; i < this.selectionMotCampagnes.length; i++) {
      if (event.nom_de_la_campagne_de_certification === this.selectionMotCampagnes[i].nom_de_la_campagne_de_certification) {
        this.selectionMotCampagnes.splice(i, i + 1);
      }
    }
    if (this.selectionMotCampagnes.length === 0) {
      this.selectionMotCampagnesNull = true;
    } else {
      this.selectionMotCampagnesNull = false;
    }
  }
  
  onDeSelectPoleDate(event: any) {
    for (var i = 0; i < this.selectionMotDate.length; i++) {
      if (event.substr === this.selectionMotDate[i].substr) {
        this.selectionMotDate.splice(i, i + 1);
      }
    }
    if (this.selectionMotDate.length === 1) {
      this.selectionMotDateEgalA1 = true;
      this.selectionMotDateEgalA1FirstTime = false;
    } else {
      this.selectionMotDateEgalA1 = false;
      this.selectionMotDateEgalA1FirstTime = true;
    }
  }
  
  onSelectAllPoleAdminITG(event: any) {
    for (var k = 0; k < event.length; k++) {
      this.selectionMotDate.push.apply(this.selectionMotDate, [event[k]]);
    }
    if (this.selectionMotDate.length === 1) {
      this.selectionMotDateEgalA1 = true;
      this.selectionMotDateEgalA1FirstTime = false;
    } else {
      this.selectionMotDateEgalA1 = false;
      this.selectionMotDateEgalA1FirstTime = true;
    }
  }
onSelectAllPoleCampagnes(event: any){
  for (var k = 0; k < event.length; k++) {
    this.selectionMotCampagnes.push.apply(this.selectionMotCampagnes, [event[k]]);
  }
  if (this.selectionMotCampagnes.length == 0) {
    this.selectionMotCampagnesNull = true;
  } else {
    this.selectionMotCampagnesNull = false;
  }
}

onDeselectAllPoleCampagnes(event: any) {
  this.selectionMotCampagnes.splice(0);
  if (this.selectionMotCampagnes.length === 0) {
    this.selectionMotCampagnesNull = true;
  } else {
    this.selectionMotCampagnesNull = false;
  }
}

onDeselectAllPoleAdminITG(event: any) {
  this.selectionMotDate.splice(0);
  if (this.selectionMotDate.length === 1) {
    this.selectionMotDateEgalA1 = true;
    this.selectionMotDateEgalA1FirstTime = false;
  } else {
    this.selectionMotDateEgalA1 = false;
    this.selectionMotDateEgalA1FirstTime = true;
  }
}

reloadPage() {
  window.location.reload();
}

//dropdownListDroits
public v3fetchStage1() {
  if (this.type) {
    this.type = false;
  }
    // reset valeur d'erreur
    this.error = "";

    //check si option est bien cochée





    const option = this.v3poleDeLaPersonne
    if (!option) {
      this.error = this.traduction.select_dispo_options
    } else {
      this.type = 'v3certificationStage1/' + option;
    }
  
    this.contenuVisibleTableauSansPointRight = false;
    this.contenuVisibleTableauAvecPointRight = false;
  }
  
  public v3fetchStage2() {
    if (this.type) {
      this.type = false
    }
    // reset valeur d’erreur
    this.error = ""
  
    // check si option est bien cochée
    const option = this.v3poleDeLaPersonne
    // const option = 1
    if (!option) {
      this.error = this.traduction.select_dispo_options
    } else {
      this.type = 'v3certificationStage2/' + option;
    }
  
    this.contenuVisibleTableauSansPointRight = false;
    this.contenuVisibleTableauAvecPointRight = false;
  }
  
  public rafraichissementBDD() {
    this._httpClient.get(GlobalConstants.apiURL + 'rafraichissementCertif', { headers: { Authorization: GlobalConstants.getAccessToken() } })
    .pipe(catchError(err => this.error = err.message)).subscribe((data : any) => {
      if(data.etat[0].etat === 'vert'){
        this.rafraichissement = false
      } else{
        this.rafraichissement = true
      }
    })
  }



  public v3getUIDSSO2() {
    this.toutLeContenu = true;
    this.contenuVisible1ePartie = true;
    const a = null;
  
    this.certificationService.getUidSSO1(a).subscribe((data2) => {
      this.initialisationv3getUIDSSO2(data2);
      this.finishLoader = true;
      // this.finishLoader = false;
    })
  }
  
  public v3getUIDSSO3() {
    this.toutLeContenu = true;
    this.contenuVisible2ePartie = true;
    const a = null;
  
    this.certificationService.getUidSSO2(a).subscribe((data2) => {
      this.initialisationv3getUIDSSO3(data2);
      this.finishLoader = true;
      // this.finishLoader = false;
    })
  }
  
  public v3campDisplayStage1() {
    this.certificationService.campDisplayStage1(this.selectionMotDate).subscribe((data2) => {
      this.selectedCampagnes = [];
      this.selectionMotCampagnesNull = true;
      this.initialisationv3campDisplayStage1(data2);
    })
  }
  
  public v3campDisplayStage2() {
    this.certificationService.campDisplayStage2(this.selectionMotDate).subscribe((data2) => {
      this.selectedCampagnes = [];
      this.selectionMotCampagnesNull = true;
      this.initialisationv3campDisplayStage2(data2);
    })
  }
  
  


  public initialisationv3getUIDSSO2(data2: any) {
    this.v3postStage1 = data2;
    this.authCertif = this.v3postStage1.visi;
    this.v3poleDeLaPersonne = this.v3postStage1.pole;
    this.v3dropdownListDateStage1 = this.v3postStage1.liste1;
    this.contenuVisibleTableauSansPointRight = false;
    this.contenuVisibleTableauAvecPointRight = false;
  }
  
  public initialisationv3getUIDSSO3(data2: any) {
    this.v3postStage1 = data2;
    this.authCertif = this.v3postStage1.visi2;
    this.v3poleDeLaPersonne2 = this.v3postStage1.pole2;
    this.dropdownListDate = this.v3postStage1.liste2;
    this.contenuVisibleTableauSansPointRight = false;
    this.contenuVisibleTableauAvecPointRight = false;
  }
  
  public initialisationv3campDisplayStage1(data2: any) {
    this.v3postStage1 = data2;
    this.authCertif = this.v3postStage1.visi;
    this.v3poleDeLaPersonne = this.v3postStage1.pole;
    this.v3dropdownListCampagnesStage1 = this.v3postStage1.liste1;
  }
  
  initialisationv3campDisplayStage2(data2: any) {
    this.v3postStage1 = data2;
    this.authCertif = this.v3postStage1.visi2;
    this.v3poleDeLaPersonne2 = this.v3postStage1.pole2;
    this.v3dropdownListCampagnesStage2 = this.v3postStage1.liste2;
  }
  
  protected checkSSO() {
    return GlobalConstants.enableSSO
  }
  
  protected getISSEC09() {
    return GlobalConstants.getIsSEC09()
  }

  protected getIsCelluleCentraleOrLocale() {
    return GlobalConstants.isCellule()
  }
  
  protected shouldShowRequestsPage() {
    return GlobalConstants.shouldShowRequestsPage()
  }
  
  protected shouldShowRightsExtractionPage() {
    return GlobalConstants.shouldShowRightsExtractionPage()
  }
  
  protected shouldShowhabilitationsPage() {
    return GlobalConstants.shouldShowhabilitationsPage()
  }
  
  get value() {
    return this.v3poleDeLaPersonne;
  }

}
  