import { Component, OnInit } from '@angular/core';
import { BankService } from 'src/app/core/services/bank.service';


@Component({
  selector: 'app-allbank',
  templateUrl: './allbank.component.html',
  styleUrls: ['./allbank.component.css']
})
export class AllbankComponent implements OnInit {
data:any=[];
  constructor(
    private sr:BankService
  ) { }

  getdata(){
    this.sr.getAll().subscribe((res)=>{
      this.data=res;
      console.log(res);
    })
  }

  deleteAc(id:any){
    this.sr.deletAcount(id).subscribe((res)=>{
      
      console.log(res);
      this.getdata();
    })
  }

  ngOnInit(): void {
    this.getdata();
  }

}
