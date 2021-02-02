import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-adminprofile',
  templateUrl: './edit-adminprofile.component.html',
  styleUrls: ['./edit-adminprofile.component.css']
})
export class EditAdminprofileComponent implements OnInit {
  addSubadminForm:FormGroup
  id: any;
  editData: any;
  file: any;
  imageType: any;
  imageUrl: any;
  name: any;
  email: any;
  number: any;
  image: any;
  getUserData: any;
  constructor(
    private service: ServiceService, 
    private router: Router, 
    private spinner: NgxSpinnerService,
    public active:ActivatedRoute
  ) 
  { this.active.queryParams.subscribe((params)=>{
    this.id=params.id
    console.log("hfg",this.id);
    
  })
  }

  ngOnInit() {
    this.getUserprofile();
    this.form();
  }
  getUserprofile() {
    this.spinner.show();
    this.service.getApii('admin/getProfile',1).subscribe((success)=>{
      console.log("fr", success);
      if(success.response_code==200){
        this.spinner.hide()
        // this.service.success(success.response_message)
        this.getUserData=success.result;
        this.addSubadminForm.patchValue({
          name: this.getUserData.name,
          email: this.getUserData.email,
          number: this.getUserData.mobileNumber,
          imageUrl: this.getUserData.profilePic
        })
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




  form() {
    this.addSubadminForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(20)]),
      // email            : new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i), Validators.maxLength(256)]),
      // password: new FormControl('', [Validators.required, Validators.pattern(/^(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{7,30}$/), Validators.minLength(8), Validators.maxLength(15)]),
      // confirmPassword: new FormControl('', [Validators.required]),
      // balance: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(15)]),
      // city: new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.maxLength(15)]),
      // state: new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.maxLength(15)]),
      // kyc: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i),Validators.maxLength(10)]),
      number: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/),Validators.minLength(8), Validators.maxLength(16)]),
      image: new FormControl(''),
    });
  }

  // getUserprofile() {
  //   this.spinner.show();
  //   this.service.getApii('admin/getProfile',1).subscribe((success)=>{
  //     console.log("fr", success);
  //     if(success.response_code==200){
  //       this.spinner.hide()
  //       // this.service.success(success.response_message)
  //       this.getUserData=success.result;
  //     }
      
  //   },(error)=>{
  //     this.service.error("something went wrong")
  //   })





  //   // const loggedInUserId = localStorage.getItem('CognitoIdentityServiceProvider.7j5jrsiv5prvi3ep29mg72m5ri.LastAuthUser');

  //   // this.service.getParticularUserData(loggedInUserId).then((success: any) => {

  //   //   this.userinfo = success;
  //   //   console.log('  this.userinfo',  this.userinfo)
  //   // }).catch(error => {

  //   // });
  // }



  editAdmin(){
    let data={
      adminId:this.id,
      
    }
    console.log("hngfhjgfhjgdfhj",data);
    
    this.service.getApi('admin/editProfileAdmin').subscribe((success)=>{
      console.log("gh",success);
      if(success.response_code==200){
      // this.service.success(success.response_message);
      this.editData=success.result[0];
      this.name=success.result[0].name;
      this.email=success.result[0].email;
      this.number=success.result[0].mobileNumber;
      this.imageUrl=success.result[0].profilePic;
      // this.image= this.imageUrl;
      // this.router.navigate(['/view-adminprofile'])
      this.addSubadminForm.patchValue({
        name:this.name,
        email:this.email,
        number:this.number
        // image:this.image
      })
    }
    })
  }
    updateAdmin(){
      let data={
        adminId:this.id,
        email:this.addSubadminForm.value.email,
        mobileNumber:this.addSubadminForm.value.number,
        image:this.imageUrl,
        name:this.addSubadminForm.value.name
      }
      console.log("gjfghdfghdfghdf",data)
      this.service.postApii('admin/editProfileAdmin', data, 1).subscribe((success)=>{
        if(success.response_code==200){
      this.router.navigate(['/view-adminprofile'])

        }
      })
    }

  ValidateFileUpload(event) {
    this.file = event.target.files;
    if (this.file[0]) {
      this.imageType = this.file[0].type;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.file[0]);
    }
  }

}
