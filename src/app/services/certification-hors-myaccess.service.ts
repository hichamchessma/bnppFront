import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';
import { Observable } from 'rxjs';
import { postRequest } from '../models/postRequestModel';

@Injectable({
  providedIn: 'root'
})
export class CertificationHorsMyaccessService {
  private apiUrlCertification = GlobalConstants.apiURL + 'certif_ext/';

  constructor(private http: HttpClient) {}

  getPole(): Observable<any> {
    return this.http.get(this.apiUrlCertification + 'pole', { headers: { Authorization: GlobalConstants.getAccessToken() } });
  }

  getListAnneePoleBenef(role: string, pole: any): Observable<any> {
    return this.http.post<postRequest>(this.apiUrlCertification + 'listAnnee', { role: role, pole: pole }, { headers: { Authorization: GlobalConstants.getAccessToken() } });
  }

  getListCampagneCertifPoleBenef(role: string, pole: any, annee: string): Observable<any> {
    return this.http.post<postRequest>(this.apiUrlCertification + 'listCampagneCertif', { role: role, pole: pole, annee: annee }, { headers: { Authorization: GlobalConstants.getAccessToken() } });
  }

  getListRapportCertifPoleBenef(role: string, pole: any, campagnes: any, offset: number, limit: number, filter: any): Observable<any> {
    return this.http.post<postRequest>(this.apiUrlCertification + 'getListRapportCertifPoleBenef/' + offset + '/' + limit, 
      { role: role, pole: pole, list_campagne_certif: campagnes, ...filter }, 
      { headers: { Authorization: GlobalConstants.getAccessToken() } });
  }

  exportExcelListRapportCertifPoleBenef(role: string, pole: any, campagnes: any, filter: any): Observable<any> {
    return this.http.post<postRequest>(this.apiUrlCertification + 'getListRapportCertifPoleBenef/toExcel', 
      { role: role, pole: pole, list_campagne_certif: campagnes, ...filter }, 
      { headers: { Authorization: GlobalConstants.getAccessToken() } });
  }

  getPoleCL(): Observable<any> {
    return this.http.get(this.apiUrlCertification + 'poleCL', { headers: { Authorization: GlobalConstants.getAccessToken() } });
  }

  getListAnneeCertifCL(): Observable<any> {
    return this.http.post(this.apiUrlCertification + 'listAnneeCL', {}, { headers: { Authorization: GlobalConstants.getAccessToken() } });
  }

  getListCampagneCertifCL(annee: string): Observable<any> {
    return this.http.post(this.apiUrlCertification + 'listCampagneCertificL', { annee }, { headers: { Authorization: GlobalConstants.getAccessToken() } });
  }

  getListRapportCertifCL(
    campagne: string, 
    cellule: string, 
    offset: number, 
    limit: number, 
    filter: any
  ): Observable<any> {
    return this.http.post(this.apiUrlCertification + 'getListRapportCertificL/' + offset + '/' + limit, 
      { campagne, cellule, ...filter }, 
      { headers: { Authorization: GlobalConstants.getAccessToken() } });
  }

  downloadExportedFile(fileName: string) {
    return this.http.get(GlobalConstants.apiURL + `files/${fileName}`, 
      { responseType: 'blob', headers: { Authorization: GlobalConstants.getAccessToken() } });
  }
}
