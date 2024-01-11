import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankAccount } from '../models/BankAccount';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(
    public http: HttpClient,
  ) { }

  addBank(bank: any) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post("http://localhost:8089/nawa/PorteFeuille/add", bank, { headers });
  }

  getAll() {
    return this.http.get("http://localhost:8089/nawa/PorteFeuille/show")
  }

  deletAcount(idAcount: any) {

    return this.http.delete("http://localhost:8089/nawa/PorteFeuille/delete/" + idAcount)
  }

  getBankAccountbyid(id: any) {
    return this.http.get("http://localhost:8089/nawa/PorteFeuille/show/" + id)
  }


  AddAmount(id: any, amount: any) {
    const headers = { 'Content-Type': 'application/json' };

    return this.http.put("http://localhost:8089/nawa/PorteFeuille/verse/" + id+"/"+ amount, { headers })
  }

  Transact(idS: any,idR:any, amount: any) {
    const headers = { 'Content-Type': 'application/json' };

    return this.http.put("http://localhost:8089/nawa/PorteFeuille/verse/"+idS+"/"+idR, amount, { headers })
  }

  Convert(from:any,to:any,amount: any) {
    const headers = { 'Content-Type': 'application/json' };

    return this.http.get("http://localhost:8089/nawa/currency-converter/convert/"+from+"/"+to+"/"+ amount, { headers })
  }

  getBankAccountByUser(idUser : any) : Observable<BankAccount>{
    return this.http.get<BankAccount>(`http://localhost:8089/nawa/PorteFeuille/show/user/${idUser}`);
  }

}
