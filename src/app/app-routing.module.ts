import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BundlesComponent } from './bundles/bundles.component';
import { TablesComponent } from './tables/tables.component';
import { KpiComponent } from './kpi/kpi.component';
import { RequestsComponent } from './requests/requests.component';
import { KpiRequestsComponent } from './kpi-requests/kpi-requests.component';
import { IdentitiesComponent } from './identities/identities.component';
import { SSOComponent } from './sso/sso.component';
import { SsoCallbackComponent } from './sso-callback/sso-callback.component';
import { HabilitationsComponent } from './habilitations/habilitations.component';
import { RightsExtractionComponent } from './rights-extraction/rights-extraction.component';
import { ReportsComponent } from './reports/reports.component';
import { AvancementComponent } from './avancement/avancement.component';
import { TablesComponent as TablesCycleComponent } from './tables/tables.component';
import { CertificationRapportComponent } from './certification-rapport/certification-rapport.component';
import { InterfaceCertificationComponent } from './interface-certification/interface-certification.component';
import { AssetsComponent } from './assets/assets.component';
import { PerimetersComponent } from './perimeters/perimeters.component';
import { TasksComponent } from './tasks/tasks.component';
import { RetrieveUsersComponent } from './retrieve-users/retrieve-users.component';
import { RetrieveUsersRightsComponent } from './retrieve-users-rights/retrieve-users-rights.component';
import {ReturnStatement} from '@angular/compiler'

import { AuthGuard } from './common/AuthGuard';
import { GlobalConstants } from './common/global-constants';
import { CertificationBilanComponent } from './certification-bilan/certification-bilan.component';
import { EcartMyaccessComponent } from './ecart-myaccess/ecart-myaccess.component';
import { SodComponent } from './sod/sod.component';
import { MyreportComponent } from './myreport/myreport.component';
import { CertificationHorsMyaccessComponent } from './certification-hors-myaccess/certification-hors-myaccess.component';
import { RapportComponent } from './certification-hors-myaccess/rapport/rapport.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Accueil' },
  { path: 'rights', component: BundlesComponent, title: 'Catalogue des droits' },
  { path: 'rights2', component: TablesComponent, title: 'Tables' },
  { path: 'rights/:id', component: BundleComponent, title: 'Cycle de vie d’un droit' },
  { path: '**', redirectTo: '',  pathMatch: 'full' }
];

if (GlobalConstants.enableSSO) {
  routes.unshift(
    { path: 'assets', component: AssetsComponent, title: 'Assets' },
    { path: 'kpi', component: KpiComponent, title: 'KPI Droits' },
    { path: 'requests', component: RequestsComponent, title: 'Demandes d’habilitation' },
    { path: 'kpi-requests', component: KpiRequestsComponent, title: 'KPI Demandes' },
    { path: 'identities', component: IdentitiesComponent, title: 'Identités' },
    { path: 'habilitations', component: HabilitationsComponent, title: 'Habilitations' },
    { path: 'rights-extraction', component: RightsExtractionComponent, title: 'Extraction des droits' },
    { path: 'reports', component: ReportsComponent, title: 'Reports' },
    { path: 'sso', component: SSOComponent, title: 'SSO' },
    { path: 'avancement', component: AvancementComponent, title: 'Avancement' },
    { path: 'certificationBilan', component: CertificationBilanComponent, title: 'Certification' },
    { path: 'interfacecertification', component: InterfaceCertificationComponent, title: 'Certification' },
    //{ path: 'tasks', component: TasksComponent, title: 'Tasks' },
    { path: 'ssocallback', component: SsoCallbackComponent, title: 'SSO Callback' },
    { path: 'retrieveUsers', component: RetrieveUsersComponent, title: 'Utilisateurs' },
    { path: 'users/rights', component: RetrieveUsersRightsComponent, title: 'Utilisateurs avec droits' },
    { path: 'perimeters', component: PerimetersComponent, title: 'Perimeters' },
    { path: 'ecart', component: EcartMyaccessComponent, title: 'Ecart MyAccess' },
    { path: 'sod', component: SodComponent, title: 'SOD' },
    { path: 'convergence', component: MyrecertComponent, title: 'Convergence' },
    {
      path: 'certificationExt',
      children: [
        { path: '', component: CertificationHorsMyaccessComponent, title: 'Certification hors myAccess' },
        { path: 'rapport', component: RapportComponent, title: 'Rapport certification hors myAccess' }
      ]
    }
  );
}

routes.forEach((route, index) => {
  routes[index].title = "MyAccess Report - " + route.title;

  // pas de sso pour aller sur au_sso, logique, et catalogue de droit bypass
  const notNeedSSO = ['sso', 'ssocallback', 'rights', 'rights/:id'];
  if (!notNeedSSO.includes(routes[index].path || '')) {
    routes[index].canActivate = [AuthGuard];
  }
});

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
