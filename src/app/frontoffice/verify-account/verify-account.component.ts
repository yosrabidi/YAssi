import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent {
 username: String=''; 
 code:any="";
  constructor(private route:ActivatedRoute,private userserv:UserService,private router:Router){

  }

ngOnInit(){
 this.route.params.subscribe(params => {
    this.username = params['username'];
  });
}

Verify() {
  this.userserv.confirmUserAccount(this.code).subscribe
    (
      (data) => {
        console.log('Confirmation Response:', data);
      Swal.fire({

        title: 'Success!',
        text: 'Account Confirmed  successful!',
        icon: 'success',
        
        timer: 1000 // Set the duration in milliseconds (e.g., 3000ms = 3 seconds)

      });
      this.router.navigate(['/front/signin'])
      },
      (error) => {
        console.error('Error occurred:', error);
       Swal.fire({

        title: 'Error!',
        text: 'Confirmation account failed. Please try again.',
        icon: 'error',
        confirmButtonText: 'Try again',

       })
      }
    );
}

}
