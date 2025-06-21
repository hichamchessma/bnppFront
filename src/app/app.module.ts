import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { KpiComponent } from './kpi/kpi.component';
import { BundlesComponent } from './bundles/bundles.component';
import { BundleComponent } from './bundle/bundle.component';
import { RequestsComponent } from './requests/requests.component';
import { KpiRequestsComponent } from './kpi-requests/kpi-requests.component';
import { SSOComponent } from './sso/sso.component';
import { SsoCallbackComponent } from './sso-callback/sso-callback.component';
import { IdentitiesComponent } from './identities/identities.component';
import { RouteReuseStrategy } from '@angular/router';
import { CacheRouteReuseStrategy } from './common/route-reuse.strategy';
import { HabilitationsComponent } from './habilitations/habilitations.component';
import { RightsExtractionComponent } from './rights-extraction/rights-extraction.component';
import { TablesComponent } from './tables/tables.component';
import { ReportsComponent } from './reports/reports.component';
import { AvancementComponent } from './avancement/avancement.component';
import { CertificationRapportComponent } from './certification-rapport/certification-rapport.component';
import { InterfaceCertificationComponent } from './interface-certification/interface-certification.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CertificationBilanComponent } from './certification-bilan/certification-bilan.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AssetsComponent } from './assets/assets.component';
import { TasksComponent } from './tasks/tasks.component';
import { RetrieveUsersComponent } from './retrieve-users/retrieve-users.component';
import { RetrieveUsersRightsComponent } from './retrieve-users-rights/retrieve-users-rights.component';
import { PerimetersComponent } from './perimeters/perimeters.component';
import { EcartMyaccessComponent } from './ecart-myaccess/ecart-myaccess.component';
import { SodComponent } from './sod/sod.component';
import { MyreportComponent } from './myreport/myreport.component';
import { CertificationHorsMyaccessComponent } from './certification-hors-myaccess/certification-hors-myaccess.component';
import { RapportComponent } from './certification-hors-myaccess/rapport/rapport.component';

@NgModule({
    declarations: [
      AppComponent,
      HomeComponent,
      KpiComponent,
      BundlesComponent,
      BundleComponent,
      RequestsComponent,
      KpiRequestsComponent,
      SSOComponent,
      SsoCallbackComponent,
      IdentitiesComponent,
      HabilitationsComponent,
      RightsExtractionComponent,
      TablesComponent,
      ReportsComponent,
      CertificationRapportComponent,
      InterfaceCertificationComponent,
      AvancementComponent,
      CertificationBilanComponent,
      AssetsComponent,
      TasksComponent,
      RetrieveUsersComponent,
      RetrieveUsersRightsComponent,
      PerimetersComponent,
      EcartMyaccessComponent,
      SodComponent,
      MyreportComponent,
      CertificationHorsMyaccessComponent,
      RapportComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      DataTablesModule,
      NgChartsModule,
      HttpClientModule,
      NgMultiSelectDropDownModule.forRoot(),
      NgCircleProgressModule.forRoot({
        radius: 100,
        outerStrokeWidth: 16,
        innerStrokeWidth: 8,
        outerStrokeColor: "#78C000",
        innerStrokeColor: "#C7E596",
        animationDuration: 300,
        titleFontSize: '40',
        subtitleColor: "#fff",
        unitsFontSize: '20',
        responsive: true
      })
    ],
    providers: [
      {
        provide: RouteReuseStrategy,
        useClass: CacheRouteReuseStrategy
      }
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }