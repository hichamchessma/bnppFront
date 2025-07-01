import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CertifConstants {
  v3dropdownSettingsCampagnesStage = {
    singleSelection: false,
    idField: 'nom_de_la_campagne_de_certification',
    textField: 'nom_de_la_campagne_de_certification',
    selectAllText: 'Tout sélectionner',
    unSelectAllText: 'Tout désélectionner',
    allowSearchFilter: true,
    noDataAvailablePlaceholderText: "Aucun filtre disponible",
    itemsShowLimit: 6
  }

  dropdownSettingsDate = {
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
