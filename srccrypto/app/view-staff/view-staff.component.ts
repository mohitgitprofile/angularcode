import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.css']
})
export class ViewStaffComponent implements OnInit {
  id: any;
  staffDetails: any;
  editStaffForm: FormGroup;
  ipAddress: any;
  staffPrivileges: any = [];
  newArr: any = [];
  checkedBoolead: boolean = true;

  constructor(public router: Router, public param: ActivatedRoute, public service: ServiceService, public http: HttpClient) {
    this.param.queryParams.subscribe((res) => {
      this.id = res.id;
      console.log("hjgvdshjkcfm", res.id);
    });
    this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(data => {
        console.log('th data', data);
        this.ipAddress = data
        console.log("djfhgdj", this.ipAddress)
      })
  }

  ngOnInit() {
    this.editStaffForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      dashboardChecked: new FormControl(''),
      staffChecked: new FormControl(''),
      hotWalletChecked: new FormControl(''),
      kycChecked: new FormControl(''),
      walletChecked: new FormControl(''),
      staticChecked: new FormControl(''),
      logsChecked: new FormControl(''),
      ticketChecked: new FormControl(''),
      tradeChecked: new FormControl(''),
      disputeChecked: new FormControl(''),
      bankChecked: new FormControl(''),
      feeChecked: new FormControl('')
    })
    this.getProfile();
  }

  getProfile() {
    this.service.showSpinner();
    let dataa = {
      "primaryIdCommonPerRequest": this.id
    }
    this.service.post('account/admin/user-management/get-staff-user-profile', dataa).subscribe((res) => {
      console.log("hgfsjdhcfgf", res);
      this.staffDetails = res['data']['staffDetails'];
      this.staffPrivileges = res['data']['staffPrivileges'];
      this.staffPrivileges.forEach(element => {

        if (element == 'DASHBOARD') {
          this.editStaffForm.patchValue({
            dashboardChecked: this.checkedBoolead,
          })
        }
        else if (element == 'HOT_COLD_LIMIT_MANAGEMENT') {
          this.editStaffForm.patchValue({
            hotWalletChecked: this.checkedBoolead,
          })
        }
        else if (element == 'KYC_MANAGEMENT') {
          this.editStaffForm.patchValue({
            kycChecked: this.checkedBoolead,
          })
        }
        else if (element == 'WALLET_MANAGEMENT') {
          this.editStaffForm.patchValue({
            walletChecked: this.checkedBoolead,
          })
        }
        else if (element == 'STATIC_CONTENT') {
          this.editStaffForm.patchValue({
            staticChecked: this.checkedBoolead,
          })
        }
        else if (element == 'LOGS_MANAGEMENT') {
          this.editStaffForm.patchValue({
            logsChecked: this.checkedBoolead,
          })
        }
        else if (element == 'TICKET_MANAGEMENT') {
          this.editStaffForm.patchValue({
            ticketChecked: this.checkedBoolead,
          })
        }
        else if (element == 'TRADE_MANAGEMENT') {
          this.editStaffForm.patchValue({
            tradeChecked: this.checkedBoolead,
          })
        }
        else if (element == 'DISPUTE_MANAGEMENT') {
          this.editStaffForm.patchValue({
            disputeChecked: this.checkedBoolead,
          })
        }
        else if (element == 'STAFF_MANAGEMENT') {
          this.editStaffForm.patchValue({
            staffChecked: this.checkedBoolead,
          })
        }
        else if (element == 'BANK_MANAGEMENT') {
          this.editStaffForm.patchValue({
            bankChecked: this.checkedBoolead,
          })
        }
        else if (element == 'FEE_MANAGEMENT') {
          this.editStaffForm.patchValue({
            feeChecked: this.checkedBoolead,
          })
        }
        console.log("findData===>", this.staffPrivileges)
      });
      console.log("hgfsjdhcfgf", this.staffPrivileges)
      this.editStaffForm.patchValue({
        firstName: this.staffDetails.firstName,
        lastName: this.staffDetails.lastName,
        email: this.staffDetails.email,
        gender: this.staffDetails.gender,
        role: this.staffDetails.role,
        phoneNumber: this.staffDetails.phoneNo
      })
      setTimeout(() => {
        this.service.hideSpinner();
      }, 2000)

    })
  }

  editStaff() {
    let data = {
      "address": "string",
      "city": "string",
      "country": "INDIA",
      "countryCode": "+91",
      "dob": "string",
      "email": this.editStaffForm.value.email,
      "firstName": this.editStaffForm.value.firstName,
      "gender": this.editStaffForm.value.gender,
      "imageUrl": "string",
      "ipAddress": this.ipAddress.ip,
      "lastName": this.editStaffForm.value.lastName,
      "location": "string",
      "phoneNo": this.editStaffForm.value.phoneNumber,
      "previlage": this.newArr,
      "roleStatus": "SUBADMIN",
      "state": "string",
      "webUrl": "string",
      "userIdToUpdate": this.id
    }
    this.service.post('account/admin/user-management/edit-sub-admin', data).subscribe((res) => {
      console.log("jkghsydfjkhgasjkfhg", res)
      this.router.navigate(['/staff-management'])
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


  back() {
    this.router.navigate(['/staff-management'])
  }
  edit(id) {
    this.router.navigate(['/edit-staff'], {queryParams:{id}})
  }

  // getProfile() {
  //   this.service.showSpinner();
  //   let dataa = {
  //     "primaryIdCommonPerRequest": this.id
  //   }
  //   this.service.post('account/admin/user-management/get-staff-user-profile', dataa).subscribe((res)=>{
  //     console.log("hgfsjdhcfgf",res)
  //     this.staffDetails = res['data']['staffDetails']
  //     console.log("hgfsjdhcfgf",this.staffDetails)
  //     setTimeout(()=>{
  //       this.service.hideSpinner();
  //     },2000)
      
  //   })
  // }

}
