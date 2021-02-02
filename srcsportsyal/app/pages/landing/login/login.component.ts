import { Component, OnInit, FormGroup, FormBuilder, Validators, MainService, Router } from '../../../index';
declare var $: any;
declare var TCO: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userData: any = { otp: '', userId: '' };
  loginRes: any= {};
  constructor(private fb: FormBuilder, private service: MainService, private router: Router) {
    window.scrollTo(0, 0)
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      // Validators.pattern(/^[A-Z0-9_]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,3})+$/i)
      'email': [ '', Validators.compose([Validators.required]) ],
      'password': [ '', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z\d$@$!%*#?&^\S]*$/)]) ],
      'rememberMe': [ false, Validators.required ]
    })
    if(this.service.getStorage('rememberDataYala') != null) {
      let formVal = JSON.parse(this.service.getStorage('rememberDataYala'))
      this.loginForm.patchValue({
        email: formVal.email,
        password: formVal.password,
        rememberMe: formVal.rememberMe
      })
    }
  }
  login() {
    // console.log(`login data => ${JSON.stringify(this.loginForm.value)}`)
    let loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      currentDate: Date.now()
    }
    this.service.postApi(`users/login`, loginData, 0).subscribe(response => {
      if(response.responseCode == 200) {
        this.loginRes = response;
        var loginDetail  = this.loginRes.result;
        console.log("Login Details====>>>>>>",this.loginRes)
        localStorage.setItem("LoginWith",loginDetail.organizerType);
        this.service.loginRes = response
        this.userData.userId = response.result._id
        this.managePhoneVer(response)
      } else if(response.responseCode == 402) {
        this.service.loginRes = response
        this.managePayment(response)
      }
    })

  }

  managePhoneVer(response) {
    console.log("jhdfsuiydsbfdf",response);
    if(!this.loginRes['result'].phoneVerified) {
      // Phone is not verified
      console.log('phone verify')
      $('#loginOtp').modal({backdrop: 'static'})
    } else {
      console.log('else phone verify', this.loginRes['result'].phoneVerified)
      this.managePayment(response)
    }
  }

  managePayment(response) {
    if(!this.loginRes['result'].paymentStatus && this.loginRes['result'].role[0] != 'PLAYER') {
      console.log('managePayment')
      // this.router.navigate(['/organizer/dataTeams'])
      // Phone is verified but payment is not done
      this.storeRememberMe();
      if (response.responseCode === 200) {
        this.service.toastrSucc("Phone is verified but payment is not done");
      } else {
        this.service.toastrErr("Phone is verified but payment is not done");
      }
      // this.router.navigate(['/landing/choosePlan'])
    } else {
      console.log('i m here');
      
      // Phone is verified and payment is also done
      this.service.setStorage('userDetailYala', JSON.stringify({token: this.loginRes.token, role: this.loginRes['result'].role[0], userType: this.loginRes['result'].organizerType, _id:this.loginRes['result'].employeerId?this.loginRes['result'].employeerId:this.loginRes['result']._id , employeeRole:this.loginRes['result'].employeeRole,employeeId:this.loginRes['result'].employeerId}))
      localStorage.setItem('subscriptionAccess',JSON.stringify(this.loginRes['result'].subscriptionAccess));
      if(this.loginRes['result'].role[0] == 'PLAYER') {
        this.storeRememberMe()
        this.router.navigate(['/player/home'])
        this.service.toastrSucc('Login Successfully')
      } else if(this.loginRes['result'].role[0] == 'ORGANIZER') {
        this.storeRememberMe()

        if(this.loginRes['result'].organizerType.includes('COMPETITION') ) {
          console.log('competition');
          this.router.navigate(['/organizer/dataTeams'])
        } else if(this.loginRes['result'].organizerType.includes('MEMBERSHIP')) {
          this.router.navigate(['/organizer/dataPlayers'])
        }
        else if(this.loginRes['result'].organizerType.includes('VENUE')) {
          this.router.navigate(['/organizer/dataPlayers'])
        }
        this.service.toastrSucc('Login Successfully')
          // if(this.loginRes['result'].organizerType[0] == 'COMPETITION') {
          //   this.router.navigate(['/organizer/dataTeams'])
          // } else if(this.loginRes['result'].organizerType[0] == 'MEMBERSHIP') {
          //   this.router.navigate(['/organizer/dataTeams'])
          // }
      }
    }
  }
  storeRememberMe() {
    if(this.loginForm.value.rememberMe) {
      this.service.setStorage('rememberDataYala', JSON.stringify(this.loginForm.value))
    } else {
      if(this.service.getStorage('rememberDataYala') != null)
        this.service.removeStorage('rememberDataYala')
    }

  }

  otpVerify() {
    let otpData = {
      _id: this.userData.userId,
      otp: this.userData.otp
    }
    this.service.postApi(`users/verifyOtp`, otpData, 0).subscribe(response => {
      // console.log('otp res => '+ JSON.stringify(response))
      if(response.responseCode == 200) {
        // this.service.toastrSucc(response.responseMessage)
        this.loginRes = response
        this.service.loginRes = response
        $('#loginOtp').modal('hide')
        this.managePayment(response)
        // if(this.currRole == `player`) {
        //   this.router.navigate(['/player/home'])
        // } else if(this.currRole == `organization`) {
        //   this.router.navigate(['/organizer/dataTeams'])
        // } else if(this.currRole == `venue`) {
        //   // this.router.navigate(['/player/home'])
        // }
      }
    })
  }

  resendOtp() {
    this.service.getApi(`users/resendOtp?_id=${this.userData.userId}`, 0 ).subscribe(response => {
      if(response.responseCode == 200) {
        this.userData.otp = ''
      }
    })
  }
  get getEmail() {
    return this.loginForm.controls['email']
  }
  get getPassword() {
    return this.loginForm.controls['password']
  }


}
