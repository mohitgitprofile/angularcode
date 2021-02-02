import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-new-staff',
  templateUrl: './add-new-staff.component.html',
  styleUrls: ['./add-new-staff.component.css']
})
export class AddNewStaffComponent implements OnInit {
  addForm: FormGroup;
  ipAddress: any;
  newArr: any = [];

  // constructor(private http: HttpClient){
  //   this.http.get<{ip:string}>('https://jsonip.com')
  //   .subscribe( data => {
  //     console.log('th data', data);
  //     this.ipAddress = data
  //   })
  // }

  constructor(public service: ServiceService, public router: Router, private http: HttpClient) {
    this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(data => {
        console.log('th data', data);
        this.ipAddress = data
        console.log("djfhgdj", this.ipAddress)
      })
  }

  ngOnInit() {
    console.log(this.service.websiteURL,"fsdgdfgd")
    this.addForm = new FormGroup({
      'firstName': new FormControl('', [Validators.pattern(/^[a-z,.'-]+$/i), Validators.required]),
      'lastName': new FormControl('', [Validators.pattern(/^[a-z,.'-]+$/i), Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i)]),
      'role': new FormControl('', Validators.required),
      'gender': new FormControl('', Validators.required),
      'phoneNumber': new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]{8,13}$/), Validators.maxLength(18)]),
    })
  }

  addStaff() {
this.service.showSpinner()
    let data = {
      "address": "string",
      "city": "string",
      "country": "INDIA",
      "countryCode": "+91",
      "dob": "string",
      "email": this.addForm.value.email,
      "firstName": this.addForm.value.firstName,
      "gender": this.addForm.value.gender,
      "imageUrl": "string",
      "ipAddress": this.ipAddress.ip,
      "lastName": this.addForm.value.lastName,
      "location": "string",
      "phoneNo": this.addForm.value.phoneNumber,
      "previlage": this.newArr,
      "roleStatus": "SUBADMIN",
      "state": "string",
      "webUrl": this.service.websiteURL+'reset-password',
      "userIdToUpdate": 12
    }
    console.log(this.service.websiteURL,"fsdgdfgd")
    console.log("api request data->", data)
    this.service.postApi('account/admin/user-management/create-sub-admin', data).subscribe((res) => {
      this.service.hideSpinner()
      console.log("add staff response==>", res)
      this.router.navigate(['/staff-management'])
    })
  }

  /** Function for checkbox click */
  checkboxClick(value, checked) {
    console.log("permission->", value, checked)
    if (checked == true) {
      this.newArr.push(value);
      
    } else {
      console.log("new arr->", this.newArr);
      let index = this.newArr.findIndex(x =>{ x == value
      console.log("dfghdfgu7yfgdshjgs",x);
      })
      console.log(index)
      this.newArr.splice(index, 1)
      console.log("new arr->", this.newArr);
    }
  }
}
