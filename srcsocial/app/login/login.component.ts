import { Component, OnInit, ViewChild } from '@angular/core';
import Auth, { CookieStorage } from '@aws-amplify/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { JsonPipe } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginPhNumberVerificationForm: FormGroup;
  loginPhNumberVerificationForm2: FormGroup;
  disableButton: any = false;
  loginSuccess: any;
  permissionArr: any = [];
  isValidNumbers: boolean;
  myCode: string;
  type = 'password'
  isValidNumberstv = true;
  otp: any;
  userType: any;
  constructor(
    private service: ServiceService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit() {
    // this.phoneCheckCountrys();
    this.form();
  }

  // gotonextPage() {
  //   let data = {
  //     token : this.Token,
  //   }
  //   this.router.navigate(['/dashboard'], {
  //     queryParams: {
  //     value: JSON.stringify(data)
  //     }
  //     })
  // }

  form() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i)]),
    });
    this.loginPhNumberVerificationForm = new FormGroup({
      verificationCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
    });
    this.loginPhNumberVerificationForm2 = new FormGroup({
      verificationCode2: new FormControl('', [Validators.required])
    })
  }
  phoneCheckCountrys() {
    $("#loginPhoneNumber").intlTelInput({
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
    this.isValidNumbers = $('#loginPhoneNumber').intlTelInput('isValidNumber');
    const countryData = $('#loginPhoneNumber').intlTelInput('getSelectedCountryData');
    this.myCode = "+" + countryData.dialCode;
    // console.log('check vent -=-=-', this.isValidNumbers)
  }

  login() {
      let apireq = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }
      console.log("hgfhhjf",apireq);
      
      // this.spinner.show();
      this.service.postApi('admin/login', apireq).subscribe(success => {
        console.log("hgfhhjf",success);
        console.log("response====>>>>", success.result.token)
        if (success.response_code == '200') {
          this.userType = success.result.userType;
          localStorage.setItem('userType', success.result.userType);
          localStorage.setItem('token', success.result.token);
          localStorage.setItem('profile',success.result.profilePic);
          localStorage.setItem('name',success.result.name);
          localStorage.setItem('_id',success.result.userId);
          this.spinner.hide();
          this.router.navigate(['/dashboard'])
       }
        else {
          if(this.isValidNumberstv == true) {
            this.isValidNumberstv = false;
            this.service.error("Please enter valid credentials");
          this.spinner.hide();
          }
        }
      },(err)=>{
        this.service.error("Something wen't wrong");
        this.spinner.hide();
      })
  }


  onOtpChange(e) {
    console.log('event', e);
    this.otp = e;
  }
  verifEmail() {
    if (this.otp.length == 4) {
      let data = {
        mobileNumber: localStorage.getItem('number'),
        otp: this.otp
      }
      this.service.postApii('admin/verifyOtp', data, 1).subscribe(success => {
        console.log("success", success);
        if (success.response_code == 200) {
          this.service.success(success.response_message)
          $('#exampleModal').modal('hide');
          $('#exampleModal2').modal({ backdrop: 'static', keyboard: false });
          this.spinner.hide();
        }
        else {
          this.service.error(success.response_message);
          this.spinner.hide();
        }
      })

    }
    else {
      return;
    }

  }

  verifyotp() {
    if (this.loginPhNumberVerificationForm2.valid) {
      let data = {
        questionId: "5e3968538b49222566457b8f",
        answer: this.loginPhNumberVerificationForm2.value.verificationCode2,
      }

      this.service.postApii('admin/verifyAnswer', data, 1).subscribe(success => {
        this.spinner.show();
        console.log("success", success);
        if (success.response_code == 200) {
          this.service.success(success.response_message)
          console.log("success====>>>>")
          $('#exampleModal2').modal('hide');
          this.service.success('You have successfully login.');
          this.router.navigate(['/dashboard']);
          this.spinner.hide();
        }
        else 
        {
          this.service.error("Please enter correct answer.");
          this.spinner.hide();
        }
      },(err)=>{
        this.service.error("Something went wrong.");
      })

    }
    else {
      return;
    }
  }
  // login() {

  //   this.spinner.show();
  //   this.disableButton = true;
  //   if (this.loginForm.invalid || this.isValidNumbers === false) {
  //     this.disableButton = false;
  //     this.spinner.hide();
  //     return;
  //   }
  //   this.service.signIn(this.myCode+this.loginForm.value.number, this.loginForm.value.password).subscribe(success => {
  //     if (success.accessToken) {
  //       this.loginSuccess = success;

  //       this.disableButton = false;
  //       this.spinner.hide();
  //       this.getPermission(success.idToken.payload['custom:masterRoleId']);
  //       // this.getUserData(success.accessToken.payload.username);
  //     } else {
  //       this.disableButton = false;
  //     }
  //   }, (err) => {
  //     if (err.code === 'UserNotConfirmedException') {
  //       $('#exampleModal').modal({ backdrop: 'static', keyboard: false });
  //     } else {
  //       // this.service.error(err.message);    old code
  //       this.service.error('Oops ! Invalid credential.');
  //     }
  //     this.disableButton = false;
  //     this.spinner.hide();
  //   });
  // }


  getPermission(success) {
    this.spinner.show();
    // const masterId = this.filterData(success.UserAttributes, 'custom:masterRoleId');
    const apireq = {
      master_id: success
    };
    this.service.postApi('/particular-master-role', apireq).subscribe((success: any) => {
      this.spinner.hide();
      localStorage.setItem('jwtToken', this.loginSuccess.idToken.jwtToken);
      localStorage.setItem('phNumber', this.myCode + this.loginForm.value.number);
      localStorage.setItem('roleId', success);
      this.permissionArr = success.body ? (success.body.data ? (success.body.data.length ? JSON.parse(success.body.data[0].permission) : []) : []) : [];
      this.getMainPermissions();
      this.service.success('You have successfully login.');
      this.router.navigate(['/dashboard']);
    }, error => {
      this.spinner.hide();
      this.service.success('Oops ! Something went wrong please try again.');
    });
  }

  getMainPermissions() {
    let permissionForLocalStorage = [];
    const servicePermissionArr = this.service.permissionsArr;
    this.permissionArr.forEach((element, i) => {
      servicePermissionArr.forEach(serviceElement => {
        if (element === serviceElement.index) {
          permissionForLocalStorage.push(serviceElement.permissionName);
        }
      });
      if ((this.permissionArr.length - 1) === i) {
        localStorage.setItem('permission', JSON.stringify(permissionForLocalStorage));
      }
    });
  }

  filterData(value, key) {
    const data = value.filter(item => {
      return item.Name === key;
    });
    return data;
  }


  // verifyEmail() {
  //   this.spinner.show();
  //   if (this.loginPhNumberVerificationForm.invalid) {
  //     this.spinner.hide();
  //     return;
  //   }
  //   this.service.confirmAuthCode(this.loginPhNumberVerificationForm.value.verificationCode, this.myCode+this.loginForm.value.number).subscribe(success => {
  //     if (success === 'SUCCESS') {
  //       $('#exampleModal').modal('hide');
  //       this.login();
  //     }
  //     this.spinner.hide();
  //   }, error => {

  //     this.spinner.hide();
  //   });
  // }

  showPassword() {
    if (this.type == 'password') {
      this.type = 'text'
      console.log('text')
    } else {
      this.type = 'password'
      console.log('password')
    }
  }

  terms() 
  {
    this.router.navigate(['/terms-and-conditions']);
    // window.open("assets/documents/1430007_Terms_of_Service_Revised.docx");
    
  }
  privacy() 
  {
    this.router.navigate(['/privacy-policy']);
    // window.open("assets/documents/1430007_Privacy_policy_Revised.docx");
  }
}
