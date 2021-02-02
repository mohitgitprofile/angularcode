import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string;

  constructor(public service: ServiceService,public route:Router) { }

  ngOnInit() {
  // let url = window.location.href.split('/')
this.token = window.location.href.split('=')[1];

    this.resetPasswordForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      password: new FormControl('',Validators.required),
      confirmPassword : new FormControl('',Validators.required)      
    })
  }

  
  // Reset Password Functionality
  resetPasswordFunc(){
    var apireq = {
      'newPassword': this.resetPasswordForm.value.confirmPassword,
      'oldPassword': this.resetPasswordForm.value.oldPassword
    }
    // http://182.72.203.244:3062/account/change-password
    this.service.showSpinner();
    this.service.post('account/change-password',apireq).subscribe(res=>{
     
      this.service.hideSpinner();
      if(res['status']==200){
        this.service.toasterSucc('Password Set Successfully');
        this.route.navigate(['/login'])
      }
    }, err=>{
    
      this.service.hideSpinner();
      if(err['status']=='401'){
        this.service.toasterErr('Unauthorized Access');
      }else{
      this.service.toasterErr('Something Went Wrong');
   }
    })

    
  }

}
