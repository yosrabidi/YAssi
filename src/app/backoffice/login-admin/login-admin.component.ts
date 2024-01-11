import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenstorageService } from 'src/app/core/services/tokenstorage.service';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {

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
        console.log(this.storagetoken.getUser().roles);
        if((this.roles.includes('CONSULTANT'))||(this.roles.includes('CLIENT')))
        {
          this.router.navigate(["/front/home"]);

        }
        else
        {
          this.router.navigate(["/dashboard/home"]);

        }
        //this.reloadPage();
      },
      error: err => {
        if (err.status === 403) {
          this.router.navigate(['/front/verify-account',username])
        } else {     
          alert('Incorrect username or password');  
          this.isLoginFailed = true;
        }
       
      }
      
    });
  }

}
