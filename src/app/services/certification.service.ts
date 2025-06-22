import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GlobalConstants } from "../common/global-constants";
import { Observable } from "rxjs";
import { postRequest } from '../models/postRequestModel';

@Injectable({
    providedIn: 'root'
})

export class CertificationService {

    constructor(private http: HttpClient) { }

    getUidSSO1(a: any) : Observable<any> {
      return this.http.post<postRequest>(GlobalConstants.apiURL + 'cert/certif3/requests_options3', {annee: a},
        {headers: { Authorization: GlobalConstants.getAccessToken() }});
    }
    
    getUidSSO2(a: any) : Observable<any> {
      return this.http.post<postRequest>(GlobalConstants.apiURL + 'cert/certif3/requests_options4', {annee: a},
        {headers: { Authorization: GlobalConstants.getAccessToken() }});
    }
    
    campDisplayStage1(selectionMotDate: any) : Observable<any> {
      return this.http.post<postRequest>(GlobalConstants.apiURL + 'cert/certif3/requests_options3', {annee: selectionMotDate},
        {headers: { Authorization: GlobalConstants.getAccessToken() }});
    }
    
    campDisplayStage2(selectionMotDate: any) : Observable<any> {
      return this.http.post<postRequest>(GlobalConstants.apiURL + 'cert/certif3/requests_options4', {annee: selectionMotDate},
        {headers: { Authorization: GlobalConstants.getAccessToken() }});
    }
    
    getBilanCertif(annee: any, campagne: any, cl: any) : Observable<any> {
      return this.http.post<postRequest>(GlobalConstants.apiURL + 'bilancertif', {annee: annee, campagne: campagne, cl: cl, langue: navigator.language},
        {headers: { Authorization: GlobalConstants.getAccessToken() }});
    }
    
    getParticipationAndHabilitationByPole(annee: any, campagne: any, cl: any) : Observable<any> {
      return this.http.post<postRequest>(GlobalConstants.apiURL + 'bilancertifPartie2', {annee: annee, campagne: campagne, cl: cl},
        {headers: { Authorization: GlobalConstants.getAccessToken() }});
    }
    
    getAchievementByCL(annee: any, campagne: any) : Observable<any> {
      return this.http.post<postRequest>(GlobalConstants.apiURL + 'bilancertifPartie3', {annee: annee, campagne: campagne},
        {headers: { Authorization: GlobalConstants.getAccessToken() }});
    }
    

    getListCL(annee: any, campagne: any) : Observable<any> {
        return this.http.post<postRequest>(GlobalConstants.apiURL + 'bilancertifPartie4', {annee: annee, campagne: campagne},
          {headers: { Authorization: GlobalConstants.getAccessToken() }});
      }
      
      getStatisticsByPole(campagne: any, cl: any) : Observable<any> {
        return this.http.post<any>(GlobalConstants.apiURL + 'statisticsCertification', {campagne: campagne, cl: cl},
          {headers: { Authorization: GlobalConstants.getAccessToken() }});
      }

    }