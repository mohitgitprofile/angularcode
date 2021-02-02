import { Component, OnInit, Router, MainService, FormGroup, FormBuilder, Validators } from '../../../index'
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(private router: Router, private service: MainService, private fb: FormBuilder) {
    window.scrollTo(0, 0)
  }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, , Validators.pattern(/^[A-Z0-9_-]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,3})+$/i)])],
    })
  }
  forgotPassword() {
      // ************ Forgot password Api **************************************************************************************** //
      let passData = {
        'email': this.forgotPasswordForm.value.email
      }
    return new Promise((resolve, reject) => {
      this.service.postApi('users/forgetPassword', passData, 0).subscribe(response => {
        let Response = response;
        if (Response['responseCode'] == 200) {
          this.service.toastrSucc(response.responseMessage)
          this.router.navigate(['/landing/login'])
          resolve(true)
        } else {
          this.service.toastrErr(response.responseMessage)
        }
      })
    })
  // ************ End Forgot password Api **************************************************************************************** //
  }

}
