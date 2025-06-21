import { API } from '../../../api'

export class GlobalConstants {
  // enable SSO
  public static enableSSO = true
  // Variable globale pour le lien API
  public static apiUrl: string = API.apiURL
  // Show all token
  public static showAllToken: string = "637ca3b437ab08"
  // test mode
  public static testMode: boolean = false
  // si SEC09, en fonction de l'u.o, on affiche ou pas les liens KPI
  public static getIsSEC09() {
    return localStorage.getItem('isSEC09') === 'true'
  }

  // est cellule locale ou central, on affiche la page identités
  public static isCellule() {
    return localStorage.getItem('cellule_centrale') === 'true' || localStorage.getItem('cellule_locale') === 'true'
  }

  // get access_token or empty string, not null
  public static getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  public static getAccessToken() {
    return GlobalConstants.getCookie('access_token')
  }

  public static getRefreshToken() {
    return GlobalConstants.getCookie('refresh_token')
  }

  public static shouldShowRequestsPage() {
   
    return localStorage.getItem('shouldShowRightsExtractionPage') === 'true'
}

public static shouldShowhabilitationsPage() {
  return localStorage.getItem('shouldShowhabilitationsPage') === 'true'
}

public static shouldShowreportsPage() {
  return this.getIsSEC09() || localStorage.getItem('cellule_centrale') === 'true'
}

public static shouldShowAssetsPage() {
  return localStorage.getItem('shouldShowAssetsPage') === 'true'
}
  }
