import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankAccountComponent } from './bank-account.component';
import { AddBankComponent } from './add-bank/add-bank.component';
import { AllbankComponent } from './allbank/allbank.component';
import { MyaccountComponent } from './myaccount/myaccount.component';

const routes: Routes = [{ path : '', component:BankAccountComponent, children:[
  {path:'AddbankAccount',component:AddBankComponent},
  {path:'',redirectTo:'AllbankAccount',pathMatch:'full'},
  {path:'AllbankAccount',component:AllbankComponent},
  {
    path:"myaccount",
    component:MyaccountComponent,
  }
  
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankAccountRoutingModule { }
