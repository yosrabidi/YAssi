import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { BankService } from 'src/app/core/services/bank.service';
interface Country {
  name: string;
  currencyCode: string;
  flag: string;
}

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.css']
})
export class AddBankComponent implements OnInit {
  
  RiB!:Number;
  Balance!:Number;
  user: any = {
    "idUser": 5,
    "lastName": "client",
    "firstName": "client",
    "cin": 123456,
    "dateBirth": null,
    "phoneNumber": 23456784,
    "email": "client@gmail.com",
    "isEmployed": null,
    "isVerified": null,
    "role": "CLIENT",
    "account": null
  };
  constructor(private sr:BankService,  private messageService: MessageService) { }
  showResponse(event:any) {
    this.messageService.add({
        severity: 'info',
        summary: 'Succees',
        detail: 'User Responded',
        sticky: true,
    });
}

  addBank(){
    let data:any={
      rib:this.RiB,
      balance:this.Balance,
      user:this.user

    }
    this.sr.addBank(data).subscribe((res)=>{
      console.log(res);
    })
  }
  ngOnInit(): void {
  }

}
