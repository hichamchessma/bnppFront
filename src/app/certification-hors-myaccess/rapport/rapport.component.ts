import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Traduction } from 'src/app/common/Traduction';
import { CertifConstants } from '../certif-constants';
import { CertificationHorsMyaccessService } from 'src/app/services/certification-hors-myaccess.service';
import { CertificationService } from 'src/app/services/certification.service';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {
  public options: any
  public option: any
  public error: any
  public type: any

  public traduction: any

  rafraichissement: boolean = false;
  touteLeContenu: boolean = false;
  isPoleBenef: boolean = false;
  isCelluleLoc: boolean = false;
  contenuVisible: boolean = false;
  contenuVisible2: boolean = false;
  contenuVisible3: boolean = false;
  contenuVisible5: boolean = false;

  contenuToujoursInvisible: boolean = false;
  contenuVisibleTableauSansPointRight: boolean = true;
  contenuVisibleTableauAvecPointRight: boolean = true;
  public v3poleDeLaPersonne: any;
  public v3poleDeLaPersonne2: any;
  public selectionMotCampagnes: any = [];
  public selectionMotCampagnesNull: boolean = true;  
  public selectionMotDateEgalA1FirstTime: boolean = false;
  public selectionMotDate: any = [];
  public selectionMotDateEgaleA1: boolean = false;
  public selectionMotDateEgaleA1FirstTime: boolean = false;
  authCertif: boolean = false;
  public getJsonValue3: any;
  public v3dropdownListCampagnesStage1: any;
  public v3dropdownListCampagnesStage2: any;
  public dropdownListDate: any;
  public v3dropdownListDateStage1: any;
  public v3dropdownListDateStage2: any;
  public dropdownSettings: any;
  public dropdownSettingsCampagnes: any;
  public v3dropdownSettingsCampagnesStage: any;
  public dropdownSettingsDate: any;
  private fb: FormBuilder;
  form1: FormGroup;
  public selectedTeam: any = [];
  public selectedCampagnes: any = [];
  public v3postStage1: any;
  public udsso: any;
  public messageHabilitation: string = '';
  public finishLoader: boolean = true;

  public role: string = '';
  public poleDeLaPersonne: string = '';
  public listDesCampagneCertif: string[] = [];
  public resultatRapportPoleBenef: any;
  public resultatRapportCelluleLocale: any;
  public keysOfRapportPoleBenef: string[] = [];
  public keysOfRapportCelluleLocale: string[] = [];

  public nombreTotaleResultat: number = 0;
  public offset: number = 0;
  public limit: number = 10;
  public filtre: any = {};

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
    private _location: Location,
    private certificationHorsMyAccessService: CertificationHorsMyaccessService,
    private certificationService: CertificationService,
    private constants: CertifConstants
  ) {
    this.traduction = Traduction.get();
  }

  ngOnInit(): void {
    this.rafraichissementBDD() ;
    this.isPoleBenef = false;
    this.isCelluleLoc = false;
    this.authCertif = true;
    this.v3dropdownSettingsCampagnesStage = this.constants.v3dropdownSettingsCampagnesStage;
    this.dropdownSettingsDate = this.constants.dropdownSettingsDate;
  }

  onSelectPoleCampagnes(event: any) {
    this.selectionMotCampagnes.push.apply(this.selectionMotCampagnes, [event]);
    if (this.selectionMotCampagnes.length === 0) {
      this.selectionMotCampagnesNull = true;
    } else {
      this.selectionMotCampagnesNull = false;
    }
  }

  onSelectPoleDate(event: any) {
    this.selectionMotDate.push.apply(this.selectionMotDate, [event]);
    if (this.selectionMotDate.length === 1) {
      this.selectionMotDateEgaleA1 = true;
      this.selectionMotDateEgaleA1FirstTime = false;
    } else {
      this.selectionMotDateEgaleA1 = false;
      this.selectionMotDateEgaleA1FirstTime = true;
    }
  }

  httpRequestOptions() {
    return this._httpClient.get(GlobalConstants.apiURL + 'requests_options', { headers: { Authorization: GlobalConstants.getAccessToken() } })
      .pipe(catchError((err: { message: any }) => this.error = err.message));
  }

  onDeselectPoleCampagnes(event: any) {
    for (var i = 0; i < this.selectionMotCampagnes.length; i++) {
      if (event === this.selectionMotCampagnes[i]) {
        this.selectionMotCampagnes.splice(i, i+1);
      }
    }
    if (this.selectionMotCampagnes.length === 0) {
      this.selectionMotCampagnesNull = true;
    } else {
      this.selectionMotCampagnesNull = false;
    }
  }


onDeselectPoleDate(event: any) {
  for (var i = 0; i < this.selectionMotDate.length; i++) {
    if (event.substr === this.selectionMotDate[i].substr) {
      this.selectionMotDate.splice(i, 1 + 1);
    }
  }

  if (this.selectionMotDate.length === 1) {
    this.selectionMotDateEgaleA1 = true;
    this.selectionMotDateEgaleA1FirstTime = false;
  } else {
    this.selectionMotDateEgaleA1 = false;
    this.selectionMotDateEgaleA1FirstTime = true;
  }
}

onSelectAllPoleAdminITG(event: any) {
  for (var k = 0; k < event.length; k++) {
    this.selectionMotDate.push.apply(this.selectionMotDate, [event[k]]);
  }

  if (this.selectionMotDate.length === 1) {
    this.selectionMotDateEgaleA1 = true;
    this.selectionMotDateEgaleA1FirstTime = false;
  } else {
    this.selectionMotDateEgaleA1 = false;
    this.selectionMotDateEgaleA1FirstTime = true;
  }
}

onSelectAllPoleCampagnes(event: any) {
  for (var k = 0; k < event.length; k++) {
    this.selectionMotCampagnes.push.apply(this.selectionMotCampagnes, [event]);
  }

  if (this.selectionMotCampagnes.length === 0) {
    this.selectionMotCampagnesNull = true;
  }

  this.selectionMotCampagnesNull = false;
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
    this.selectionMotDateEgaleA1 = true;
    this.selectionMotDateEgaleA1FirstTime = false;
  } else {
    this.selectionMotDateEgaleA1 = false;
    this.selectionMotDateEgaleA1FirstTime = true;
  }
}

reloadPage() {
  window.location.reload();
}

public v3fetchStage2() {
  if (this.type) {
    this.type = false;

    // reset valeur d'erreur
    this.error = '';

    // check si option est bien cochée
    const option = this.v3poleDeLaPersonne2;
    if (!option) {
      this.error = this.traduction.select_dispo_options;
    } else {
      this.type = 'v3certificationStage2/' + option;
    }

    this.contenuVisibleTableauSansPointRight = false;
    this.contenuVisibleTableauAvecPointRight = false;
  }
}



public rafraichissementBDD() {
  this._httpClient.get(GlobalConstants.apiURL + 'rafraichissementCertif', { headers: { Authorization: GlobalConstants.getAccessToken() } })
    .pipe(catchError((err: { message: any }) => this.error = err.message)).subscribe((data: any) => {
      if (data.etat[0]._etat === "vert") {
        this.rafraichissement = false;
      } else {
        this.rafraichissement = true;
      }
    })
}

public onClickPoleBenef() {
  this.touteLeContenu = true;
  this.isPoleBenef = true;
  this.certificationHorsMyAccessService.getPole().subscribe((res: any) => {
    this.initialisationListAnnee(res);
  })
}

private getListAnnee(role: string, pole: any) {
  this.certificationHorsMyAccessService.getListAnneePoleBenef(role, pole).subscribe((res: any) => {
    this.v3dropdownListDateStage1 = res.listAnnee;
    this.contenuVisibleTableauSansPointRight = false;
    this.contenuVisibleTableauAvecPointRight = false;
  })
}

public onAnneeSelection() {
  if (this.selectionMotDate) {
    this.certificationHorsMyAccessService.getListCampagneCertifPoleBenef(this.role, this.poleDeLaPersonne, this.selectionMotDate).subscribe((res: any) => {
      this.selectedCampagnes = [];
      this.selectionMotCampagnesNull = true;
      this.listDesCampagneCertif = res.listCampagneCertif;
    })
  }
}

public initialisationListAnnee(data: any) {
  this.authCertif = data.visi;
  this.poleDeLaPersonne = data.pole;



this.v3poleDeLaPersonne = data.pole; // to delete
this.role = this.getRole(data.isAdmin);
this.getListAnnee(this.role, this.v3poleDeLaPersonne)
}

public onClickCelluleCL() {
  this.touteLeContenu = true;
  this.isCelluleLoc = true;
  this.certificationHorsMyAccessService.getPoleCL().subscribe((res: any) => {
    this.initialisationListAnneeCL(res)
  })
}

private getListAnneeCL(role: string, pole: any) {
  this.certificationHorsMyAccessService.getListAnneeCertifCL().subscribe((res: any) => {
    this.v3dropdownListDateStage2 = res.listAnnee;
    this.contenuVisibleTableauSansPointRight = false;
    this.contenuVisibleTableauAvecPointRight = false;
  })
}

public onAnneeSelectionCL() {
  if (this.selectionMotDate) {
    this.certificationHorsMyAccessService.getListCampagneCertifCL(this.selectionMotDate).subscribe((res: any) => {
      this.selectedCampagnes = [];
      this.selectionMotCampagnesNull = true;
      this.listDesCampagneCertif = res.listCampagneCertif;
    })
  }
}

public initialisationListAnneeCL(data: any) {
  this.authCertif = data.visi;
  this.poleDeLaPersonne = data.pole;
  this.v3poleDeLaPersonne = data.pole; // to delete
  this.role = this.getRole(data.isAdmin);
  this.getListAnneeCL(this.role, this.v3poleDeLaPersonne)
}

public v3getUDSSO2() {
  this.touteLeContenu = true;
  this.isPoleBenef = true;
  const a = null;
  this.certificationService.getUidSSO1(a).subscribe((data2: any) => {
    this.initialisationv3getUIDSSO2(data2);
    this.finishLoader = true;
  })
  this.finishLoader = false;
  }
  
  public v3getUIDSSO3() {
    this.touteLeContenu = true;
    this.isCelluleLoc = true;
    const a = null;
  
    this.certificationService.getUidSSO2(a).subscribe(data2 => {
      this.initialisationv3getUIDSSO3(data2);
      // this.finishLoader = true;
    })
    // this.finishLoader = false;
  }
  
  public v3campDisplayStage1() {
    this.certificationService.campDisplayStage1(this.selectionMotDate).subscribe((data2: any) => {
      this.selectedCampagnes = [];
      this.selectionMotCampagnesNull = true;
      this.initialisationv3campDisplayStage1(data2);
    })
  }
  
  public v3campDisplayStage2() {
    this.certificationService.campDisplayStage2(this.selectionMotDate).subscribe((data2: any) => {
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
    this.v3dropdownListDateStage2 = this.v3postStage1.liste2;
    this.contenuVisibleTableauSansPointRight = false;
    this.contenuVisibleTableauAvecPointRight = false;
  }
  
  public initialisationv3campDisplayStage1(data2: any) {
    this.v3postStage1 = data2;
    this.authCertif = this.v3postStage1.visi;
    this.v3poleDeLaPersonne = this.v3postStage1.pole;
    this.v3dropdownListCampagnesStage1 = this.v3postStage1.liste1;
  }
  
  public genererTableauRapportPoleBenef() {
    this.certificationHorsMyAccessService.getListRapportCertifPoleBenef(this.role, this.poleDeLaPersonne, this.listDesCampagneCertif, this.offset, this.limit, this.filtre)
      .subscribe((rapports: any) => {
        this.resultatRapportPoleBenef = rapports.objects;
        this.nombreTotaleResultat = this.getCountNumber(rapports.count);
        this.contenuVisible = true;
        this.contenuVisibleTableauSansPointRight = false;
        this.contenuVisibleTableauAvecPointRight = false;
      })
  }
  
  public genererTableauRapportCelluleLocale() {
    this.certificationHorsMyAccessService.getListRapportCertifCL(this.selectionMotCampagnes[0], this.poleDeLaPersonne, this.offset, this.limit, this.filtre)
      .subscribe((rapports: any) => {
        this.resultatRapportCelluleLocale = rapports.objects;
        this.nombreTotaleResultat = this.getCountNumber(rapports.count);
        this.contenuVisible = true;
        this.contenuVisibleTableauSansPointRight = false;
        this.contenuVisibleTableauAvecPointRight = false;
      });
      }
      
      onChangeLimit(event: any) {
        this.limit += +event;
        this.genererTableauRapportPoleBenef();
      }
      
      onPageChange(event: any) {
        this.offset += +event;
        this.genererTableauRapportPoleBenef();
      }
      
      resetPagination() {
        this.limit = 10;
        this.offset = 0;
      }
      
      onClickAppliquerFiltre(event: any) {
        this.filtre = event;
        this.resetPagination();
        this.genererTableauRapportPoleBenef();
      }
      
      onClickAppliquerFiltreCL(event: any) {
        this.filtre = event;
        this.resetPagination();
        this.genererTableauRapportCelluleLocale();
      }
      
      exportDataExcel = (filtre: any): Observable<any> => {
        return this.certificationHorsMyAccessService
          .exportExcelListRapportCertifPoleBenef(this.role, this.poleDeLaPersonne, this.listDesCampagneCertif, filtre)
      }
      
      private getCountNumber(entry: any[]): number {
        return entry ? +entry[0].count : 0;
      }
      

      private getRole(isAdmin: boolean) {
        return isAdmin ? "ITG_ADMIN_CENTRAL" : "POLE_BENEF";
      }
      
      initialisationv3campDisplayStage2(data2: any) {
        this.v3postStage1 = data2;
        this.authCertif = this.v3postStage1.visi2;
        this.v3poleDeLaPersonne2 = this.v3postStage1.pole2;
        this.v3dropdownListCampagnesStage2 = this.v3postStage1.liste2;
      }
      
      protected checkSSO() {
        return GlobalConstants.enableSSO;
      }
      
      protected getISSEC09() {
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
      
      get value() {
        return this.v3poleDeLaPersonne;
      }

    }