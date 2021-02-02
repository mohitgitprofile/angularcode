import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../service.service';

declare var $:any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPassword: FormGroup;
  isValidNumbers: boolean;
  myCode: string;
  loginPhNumberVerificationForm: FormGroup;
  otp: any;
  submitted : boolean;
  id: any;


  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private service: ServiceService
  ) { }

  ngOnInit() {
    // this.phoneCheckCountrys();
    this.form();
  }

  get f() { return this.forgotPassword.controls; }

  Submit(){
    this.submitted = true;
    if(this.forgotPassword.invalid){
      return
    }
    else{
      this.router.navigate(['/'])
    }
   }
  phoneCheckCountrys() {
    $("#forgotePhone").intlTelInput({
      autoPlaceholder: false,
      autoFormat: false,
      autoHideDialCode: false,
      initialCountry: 'in',
      nationalMode: false,
      onlyCountries: [],
      // preferredCountries: ["us"],
      formatOnInit: true,
      separateDialCode: true,
      formatOnDisplay: false
    });
  }
  toCheckSpaceChars() {
    this.isValidNumbers = $('#forgotePhone').intlTelInput('isValidNumber');
    const countryData = $('#forgotePhone').intlTelInput('getSelectedCountryData');
    this.myCode = "+" + countryData.dialCode;
    // console.log('check vent -=-=-', this.isValidNumbers)
  }
  form() {
    this.forgotPassword = new FormGroup({
      number: new FormControl('',[Validators.required,Validators.maxLength(16),Validators.pattern(/^[1-9][0-9]{8,13}$/)]),
    });
    this.loginPhNumberVerificationForm = new FormGroup({
      verificationCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
    });
  }

  resetPassword() 
  {
    console.log("success1");
    let apireq = {
      mobileNumber : this.forgotPassword.value.number,
    }
    console.log("apireq",apireq);
    this.service.postApii('admin/forgotPassword', apireq,  0).subscribe(success => {
      console.log("success2",success);
      this.spinner.show();
      localStorage.setItem('number', this.forgotPassword.value.number)
      localStorage.setItem('id',success.result._id)
      if(success.response_code == 200) {
        this.service.success(success.response_message)
        $('#exampleModal').modal({ backdrop: 'static', keyboard: false });
        this.spinner.hide();
      }
      else {
        console.log("success3",success);
        this.service.error(success.response_message);
        this.spinner.hide();
      }
      
    },(err)=>{
      this.service.error("Something went wrong.");
      console.log("hgfhgf",err);
      
    })
  }

  // submit(value) {
  //   if (this.forgotPassword.invalid || this.isValidNumbers === false) {
  //     return;
  //   }
  //   this.spinner.show();

  //   Auth.forgotPassword(this.myCode + value.number)
  //   .then(data => {

  //     this.service.success('The verification code have been successfully sent to your mobile number.');
  //     this.router.navigate(['/reset-password/' + value.number]);
  //     this.spinner.hide();
  //   })
  //   .catch(err => {
  //     // this.service.error(err.message);
  //     this.service.error(' Oops ! Invalid credentials');
  //     this.spinner.hide();
  //   });
  // }
  onOtpChange(e) {
    this.otp = e;
    console.log("otp",this.otp);
    
  }
  verifOtp() {
    $('#exampleModal').modal('hide');
    if (this.otp.length == 4) {
      let data = {
        mobileNumber: localStorage.getItem('number'),
        otp: this.otp
      }
      console.log("otp",data);
      this.service.postApii('admin/otpVerify', data, 0).subscribe(success => {
        console.log("success", success);
        if (success.response_code == 200) {
          this.spinner.hide();
          this.service.success(success.response_message)
          this.id = success.result._id;
          localStorage.setItem('_id',this.id)
          console.log("sadfgsdgsdgsdfgdsfg",this.id);
          this.router.navigate(['/reset-password']);
        
        }
        else {
          this.service.error(success.response_message);
          this.spinner.hide();
        }
      },(err)=>{
        this.service.error("Something went wrong.");
        this.spinner.hide();
      })

    }
    else {
      return;
    }

  }

}
