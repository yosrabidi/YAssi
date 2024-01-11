import { Component, ViewChildren, QueryList, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-reset-pass-code',
  templateUrl: './verify-reset-pass-code.component.html',
  styleUrls: ['./verify-reset-pass-code.component.css']
})
export class VerifyResetPassCodeComponent {
  email:string ="";
  @ViewChildren('codeInputs') codeInputs: QueryList<ElementRef>;  OTPmsg:string=""; 
  code1: string = '';
  code2: string = '';
  code3: string = '';
  code4: string = '';
  code5: string = '';
  code6: string = '';
  enteredCode: string ;
  isVerified: boolean = false;

  constructor(private userserv:UserService,private route :ActivatedRoute,private router :Router){
    this.route.params.subscribe(params => {
      this.email = params['email'];
    });  }

  onCodeInput(index: number) {
   
    if (index < this.codeInputs.length - 1) {
      const nextInput = this.codeInputs.toArray()[index + 1].nativeElement;
      nextInput.focus();
    }
    this.updateEnteredCode();
   
  }

  private updateEnteredCode() {
    const enteredCodeArray = [this.code1, this.code2, this.code3, this.code4, this.code5, this.code6];
    this.enteredCode = enteredCodeArray.join('');
  }


  verifyOTP(): void {
    console.log(this.email);
    
    this.userserv.verifyResetPasswordCode(this.email).subscribe(
       data => {
        console.log("d",data);
        if (data.coderesetpassword === this.enteredCode) {
          Swal.fire({
            title: 'Success!',
            text: 'successfully verified',
            icon: 'success',
         timer:2000
          });
        
            this.router.navigate(['/front/newpass',this.email]);
      
        }else{
          Swal.fire({
            title: 'Error!',
            text: 'Invalid OTP',
            icon: 'error',
            confirmButtonText: 'OK',
          })
        }
          
          },  error => {
            console.error("Error during OTP verification:", error);
            // Handle error appropriately, e.g., show an error message to the user
          }
          )
        
      
    
      
    
    
  }

  OTPRESEND():void{
    this.codeInputs.toArray().map((i)=>{
      i.nativeElement.value='';
    })
    console.log(this.email);
    this.userserv.sendResetPasswordCode(this.email).subscribe({
      next: (data) => {
        console.log(data);
        this.OTPmsg="OTP Sent Successfully";
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
