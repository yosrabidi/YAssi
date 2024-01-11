import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'front', loadChildren: () => import('./frontoffice/frontoffice.module').then(m => m.FrontofficeModule) },
  { path: 'dashboard', loadChildren: () => import('./backoffice/backoffice.module').then(m => m.BackofficeModule) },
  { path: 'portefeuille', loadChildren: () => import('./frontoffice/bank-account/bank-account.module').then(m => m.BankAccountModule) },
  { path: '**', pathMatch: 'full', redirectTo: '/front/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
