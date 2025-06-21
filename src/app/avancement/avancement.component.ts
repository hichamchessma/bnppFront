import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { GlobalConstants } from '../common/global-constants'
import { HttpClient } from '@angular/common/http'
import { catchError } from 'rxjs/operators'
import { Traduction } from '../common/Traduction'

@Component({
  selector: 'app-avancement',
  templateUrl: './avancement.component.html',
  styleUrls: ['./avancement.component.css']
})
export class AvancementComponent implements OnInit {

  protected traduction: any

  public cellule_centrale : boolean = false;

  public resp : any []
  protected error: any
  public selectedDate: string;
  public selectedCertif: string;

  public selectedPole = ["a"];
  public selectedPole2 = ["a"];

  public droits_ma_cellule : any []
  public pole : any []
  public pole_de_code : any []
  public node : any []
  public date : any []
  public certification : any []
  public exist : any []
  protected type: any
  public cellule_locale : any []
  public uo_list_max : any[]
  public dictionnaire : any []
  public total : any []
  public a_traite : any []
  public certifie: any []
  public dropdownSettingsDate: any;
  public v3dropdownListDateStage1 : any;
  public show_table : any []
  public selectedItems: any []
  public pole_sel : any []
  
  public uo_selected_by_user : any[]
  
  public selectedpole_de_code : any []
  public finishLoader: boolean = true;
  public currDiv = 'A'
  
  public show_ret_resultst : any []
  
  public uo_selection : any[]
  
  dropdownList = [];
  dropdownSettings = {};
  dropdownSettings2 = {};
  dropdownSettings3 = {};
  
  constructor(private route: ActivatedRoute, private _httpClient: HttpClient) {
    this.traduction = Traduction.get()
  }
  
  ngOnInit(): void {
  
    if( this.currDiv == 'A' ) {
  
      this._httpClient.get(GlobalConstants.apiURL +'date' ,{ headers: { Authorization: GlobalConstants.getAccessToken() } })
      .pipe(catchError(err => this.error = err.message)).subscribe((data : any) => {
        this.initialiserDates(data);
      })
    }
  
    if(this.currDiv == 'C') {
  
      this._httpClient.get(GlobalConstants.apiURL +'date2' ,{ headers: { Authorization: GlobalConstants.getAccessToken() } })
      .pipe(catchError(err => this.error = err.message)).subscribe((data : any) => {
        this.cellule_centrale = data.cellule_centrale
        this.date = data.date_annee
      })
    }
}
  
    onCheckboxChange() {
      if( this.currDiv == 'A' ) {
        this._httpClient.get(GlobalConstants.apiURL +'certification_avancement/' +this.selectedDate,{ headers: { Authorization: GlobalConstants.getAccessToken() } })
        .pipe(catchError(err => this.error = err.message)).subscribe((data : any) => {
          this.certification = data
        })
      }
  
      if( this.currDiv == 'C' ) {
        this._httpClient.get(GlobalConstants.apiURL +'certification_avancement2/' +this.selectedDate,{ headers: { Authorization: GlobalConstants.getAccessToken() } })
        .pipe(catchError(err => this.error = err.message)).subscribe((data : any) => {
          this.certification = data
        })
      }
    }
  
    // remettre pour case 1
    onCheckboxChange0(){
      // this.finishLoader = true;
       this.node = []
        interface postRequest {
       selectedCertif: any ;
        }
       this._httpClient.post<postRequest>(GlobalConstants.apiURL +'case1' , {selectedCertif : this.selectedCertif} , { headers: { Authorization: GlobalConstants.getAccessToken() } })
       .pipe(catchError(err => this.error = err.message)).subscribe((data : any) => {
         this.node = data
         this.finishLoader = false;
       })
     }
     
     show_arbo(){
     
       interface postRequest {
         ret: any [];
         uo_selected : any [];
       }
     
       this._httpClient.post<postRequest>(GlobalConstants.apiURL +'show_arbo' , {ret : this.show_ret_resultst,uo_selected: this.uo_selected_by_user },
         { headers: { Authorization: GlobalConstants.getAccessToken() } })
       .pipe(catchError(err => this.error = err.message)).subscribe((data : any) => {
     
         this.node = data
         this.finishLoader = false;
     
       })
     }
     
     onCheckboxChange1(){
       this.pole_de_code = []
       this.pole_sel = []
     
       interface postRequest {
         selectedCertif: any;
       }
     
       this._httpClient.post<postRequest>(GlobalConstants.apiURL +'pole' , {selectedCertif : this.selectedCertif} ,
         { headers: { Authorization: GlobalConstants.getAccessToken() } })
         .pipe(catchError(err => this.error = err.message)).subscribe((data : any) => {
            this.node = data
            this.finishLoader = false;
          })
        }
      
   
     
        onCheckboxChange3(){
            this.selectedPole = []
          
            interface postRequest {
              selectedCertif: any;
            }
          
            this._httpClient.post<postRequest>(GlobalConstants.apiURL +'case2_cellule_centrale' , {selectedCertif : this.selectedCertif} ,
              { headers: { Authorization: GlobalConstants.getAccessToken() } })
              .pipe(catchError(err => this.error = err.message)).subscribe((data : any) => {
                 this.initialisePoleCC(data);
               })
             }

             onCheckboxChange2(){
                this.finishLoader = true;
                this.node = []
              
                interface postRequest {
                    selectedPole: any [];
                  selectedCertif: any;
                  droits_ma_cellule : any [],
                  selectedPole2 : any ;
                }
              
                this._httpClient.post<postRequest>(GlobalConstants.apiURL +'case2' , {selectedPole : this.selectedPole ,selectedCertif : this.selectedCertif, droits_ma_cellule : this.droits_ma_cellule,selectedPole2 : this.selectedPole2 } ,
                  { headers: { Authorization: GlobalConstants.getAccessToken() } })
                  .pipe(catchError(err => this.error = err.message)).subscribe((data : any) => {
                     this.node = data
                     this.finishLoader = false;
                   })
                 }

                 showDiv(divVal: string ) {
                    this.currDiv = divVal;
                  }
                
                  public click = [1];
                  public counter = ''
                
                  clicked(click:any) {
                    var decision = 0
                    for(var i = 0;i<this.click.length;i++)
                
                    if(this.click[i] == click){
                      decision = 1
                      this.click.splice(i,this.click.length-i)
                    }
                
                    if(decision == 0){
                      this.click.push(click)
                    }
                  }

                  public click2 = [1];
                public counter2 = ''

clicked2(click2:any) {
  var decision = 0
  for(var i = 0;i<this.click2.length;i++)

  if(this.click2[i] == click2){
    decision = 1
    this.click2.splice(i,this.click2.length-i)
  }

  if(decision == 0){
    this.click2.push(click2)
  }
}

check_clicked(click : any){
  var decision = 0
  for(var i = 0;i<this.click.length;i++)
  if(this.click[i] == click)
  decision = 1

  if(decision == 1){
    this.counter = this.counter + 'a'
    // this.decision = 0
    return true}
  else
  return false
}


check_clicked2(click2 : any){
    var decision = 0
    for(var i = 0;i<this.click2.length;i++)
    if(this.click2[i] == click2)
    decision = 1
  
    if(decision == 1){
      this.counter2 = this.counter2 + 'a'
      // this.decision = 0
      return true}
    else
    return false
  }
  
  initialiserDates(data: any) {
    this.cellule_centrale = data.cellule_centrale
    this.date = data.date_annee
    this.cellule_locale = data.pole
  }
  
  initialisePoles(data: any){
    this.droits_ma_cellule = data.droits_ma_cellule
    this.pole = data.pole_ma_cellule
  
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'pole_du_beneficiaire',
      textField: 'pole_du_beneficiaire',
      selectAllText : this.traduction.select ,
      unSelectAllText: this.traduction.unselect,
  
      allowSearchFilter: true
    };
  }
  
  initialisePoleCC(data: any){
    this.pole_de_code = data
    this.dropdownSettings2 = {
        singleSelection: false,
        idField: 'cellule_gestionnaire_du_droit',
        textField: 'cellule_gestionnaire_du_droit',
        selectAllText : this.traduction.select ,
        unSelectAllText: this.traduction.unselect,
        allowSearchFilter: true
      };
    }
}      
  