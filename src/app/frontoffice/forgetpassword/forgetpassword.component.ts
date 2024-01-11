import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})

export class ForgetpasswordComponent implements OnInit {


  email: string="";
  constructor(private userservice: UserService,private router:Router
   )
     { 
      this.email = "";
    }

  
    ngOnInit(): void {
      
    }

    forgotPassword() {


      
        this.userservice.sendResetPasswordCode(this.email)
          .subscribe(
            response => {
              console.log(response); // Handle the response here (e.g., show success or error message)
              if(response===true){
                Swal.fire({
                  title: 'Success!',
                  text: 'code sent successfully to your email. Please follow the code to reset your password.',
                  icon: 'success',
                  confirmButtonText: 'OK',
                });
                this.router.navigate(['/front/verify-reset-code',this.email]);
              }else{
                Swal.fire({
                  title: 'failed!',
                  text: 'failed send code',
                  icon: 'error',
                  confirmButtonText: 'OK',
                });
              }
            
            }
          );
    }
    
    
    
    
  


}