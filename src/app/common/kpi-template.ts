export abstract class KpiTemplate {

    // si msg erreur
    public error: string
  
    // load
    protected loadingEnd: boolean
  
    // les mois de l'année
    protected months: any[]
    protected monthsToShow: any[]
  
    // kpi
  
    // liste des métiers
    protected entitiesList: any[]
  
    constructor() {
      if (navigator.language.startsWith('fr')) {
        this.months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
      } else {
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      }
      this.monthsToShow = []
    }
  
    // month format
    protected monthsFormat() {
      this.kpi.rollingMonths.forEach((year_month: any) => {
        const split = year_month.split('-')
        const month = split[1]
        const year = split[0]
        this.monthsToShow.push({ id: year_month, text: this.months[month - 1] + ' ' + year })
      })
    }
  }
  