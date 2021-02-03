import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { validationMessage } from '../validationMessage';
import { forms } from '../forms';
import { Auth } from 'aws-amplify';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  forgotPassword: FormGroup;
  validationMessage: any;
  userName: any;

  constructor(
    public validation: validationMessage,
    public form: forms,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    public service: ServiceService) {
      window.scrollTo(0, 0);
    this.validationMessage = this.validation.message;
    this.forgotPassword = this.form.resetPassword;
    this.forgotPassword.reset();
   }

  ngOnInit() {
    this.getUserName();
  }

  getUserName() {
    this.activatedRoute.params.subscribe(params => {
      this.userName = params;
    });
  }

  submit (data) {
    this.spinner.show();
    if (this.forgotPassword.invalid || this.forgotPassword.value.newPassword !== this.forgotPassword.value.confirmPassword) {
      this.spinner.hide();
      return;
    }
    console.log('data ===>>', data);
    Auth.forgotPasswordSubmit(this.userName.email, this.forgotPassword.value.code, this.forgotPassword.value.newPassword)
    .then(success => {
      console.log('success ===>>>', success);
      this.service.success('Your password successfully changed');
      this.router.navigate(['/']);
      this.spinner.hide();
    })
    .catch(err => {
      console.log('err ===>>>', err);
      this.service.error(err.message);
      this.spinner.hide();
    });
  }
}
