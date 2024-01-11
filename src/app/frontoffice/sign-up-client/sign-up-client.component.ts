import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up-client',
  templateUrl: './sign-up-client.component.html',
  styleUrls: ['./sign-up-client.component.css']
})
export class SignUpClientComponent {

  constructor(private userserv:UserService,private router:Router ) { }
    form: any = {
      username: null,
      email: null,
      password: null,
      address: null,
      tel: null,
      name: null,
      prenom: null,
      birth: null,
      role: [], // Updated field to hold roles
    };
    
    user_roles: any = [
      { name: 'CONSULTANT', value: 'CONSULTANT', selected: false },
      { name: 'CLIENT', value: 'CLIENT', selected: false },
      { name: 'ADMIN', value: 'ADMIN', selected: false },

    ];
  
    onChangeCategory(event: any, role: any) {
      if (event.target.checked) {
        this.form.role.push(role.value); // Push selected role value to roles array
      } else {
        const index = this.form.role.indexOf(role.value);
        if (index !== -1) {
          this.form.role.splice(index, 1); // Remove unselected role from roles array
        }
      }
    }
  
    Register() {
      this.userserv.register(this.form).subscribe({
        next: (data) => {
          console.log(data);
          Swal.fire({
            title: 'Success!',
            text: 'Registration successful!',
            icon: 'success',
            confirmButtonText: 'Okay',
            timer: 2000 // Set the duration in milliseconds (e.g., 3000ms = 3 seconds)
          }).then(() => {
          this.router.navigate(['/front/signin']);
          });
        },
        error: (err) => {
          console.log('Error while signing up');
          Swal.fire({
            title: 'Error!',
            text: 'Registration failed. Please try again.',
            icon: 'error',
            confirmButtonText: 'Okay',
            timer: 2000 // Set the duration in milliseconds (e.g., 3000ms = 3 seconds)
          });
        }
      });
    }
    
    
}
