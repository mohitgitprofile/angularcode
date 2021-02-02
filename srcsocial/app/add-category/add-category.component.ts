import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $:any
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  addAgentForm: FormGroup;
  file: any = [];
  imageType: any;
  imageUrl: any;
  countryList: any=[];
  isValidNumbers: any;
  myCode: string;
  agentList: any = [];
  todaye: string;

  constructor(private service: ServiceService, private router: Router, private spinner: NgxSpinnerService) { 
    this.todaye = new Date().toISOString().split("T")[0];
    console.log("hfhjgfghdfghjf",this.todaye);

  }

  ngOnInit() {
    this.form();
    // this.getAgent();
  }

 
  form() {
    this.addAgentForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('')]),
      date: new FormControl('',[Validators.required, Validators.pattern('')] )
      
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
  addCategory() {
    let data = {
      categoryName: this.addAgentForm.value.name,
      addedOn: this.addAgentForm.value.date,
      image : this.imageUrl
    }
    this.service.postApii('admin/addCategory', data, 1).subscribe(success => {
      console.log("success",success)
      if(success.response_code == 200) {
        // this.service.success(success.response_message)
        this.agentList = success;
        this.router.navigate(['/category-management'],)
      }
      else {
        // this.service.error(success.response_message)
      }
    })
  }
  // ValidateFileUpload(event) {
  //   this.file = event.target.files;
  //   if (this.file[0]) {
  //     this.imageType = this.file[0].type;
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.imageUrl = e.target.result;
  //     };
  //     reader.readAsDataURL(this.file[0]);
  //   }
  // }

  toCheckSpaceChars() {
    this.isValidNumbers = $('#loginPhoneNumber').intlTelInput('isValidNumber');
    const countryData = $('#loginPhoneNumber').intlTelInput('getSelectedCountryData');
    this.myCode = "+" + countryData.dialCode;
 console.log('check vent -=-=-', this.isValidNumbers)
  }


}
