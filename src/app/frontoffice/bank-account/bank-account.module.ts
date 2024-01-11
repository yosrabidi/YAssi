import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankAccountRoutingModule } from './bank-account-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyaccountComponent } from './myaccount/myaccount.component';
import { DropdownModule } from 'primeng/dropdown';

import { AllbankComponent } from './allbank/allbank.component';
import { AddBankComponent } from './add-bank/add-bank.component';
import { BankService } from 'src/app/core/services/bank.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CaptchaModule } from 'primeng/captcha';
import { BankAccountComponent } from './bank-account.component';

@NgModule({
  declarations: [
    AddBankComponent,
    AllbankComponent,
    MyaccountComponent,BankAccountComponent
  ],
  imports: [
    CommonModule,
    BankAccountRoutingModule, HttpClientModule , FormsModule,DropdownModule,CaptchaModule,ToastModule,ReactiveFormsModule
  ],
  providers: [BankService,MessageService],
})
export class BankAccountModule { }
