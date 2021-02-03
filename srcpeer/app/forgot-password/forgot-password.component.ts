import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { validationMessage } from '../validationMessage';
import { forms } from '../forms';
import { Auth } from 'aws-amplify';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
// import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

// const poolData = {
//   UserPoolId: 'us-east-1_lM5ZrYKiT', // Your user pool id here
//   ClientId: '7h1ev0k4nb2n59quve3o4jc591' // Your client id here
// };

// const userPool = new CognitoUserPool(poolData);

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  validationMessage: any;
  forgotPassword: FormGroup;
  constructor(
    public validation: validationMessage,
    public form: forms,
    public service: ServiceService,
    public router: Router,
    private spinner: NgxSpinnerService) {
      window.scrollTo(0, 0);
    }

  ngOnInit() {
    this.validationMessage = this.validation.message;
    this.forgotPassword = this.form.forgotPassword;
    this.forgotPassword.reset();
  }

  submit (value) {
    if (this.forgotPassword.invalid) {
      return;
    }
    this.spinner.show();
    console.log('data ===>>>', value);
    Auth.forgotPassword(value.email)
    .then(data => {
      console.log('succ ===>>>', data);
      this.service.success('The verification code have been successfully sent to your email id');
      this.router.navigate(['/resetPassword/' + value.email]);
      this.spinner.hide();
    })
    .catch(err => {
      this.service.error(err.message);
      this.spinner.hide();
    });
  }

}
