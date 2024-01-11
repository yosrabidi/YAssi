import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resetnewpass',
  templateUrl: './resetnewpass.component.html',
  styleUrls: ['./resetnewpass.component.css']
})
export class ResetnewpassComponent {
 password:string=""; 
 passwordconfirm:string=""; 
 email:string =""; 

 constructor(private userserv:UserService,private route :ActivatedRoute,private router:Router){
  this.route.params.subscribe(params => {
    this.email = params['email'];
  }); 
 }
  createNewPass(){
    if(this.password===this.passwordconfirm){
      this.userserv.updatePassword(this.email,this.password).subscribe(
        data => {
          console.log(data);
          Swal.fire({
            title: 'Success!',
            text: 'successfully updated',
            icon: 'success',
            confirmButtonText:'ok'
            }).then((result) =>{
              this.router.navigate(['/front/home'])
          })
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Error!',
            text: 'error',
            icon: 'error',
            confirmButtonText:'ok'
          })
        }
      );
    }

  }
}
