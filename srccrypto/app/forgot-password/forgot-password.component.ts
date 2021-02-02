import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassword: FormGroup;

  constructor(
    private router : Router,
     public service:ServiceService
  ) { }

  ngOnInit() {
    this.forgotPassword = new FormGroup({
     
      'email': new FormControl('',Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i)),
    })
  }

  
onForgot(){  
  var email = this.forgotPassword.value.email;
   var url = "account/forget-password?email="+email+'&webUrl='+this.service.websiteURL+'reset-password';
   this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
     
      if(res['status']== 200){
        this.service.toasterSucc('Successfully sent email to your registered email id')
      }
      
      this.service.hideSpinner();
    },err=>{
    
      this.service.hideSpinner(); 
      
      if(err['status']=='401'){
        this.service.toasterErr('Unauthorized Access');
      }else{
      this.service.toasterErr('Email address is not registered');
     }
    });
  }

  onResend(){
    this.onForgot();
  }
}

