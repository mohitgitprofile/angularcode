import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { AmplifyService } from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-adminprofile',
  templateUrl: './view-adminprofile.component.html',
  styleUrls: ['./view-adminprofile.component.css']
})
export class ViewAdminprofileComponent implements OnInit {

  userinfo: any = {};
  changeForm: FormGroup;
  check: boolean;
  numRegxForPattern: any = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i);
  getUserData: any;

  constructor(
    private service: ServiceService,
    public amplifyService: AmplifyService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.getUserprofile();

  }
  ngOnInit() {
    this.checkInputs();
    // this.editprofile()
    
  }
  getUserprofile() {
    this.spinner.show();
    this.service.getApii('admin/getProfile',1).subscribe((success)=>{
      console.log("fr", success);
      if(success.response_code==200){
        this.spinner.hide()
        // this.service.success(success.response_message)
        this.getUserData=success.result;
      }
      
    },(error)=>{
      this.service.error("something went wrong")
    })





    // const loggedInUserId = localStorage.getItem('CognitoIdentityServiceProvider.7j5jrsiv5prvi3ep29mg72m5ri.LastAuthUser');

    // this.service.getParticularUserData(loggedInUserId).then((success: any) => {

    //   this.userinfo = success;
    //   console.log('  this.userinfo',  this.userinfo)
    // }).catch(error => {

    // });
  }

  checkInputs() {
    this.changeForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=^.{8,16}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])(?!.*\s).*$/)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, passwordMatchValidator);
    /** Function for password match and mismatch */
    function passwordMatchValidator(g: FormGroup) {
      let pass = g.get('newPassword').value;
      let confPass = g.get('confirmPassword').value;
      if (pass != confPass) {
        g.get('confirmPassword').setErrors({ mismatch: true });
      } else {
        g.get('confirmPassword').setErrors(null)
        return null
      }
    }
  }


  /** to get the value of field  */
  get password(): any {
    return this.changeForm.get('password');
  }
  get newPassword(): any {
    return this.changeForm.get('newPassword');
  }
  get confirmPassword(): any {
    return this.changeForm.get('confirmPassword');
  }

  changePass() {
    if(this.changeForm.invalid){
      if(this.changeForm.value.password =='' || this.changeForm.value.newPassword =='' || this.changeForm.value.confirmPassword =='' ){
        this.service.error('Please enter all fields.');
      }else if(this.changeForm.value.newPassword != this.changeForm.value.confirmPassword){
        this.service.error('Password mismatch.');
      }
      
      return;
    }
    // this.service.changepassword(this.userinfo.phone_number, this.changeForm.value.password, this.changeForm.value.newPassword)
    //
    // this.spinner.show();
    let data={
     password:this.changeForm.value.password,
     newPassword:this.changeForm.value.newPassword
    }
    this.service.postApii('admin/changePassword',data,1).subscribe((success)=>{
      if(this.changeForm.value.password===this.changeForm.value.newPassword){
        this.service.error("old password and new password can not be same")
        return false;
      }
      if(success.response_code==200){
        // this.service.success(success.response_message)
        this.router.navigate(['/login'])
      }
      else{
        // this.service.error(success.response_message)
      }
    })
    // Auth.currentAuthenticatedUser()
    //   .then(user => {
    //     this.spinner.hide();
    //     return Auth.changePassword(user, this.changeForm.value.password, this.changeForm.value.newPassword);
    //   })
    //   .then(data => {
    //     this.router.navigate([''])
    //     this.service.success('Your password have been  changed successfully.');
    //     this.spinner.hide();
    //   }).catch(err => {
    //     // this.service.error(err.message);
    //     this.spinner.hide();
    //   });

  }

  editprofile(id) {
    this.router.navigate(['/edit-profile'],{queryParams:{id:id}})
    // const userType = this.filterData(this.userinfo.UserAttributes, 'custom:userType');
    // console.log('userType',userType)
    // const user = userType.length ? userType[0].Value : '';
    // console.log('usr',user)
    // if (user === 'user') {
    //   this.router.navigate(['/edit-user/' + localStorage.getItem('CognitoIdentityServiceProvider.7j5jrsiv5prvi3ep29mg72m5ri.LastAuthUser')]);
    // } else {
    //   this.router.navigate(['/edit-subadmin/' + localStorage.getItem('CognitoIdentityServiceProvider.7j5jrsiv5prvi3ep29mg72m5ri.LastAuthUser')]);
    // }
  }

  filterData(attributes, args) {
    return attributes.filter(item1 => {
      return item1.Name === args;
    });
  }

}
