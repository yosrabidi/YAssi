import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenstorageService } from 'src/app/core/services/tokenstorage.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {
 isLogin: boolean =false ; 
 username:String="";
  constructor(private storageserv:TokenstorageService,private router:Router
  ){

  }
  ngOnInit(): void {
    this.isLogin = !!this.storageserv.getToken();

   if( this.isLogin){
    const user = this.storageserv.getUser();
  

    this.username = user.username;
    this.isLogin=true;

   }
  }


   logout(): void {
    this.storageserv.signOut();
    this.isLogin=false;

      this.router.navigate(['/front/signin']);
    

  }
}
