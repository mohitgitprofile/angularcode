import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  addForm: FormGroup;
  ipAddress: any;
  newArr: any=[];

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
        this.ipAddress = data.ip
        console.log("djfhgdj", this.ipAddress)
      })
  }

  ngOnInit() {
    this.addForm = new FormGroup({
      'firstName': new FormControl('', [Validators.pattern(/^[a-z,.'-]+$/i), Validators.required]),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'role': new FormControl('', Validators.required),
      'gender': new FormControl('', Validators.required),
      'phoneNumber': new FormControl('', Validators.required)
    })
  }

  addStaff() {

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
      "roleStatus": "ADMIN",
      "state": "string",
      "webUrl": "string",
      "userIdToUpdate": 12
    }
    console.log("jhgfcjkvdsfkjg", data)
    this.service.postApi('account/admin/user-management/create-sub-admin', data).subscribe((res) => {
      console.log("jhgfcjkvdsfkjg", res)
      this.router.navigate(['/admin-management'])
    })
  }

  /** Function for checkbox click */
  checkboxClick(value, checked) {
    console.log("permission->", value, checked)
    if (checked == true) {
      this.newArr.push(value);
    } else {
      let index = this.newArr.findIndex(x => x == value)
      console.log(index)
      this.newArr.splice(index, 1)
      console.log("new arr->", this.newArr);
    }
  }

  cancel() {
    this.router.navigate(['/admin-management'])
  }

}
