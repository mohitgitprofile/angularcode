import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { forms } from '../forms';
import { validationMessage } from '../validationMessage';
import { Auth, Storage } from 'aws-amplify';
import { ActivatedRoute,Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../service/service.service';
var AWS = require('aws-sdk');

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  validationMessage: any;
  paramData: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public form: forms,
    public validation: validationMessage,
    private spinner: NgxSpinnerService,
    public service: ServiceService,
    private router :Router

  ) { }

  ngOnInit() {
    this.changePasswordForm = this.form.changePasswordForm;
    this.changePasswordForm.reset();
    this.validationMessage = this.validation.message;
    this.getUserName();
  }

  getUserName() {
    this.activatedRoute.params.subscribe(params => {
      this.paramData = params;
      console.log(this.paramData);
    });
  }

  //   changePassword() {
  //     console.log('form value ==>>', this.changePasswordForm.value);
  //   Auth.currentAuthenticatedUser()
  // .then(user => {
  //     return Auth.changePassword(user, 'oldPassword', 'newPassword');
  // })
  // .then(data => console.log(data))
  // .catch(err => console.log(err));
  // var user = {
  // UserPoolId: 'us-east-1_lM5ZrYKiT', /* required */
  // Username: this.paramData.userName, /* required */
  // PreviousPassword: '',
  // ProposedPassword: '',
  // AccessToken: ''
  // };
  // Auth.changePassword(user, 'oldPassword', 'newPassword');

  // var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  // cognitoidentityserviceprovider.changePassword(params, (err, response) => {
  //   if (err) {
  //     // this.spinner.hide();
  //     console.log('error ===>>', err);
  //   } else {
  //     // this.getUserList();
  //     // this.spinner.hide();
  //     // $('#enableDisableDeleteModal').modal('hide');
  //     console.log('data ===>>', response);           // successful response
  //   }
  // });
  // Auth.currentAuthenticatedUser()
  // .then(user => {
  //   console.log('user==>>', user);
  //     return Auth.changePassword(user, 'oldPassword', 'newPassword');
  // })
  // .then(data => console.log(data))
  // .catch(err => console.log(err));


  //   changePassword(){
  //     console.log("password",this.changePasswordForm.value)
  //     Auth.currentAuthenticatedUser().then(user => {
  //       Auth.changePassword(user, this.changePasswordForm.value.oldPassword,this.changePasswordForm.value.newPassword).then(result => {
  //       console.log("Pankaj 555=>", result)
  //       // Toast_func("success", result)
  //       }).catch((err) =>{
  //         console.log("error--->>",err)
  //       })

  //   })
  // }
  changePassword() {
    this.spinner.show();
    Auth.currentAuthenticatedUser()
      .then(user => {
        return Auth.changePassword(user, this.changePasswordForm.value.oldPassword, this.changePasswordForm.value.newPassword);
      })
      .then(data => {

        this.spinner.hide();
        this.service.success('Password updated successfully')
          this.router.navigate([''])
      })
      .catch(err => {
        console.log("ffff",err)
        this.spinner.hide();
        this.service.error('Something went wrong');
      });
  }



}
