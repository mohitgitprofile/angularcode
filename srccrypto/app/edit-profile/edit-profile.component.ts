import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  userDetail: any = {};
  editForm: FormGroup;
  editImage: any;

  constructor(
    public service : ServiceService,
  
  ) { }

  ngOnInit() {
    this.myProfile();
  }

  myProfile(){
    this.editForm = new FormGroup({
      'name' : new FormControl('',Validators.pattern(/^[a-zA-Z ]*$/i)),
      'city' : new FormControl('',Validators.pattern(/^[a-zA-Z ]*$/i)),
      'country' : new FormControl('',Validators.pattern(/^[a-zA-Z ]*$/i)),
      'email': new FormControl('',Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)),
      'phone': new FormControl('',Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)),
      'address': new FormControl('')
    })
    var url = 'account/my-account';
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
    
      this.service.hideSpinner();
      if(res['status']== 200){      
       this.userDetail = res['data'];
       this.editImage = this.userDetail.imageUrl;
      
       this.editForm.patchValue({
        'name' :this.userDetail.firstName,
        'email': this.userDetail.email ,
        'phone': this.userDetail.phoneNo ,
        'address': this.userDetail.address,
        'city': this.userDetail.city,
        'country':this.userDetail.country
       })
      }else {
        this.service.toasterErr(res['message']);
      }
    },err=>{
      if(err['status']=='401'){
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      }else{
      this.service.toasterErr('Something Went Wrong');
       }
      this.service.hideSpinner();
    })
  }
  
  // Image Functionality Start Here
uploadImg($event): void {
  var img = $event.target.files[0];
  
  this.uploadImageFunc(img);
  }
  uploadImageFunc(img) {
  var fb = new FormData();
  fb.append('file', img)
  this.service.showSpinner();
  this.service.postApi('account/upload-file', fb).subscribe(res => {
  this.service.hideSpinner();
  if (res['status'] == '200') {
  this.editImage = res['data'];  
 
  }
  }, err => {
  this.service.hideSpinner();
  if(err['status']=='401'){
    this.service.onLogout();
    this.service.toasterErr('Unauthorized Access');
  }else{
  this.service.toasterErr('Something Went Wrong');
}
  })
  }


  updateProfile(){
  
    var apiReq = {
      "address": this.editForm.value.address,
      "city": this.editForm.value.city,
      "country": this.editForm.value.country,
     
      "firstName": this.editForm.value.name,
      "phoneNo":this.editForm.value.phone,
      "gender": this.editForm.value.gender,
      "email": this.editForm.value.email,
      "imageUrl":this.editImage ? this.editImage : this.userDetail.imageUrl,
        
    }
    this.service.showSpinner();
    this.service.post('account/profile-update',apiReq).subscribe(res=>{
      this.service.hideSpinner();
      if(res['status']== 200){
        this.myProfile();
       
        this.service.toasterSucc('Profile Updated Successfully');
      }else{
        this.service.toasterErr(res['message']);
      } 
    }, err=>{
      this.service.hideSpinner();
      if(err['status']=='401'){
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      }else{
      this.service.toasterErr('Something Went Wrong');
   }
    })
  }

  preventSpace(event) {
    if (event.charCode == 32 && !event.target.value) {
    event.preventDefault()
    } else {
   
    }
   
    }
}
