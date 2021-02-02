import { Component, OnInit, ActivatedRoute, Router, FormGroup, FormBuilder, Validators, MainService } from '../../../index';
import {INgxMyDpOptions} from 'ngx-mydatepicker';

declare var $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  currRole: any = '';
  signupForm: FormGroup;
  countryList = [];
  userData: any = { otp: '', userId: '' };
  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    // disableUntil: {}
  };
  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private service: MainService) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    this.myOptions.disableSince = {
      year: new Date().getFullYear(),
      month: (new Date().getMonth() + 1),
      day: new Date().getDate()
    }
    this.signupForm = this.fb.group({
      'firstName': ['', Validators.compose([ Validators.required, Validators.minLength(2), Validators.pattern(/^[^\s][a-zA-Z]*$/) ])],
      'lastName': ['', Validators.compose([ Validators.required, Validators.minLength(2), Validators.pattern(/^[^\s][a-zA-Z\s]*$/) ])],
      'email': ['', Validators.compose([ Validators.required, Validators.pattern(/^[A-Z0-9_-]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,3})+$/i) ])],
      'mobCode': ['', Validators.required],
      'mobile': [ '', Validators.compose([Validators.required, Validators.pattern(/^[1-9][0-9]{7,15}$/)]) ],
      'dob': [null, Validators.required],
      'gender': [ '', Validators.required ],
      'country': [ '', Validators.required ],
      'password': [ '', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/^[a-zA-Z\d$@$!%*#?&^\S]*$/)]) ],
      'cnfPassword': [ '', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/^[a-zA-Z\d$@$!%*#?&^\S]*$/)]) ],
      'orgType': ['', Validators.required],
      'subscription': ['', Validators.required],
      'tandc': [false, Validators.required],
      'news': [false, Validators.required]
    })
    this.route.params.subscribe(params => {
      // console.log(params[`type`])
      this.currRole = params[`type`]
      if(this.currRole == `player`) {
        this.signupForm.removeControl(`orgType`)
        this.signupForm.removeControl(`subscription`)
      } else if(this.currRole == `venue`)
        this.signupForm.removeControl(`orgType`)
    })
    this.getCountryList();
    // this.signupForm.removeControl('firstName')
  }

  // ******************** Get Country List API *********************** //
  getCountryList() {
    this.service.getApi(`users/code`, 0).subscribe(response => {
      // console.log('response => ' + JSON.stringify(response))
      if(response.responseCode == 200) {
        this.countryList = response.result
      }
    })
  }
  // ***************** End Get Country List API ************************ //

  // **********************    Signup Api  ****************************** //
  signup() {
    // console.log('signup data => '+ JSON.stringify(this.signupForm.value))
    let signupData = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      countryCode: this.signupForm.value.mobCode,
      mobileNumber: this.signupForm.value.mobile,
      email: this.signupForm.value.email,
      dob: this.signupForm.value.dob.formatted,
      gender: this.signupForm.value.gender,
      nationality: this.signupForm.value.country,
      password: this.signupForm.value.password,
      newsAlert: this.signupForm.value.news
     }
    if(this.currRole == `player`) {
      signupData['role'] = 'PLAYER'
    } else if(this.currRole == `organization`) {
      signupData['role'] = 'ORGANIZER'
      signupData['organizerType'] = this.signupForm.value.orgType
      signupData['subscription'] = this.signupForm.value.subscription
      localStorage.setItem("LoginWith",this.signupForm.value.orgType);
    } else if(this.currRole == `venue`) {
      // signupData['role'] = 'ORGANIZER'
    }
    this.service.postApi(`users/signup`, signupData, 0).subscribe(response => {
      // console.log('signup res => ' + JSON.stringify(response))
      if(response.responseCode == 201) {
        this.userData.userId = response.result._id
        $('#signupOtp').modal({backdrop: 'static'})
      }
    })
  }

  // **********************  End   Signup Api  ******************************* //

  // ********************* OTP Verify API ************************************ //
  otpVerify() {
    let otpData = {
      _id: this.userData.userId,
      otp: this.userData.otp
    }
    this.service.postApi(`users/verifyOtp`, otpData, 0).subscribe(response => {
      // console.log('otp res => '+ JSON.stringify(response))
      if(response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage)
        $('#signupOtp').modal('hide')
        if(this.currRole == `player`) {
          this.service.setStorage('userDetailYala', JSON.stringify({token: response.token, role: response.result.role[0], userType: response.result.organizerType, _id: response.result._id}))
          this.router.navigate(['/player/home'])
        } else if(this.currRole == `organization`) {
          ({...this.service.loginRes} = response)
          this.router.navigate(['/landing/choosePlan'])
        } else if(this.currRole == `venue`) {
          // this.router.navigate(['/player/home'])
        }
      }
    })  
  }
  // ***************** End OTP Verify API ************************************* //

 // ******************** Resend OTP API *************************************** //
  resendOtp() {
    this.service.getApi(`users/resendOtp?_id=${this.userData.userId}`, 0 ).subscribe(response => {
      if(response.responseCode == 200) {
        this.userData.otp = ''
      }
    })
  }
  // ******************* End Resend OTP API *********************************** //

  get formC() {
    return this.signupForm.controls
  }
  
}
