import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  addSubadminForm: FormGroup;
  file: any;
  imageType: any;
  imageUrl: any;
  today: any;
  todaye: string;

  constructor(private router: Router,
    private service: ServiceService,
    private spinner: NgxSpinnerService) {

      this.todaye = new Date().toISOString().split("T")[0];
    console.log("hfhjgfghdfghjf",this.todaye);

     }

  ngOnInit() {
    let obj = new Date();
    console.log("gdfgdfg",obj)
    let hello = obj.getDate();
    let two = obj.getMonth() + 1;
    let three = obj.getFullYear();

    this.today = three + "-" + two + "-" + hello;

    console.log("ghjkghjkgkdfjgjkdf",this.today)
    this.form();
  }


  form() {
    this.addSubadminForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(20)]),
      dob: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      number: new FormControl('',[Validators.required,Validators.maxLength(16),Validators.pattern(/^[1-9][0-9]{8,13}$/)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i)]),
    });
  }
  addUser() {
    this.spinner.show();
    let data = {
      dob: this.addSubadminForm.value.dob,
      name : this.addSubadminForm.value.name,
      mobileNumber: this.addSubadminForm.value.number,
      email: this.addSubadminForm.value.email,
      image: this.imageUrl
    }
    this.service.postApii('admin/addUser',data,1).subscribe(success=>{
      if(success.response_code == 200){
        this.spinner.hide();
        this.router.navigate(['/user-management']);
      }
      else {
        this.spinner.hide();
      }
    },(error=>{
      this.spinner.hide();
      console.log("dfghdfghdfh",error);
      
    }))
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
