import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenstorageService } from 'src/app/core/services/tokenstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLogin: boolean =false ; 
  username:String="";
  nomu:String=""; 
  prenom:String="";
  email:String="";
   constructor(private storageserv:TokenstorageService,private router:Router
   ){
 
   }
   ngOnInit(): void {
     this.isLogin = !!this.storageserv.getToken();
 
    if( this.isLogin){
     const user = this.storageserv.getUser();
     this.nomu=user.nom;
     this.prenom=user.prenom;
      this.email=user.email
     this.username = user.username;
     this.isLogin=true;
 
    }
   }
  
  logout(): void {
    this.storageserv.signOut();
    this.isLogin=false;

      this.router.navigate(['/dashboard/login']);
    

  }
}
