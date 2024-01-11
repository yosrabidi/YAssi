import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { ListeusersComponent } from './listeusers/listeusers.component';
import { AuthguardISConnectedAdminService } from '../core/services/authguardisconnectedAdmin.service';

const routes: Routes = [{ path: '', component: BackofficeComponent,children:[{path:'home',component:HomeComponentComponent,canActivate: [AuthGuardService]},

{
  path:'login',component:LoginAdminComponent,canActivate:[AuthguardISConnectedAdminService]
}

,{
  path:'users',component:ListeusersComponent,canActivate:[AuthGuardService]
}

] 

 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
