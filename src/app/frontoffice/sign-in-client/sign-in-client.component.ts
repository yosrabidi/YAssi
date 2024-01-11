import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenstorageService } from 'src/app/core/services/tokenstorage.service';
import { UserService } from 'src/app/core/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in-client',
  templateUrl: './sign-in-client.component.html',
  styleUrls: ['./sign-in-client.component.css']
})
export class SignInClientComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  accessToken: any;

  currentUser: any;
  isLogin?: boolean;

  constructor(private userserv:UserService, private storagetoken:TokenstorageService,private router: Router ) { }


  ngOnInit(): void {
    if (this.storagetoken.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.storagetoken.getUser().roles;
    }
  }

  login(){
    const { username, password } = this.form;

    this.userserv.login(username, password).subscribe({
      next: data => {
        this.storagetoken.saveToken(data.accessToken);
        this.storagetoken.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storagetoken.getUser().roles;
        console.log(this.roles);
        if(this.roles.includes('ADMIN'))
        {
          this.router.navigate(["/dashboard/home"]);
        }
        else
        {
          this.router.navigate(["/front/home"]);
        }
        //this.reloadPage();
      },
      error: err => {
        console.log('eee',err)
        if ( err.error === 'Account is Blocked') {
          Swal.fire({
           title: 'Error!',
           text: 'Account is Blocked!',
           icon: 'error',
           confirmButtonText: 'Okay',
           timer: 2000 // Set the duration in milliseconds (e.g., 3000ms = 3 seconds)
          });
       }
        else if (err.status === 403) {
          this.router.navigate(['/front/verify-account',username])
        } 
        else {     
          alert('Incorrect username or password');  
          this.isLoginFailed = true;
        }
       
      }
      
    });
  }

  
}
