import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { validationMessage } from '../validationMessage';
import { forms } from '../forms';
import { ServiceService } from '../service/service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AmplifyService } from 'aws-amplify-angular';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;
  validationMessage: any;
  disableButton: Boolean = false;
  loginEmailVerificationForm: FormGroup;

  constructor(
    private amplifyService: AmplifyService,
    private spinner: NgxSpinnerService,
    public router: Router,
    public validation: validationMessage,
    public form: forms,
    public service: ServiceService
    ) {
    this.validationMessage = this.validation.message;
    window.scrollTo(0, 0);
    this.LoginForm = this.form.LoginForm;
    this.LoginForm.reset();
    this.loginEmailVerificationForm = this.form.loginEmailVerificationForm;
    this.loginEmailVerificationForm.reset();
  }

  ngOnInit() {
  }

  login () {
    this.spinner.show();
    this.disableButton = true;
    if (this.LoginForm.invalid) {
      this.disableButton = false;
      this.spinner.hide();
      return;
    }
    this.service.signIn(this.LoginForm.value.email, this.LoginForm.value.password).subscribe( success => {
      if (success.accessToken) {
        if (success.idToken.payload['custom:type'] === 'admin') {
          this.service.success('Please answer this question first.');
          this.router.navigate(['/securityQuestion/' + this.LoginForm.value.email]);
          localStorage.setItem('login', 'true');
        } else {
          localStorage.setItem('email', this.LoginForm.value.email);
          this.service.success('Successfully logged in');
          this.router.navigate(['/header/dashboard']);
        }
        this.disableButton = false;
        this.spinner.hide();
      } else {
        this.disableButton = false;
        this.service.error(success.message);
        this.spinner.hide();
      }
    }, (err) => {
      if (err.code === 'UserNotConfirmedException') {
        $('#exampleModal').modal({backdrop: 'static', keyboard: false});
      }
      this.disableButton = false;
      this.service.error(err.message);
      this.spinner.hide();
    });
  }

  verifyEmail() {
    if (this.loginEmailVerificationForm.invalid) {
      return;
    }
    this.spinner.show();
     this.service.confirmAuthCode(this.loginEmailVerificationForm.value.verificationCode, this.LoginForm.value.email).subscribe(success => {
      if (success === 'SUCCESS') {
        this.spinner.hide();
        this.login ();
      }
      this.spinner.hide();
     }, error => {
      this.spinner.hide();
      this.service.error(error.message);
     });
  }

}
