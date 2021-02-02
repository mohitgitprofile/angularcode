import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPassword: FormGroup;
  userData: any;
  paramData: any;
  id: any;

  constructor(
    private service: ServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.form();
    // this.activatedRoute.queryParams.subscribe((res) => {
    //   console.log(res)
    //   this.paramData = res,
    //   console.log('array', this.paramData)
      
    //   });
    
  }

  form() {
    this.resetPassword = new FormGroup({
      password         : new FormControl('', [Validators.required]),
      confirmPassword  : new FormControl('', [Validators.required])
    });
  }

  // getUserName() {
  //   this.activatedRoute.params.subscribe(params => {
  //     this.userData = params;

  //   });
  // }
  resetPas() {
    let id = localStorage.getItem('_id');
    let data = {
      newPassword : this.resetPassword.value.password,
      confirmPassword : this.resetPassword.value.confirmPassword,
    }
    this.service.postApi('admin/resetPassword/5ea69f379e834726c68242b6', data).subscribe(success => {
      if(success.response_code == 200) {
        this.spinner.hide();
        this.service.success(success.response_message);
        this.router.navigate(['/']);
        
      }
      else {
        this.service.error(success.response_message);
        this.spinner.hide();
      }
    },(err)=> {
      this.spinner.hide();
      this.service.error("Something went wrong.")
    })
  }

  // submit(data) {
  //   this.spinner.show();
  //   if (this.resetPassword.invalid || this.resetPassword.value.password !== this.resetPassword.value.confirmPassword) {
  //     this.spinner.hide();
  //     return;
  //   }

  //   Auth.forgotPasswordSubmit(this.userData.number, this.resetPassword.value.code, this.resetPassword.value.password)
  //   .then(success => {

  //     this.spinner.hide();
  //     this.service.success('Your password have been successfully changed.');
  //     this.router.navigate(['/']);
  //   })
  //   .catch(err => {
  //     this.service.error(err.message);
  //     this.spinner.hide();

  //   });
  // }

}
