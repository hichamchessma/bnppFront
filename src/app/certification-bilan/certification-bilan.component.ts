import { Component, OnInit } from '@angular/core';
import { Traduction } from '../common/Traduction';
import { CertificationService } from '../services/certification.service';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-certification-bilan',
  templateUrl: './certification-bilan.component.html',
  styleUrls: ['./certification-bilan.component.css']
})
export class CertificationBilanComponent implements OnInit {

  rafraichissement: boolean = false;
  public error: any;
  public traduction: any;
  public v3postStage1: any;
  public v3poleDeLaPersonne: any;
  public v3dropdownListDatestage1: any;
  public v3dropdownListCampagnesStage1: any;
  public selectedDate: string;
  public selectedCertif: string;
  public selectedCL = null;
  public displayBilan: boolean = false;
  public displayAchievementCL: boolean = false;
  public finishLoader: boolean = true;
  public bilan: any;
  public poleBilan: any;
  public achievement: any;
  public assets: any;
  public beneficiaire: any;
  public certificateur: any;
  public droits: any;
  public habilitations: any;
  public habilitationsApprouvees: any;
  public habilitationsApprouveesPourcentage: any;
  public habilitationsCertifiees: any;
  public habilitationsNonRevues: any;
  public habilitationsNonRevuesPourcentage: any;
  public habilitationsRejetees: any;
  public habilitationsRejeteesPourcentage: any;
  public participation: any;
public participationAndHabilitation: any;
public isCelluleCentrale: boolean;
listParticipation: any = [];
listHabilitation: any = [];
listParticipationByPole: any = [];
listHabilitationByPole: any = [];
listAchievementByCL: any = [];
listCellulesLocales: any = [];
listCL: any = [];
statistiques: any;

constructor(
  private _httpClient: HttpClient,
  private _certificationService: CertificationService) {
  this.traduction = Traduction.get();
}

ngOnInit(): void {
  this.rafraichissementBDO();
  const a = null;
  // récupérer la liste des années de la campagne de certification
  this._certificationService.getUidSSO2(a).subscribe(data => {
    this.initialisegetUidSSO(data);
  });
}

// récupérer la liste des certifications
onchangeDate() {
  this.selectedCertif = "";
  this._certificationService.campDisplayStage2(this.selectedDate).subscribe(data => {
    this.getListeCampagnes(data);
  });
}

onchangeCertification() {
  this.selectedCL = null;
  this.listCellulesLocales = [];
  this._certificationService.getListCL(this.selectedDate, this.selectedCertif).subscribe(data => {
    this.listCellulesLocales = data.listCL;
    this.isCelluleCentrale = data.celluleCentrale;
  });
}

  // récupérer les informations nécessaire pour le bilan
  generateBilan() {
    this.listAchievementByCL = [];
    this.displayBilan = true;
    this.displayAchievementCL = false;
    if(!this.selectedCL) {
      this.displayAchievementCL = true;
    }
    this._certificationService.getBilanCertif(this.selectedDate, this.selectedCertif, this.selectedCL).subscribe(data => {
      this.getBilanCertif(data);
    });

    this.finishLoader = false;
    this._certificationService.getParticipationAndHabilitationByPole(this.selectedDate, this.selectedCertif, this.selectedCL).subscribe(data => {
      this.getParticipationAndHabilitationByPoleFunction(data);
      this.finishLoader = true;
    });

    this._certificationService.getStatisticsByPole(this.selectedCertif, this.selectedCL).subscribe(data => {
      this.statistiques = data;
    });

    if(this.isCelluleCentrale){
      this._certificationService.getAchievementByCL(this.selectedDate, this.selectedCertif).subscribe(data => {
        this.getAchievementByCL(data);
      })
    }
  }

  // Liste des années de certification
  initialisegetUidSSO(data: any) {
    this.v3postStage1 = data;
    this.v3poleDeLaPersonne = this.v3postStage1.pole2;
    this.v3dropdownListDatestage1 = this.v3postStage1.liste2;
    if(this.v3poleDeLaPersonne == 'ITG_MyAccess_Administrateur central') {
      this.isCelluleCentrale = true;
    } else {
      this.isCelluleCentrale = false;
    }
  }

  // Liste des campagnes de certification
  getListeCampagnes(data: any) {
    this.v3postStage1 = data;
    this.v3dropdownListCampagnesStage1 = this.v3postStage1.liste2;
  }
  
  public rafraichissementBDO() {
    this._httpClient.get(GlobalConstants.apiURL + 'rafraichissementCertif', { headers: { Authorization: GlobalConstants.getAccessToken() } })
      .pipe(catchError(err => this.error = err.message)).subscribe((data: any) => {
        // console.log("data")
        // console.log(data.etat[0].etat)
        if(data.etat[0].etat === "vert"){
          this.rafraichissement = false
        }
        else{
          this.rafraichissement = true
        }
        this.rafraichissement = data.etat[0].etat
        // console.log(this.rafraichissement)
    })
  }
  
  // Informations générales
  getBilanCertif(data: any) {
    this.bilan = data;
    this.poleBilan = this.bilan.poleBilan;
    this.achievement = this.bilan.achievement;
    this.assets = this.bilan.assets;
    this.beneficiaire = this.bilan.beneficiaire;
    this.certificateur = this.bilan.certificateur;
    this.droits = this.bilan.droits;
    this.habilitations = this.bilan.habilitations;
    this.habilitationsCertifiees = this.bilan.habilitationsCertifiees;
    this.habilitationsApprouvees = this.bilan.habilitationsApprouvees;
    this.habilitationsApprouveesPourcentage = this.bilan.habilitationsApprouveesPourcentage;
    this.habilitationsRejetees = this.bilan.habilitationsRejetees;
    this.habilitationsRejeteesPourcentage = this.bilan.habilitationsRejeteesPourcentage;
    this.habilitationsNonRevues = this.bilan.habilitationsNonRevues;
    this.habilitationsNonRevuesPourcentage = this.bilan.habilitationsNonRevuesPourcentage;
    this.participation = this.bilan.participation;
    if (this.poleBilan == 'de tous les pôles (cellule déploiement/centrale)') {
      this.poleBilan = this.traduction.poleBilan;
    }
  }


  getParticipationAndHabilitationByPoleFunction(data: any) {
    this.listParticipation = [];
    this.listHabilitation = [];
    this.listParticipationByPole = [];
    this.listHabilitationByPole = [];
    this.participationAndHabilitation = data;
    let poleParticipation = this.participationAndHabilitation.partiePole;
    let poleHabilitation = this.participationAndHabilitation.partie2Pole;
  
    // calculer le pourcentage de participation par pôle
    for (var i = 0; i < this.participationAndHabilitation.partie1Pole.length; i++) {
      this.listParticipation[i] = {
        pole: poleParticipation[i] ? poleParticipation[i] : 'Indéfini',
        pourcentage: this.participationAndHabilitation.partie1CompteurPole[i]
      }
    }
  
    // calculer le pourcentage d’habilitation revue par pôle
    for (var i = 0; i < poleHabilitation.length; i++) {
      this.listHabilitation[i] = {
        pole: poleHabilitation[i] ? poleHabilitation[i] : 'Indéfini',
        pourcentage: ((this.participationAndHabilitation.partie2CompteurPole[i] / this.participationAndHabilitation.partie2CompteurTotal[i]) * 100).toFixed(1)
      }
    }
  
    // trier les pôles par ordre décroissant selon le pourcentage de participation
    this.listParticipationByPole = this.listParticipation.sort(function (a: any, b: any) {
      return b.pourcentage - a.pourcentage;
    });
  
    // trier les pôles par ordre décroissant selon le pourcentage d’habilitations revues
    this.listHabilitationByPole = this.listHabilitation.sort(function (a: any, b: any) {
      return b.pourcentage - a.pourcentage;
    });
  }
  
  getAchievementByCL(data: any){
    this.listAchievementByCL = data;
    // trier les pôles par ordre décroissant selon le pourcentage d’habilitations revues
    if(this.listAchievementByCL)
      this.listAchievementByCL.sort(function (a: any, b: any) {
        return b.achievement - a.achievement;
      });
    
  }

}
  
  