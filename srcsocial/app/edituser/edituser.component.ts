import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  editSubadminForm: FormGroup
  paramData: any;
  userData: any;
  kycImage: any;
  dateofb: any;
  todaye: string;
  file: any;
  imageType: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: ServiceService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.form();
    this.route.params.subscribe((id) => {
      this.paramData = id.id;
      console.log("dfgdfg", this.paramData);
      this.getUserData();
    })
    this.getUserDataa();
  }

  getUserDataa() {
    this.spinner.show();
    console.log("jhgfjgjhgfhjk",this.paramData);
    this.service.postApii('admin/listOfUser', {userId:this.paramData},  1).subscribe(success => {
      if(success.response_code == 200) {
        console.log("userdata",success)
        // this.service.success(success.response_message)
        this.userData = success.result[0];
        this.kycImage = this.userData.profilePic;
        this.dateofb= this.userData.createdAt
        this.todaye = this.dateofb.split("T")[0]
        console.log("userdata",this.userData)
        this.spinner.hide();
        // this.router.navigate['/subadmin-management']
        this.editSubadminForm.patchValue({
          name: this.userData.name,
          email: this.userData.email,
          dob:this.todaye,
          number: this.userData.mobileNumber
        })
      }
      else {
        this.spinner.hide();
      }
    })
  }
  form() {
    this.editSubadminForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i), Validators.maxLength(30)]),
      dob: new FormControl('', [Validators.required]),
      // countryCode      : new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.pattern(/^[1-9][0-9]{8,13}$/)]),
    });
  }
  getUserData() {
    this.spinner.show();
    console.log("jhgfjgjhgfhjk", this.paramData);
    this.service.postApii('admin/editUser', { userId: this.paramData }, 1).subscribe(success => {
      if (success.response_code == 200) {
        console.log("userdata", success)
        this.userData = success.result[0];
        this.kycImage = this.userData.profilePic;
        this.dateofb = this.userData.createdAt;
        console.log("dfsfsdfsd",this.dateofb);
        this.todaye = this.dateofb.split("T")[0]
        console.log("gdfhjgfhjgfhjgf",this.todaye)
        this.editSubadminForm.patchValue({
          name: this.userData.name,
          email: this.userData.email,
          number: this.userData.mobileNumber,
          dob: this.todaye
        })
        console.log("userdata", this.userData)
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })
  }

  updateSubadmin() {
    this.spinner.show();
    let data = {
      userId: this.paramData,
      email: this.editSubadminForm.value.email,
      name: this.editSubadminForm.value.name,
      mobileNumber: this.editSubadminForm.value.number,
      DOB: this.editSubadminForm.value.dob,
      image: this.kycImage
    }
    this.service.postApii('admin/editUser', data, 1).subscribe(success => {
      if (success.response_code == 200) {
        console.log("success", success)
        this.router.navigate(['/user-management'])
        this.spinner.hide();
      }
      else {
        console.log("else", success);
        this.spinner.hide();
      }
    }, (error) => {
      console.log("error", error)
      this.spinner.hide();
    })
  }
  ValidateFileUpload(event) {
    this.file = event.target.files;
    if (this.file[0]) {
      this.imageType = this.file[0].type;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.kycImage = e.target.result;
      };
      reader.readAsDataURL(this.file[0]);
    }
  }


}
