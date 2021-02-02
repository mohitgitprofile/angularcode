import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ngxCsv } from 'ngx-csv';

declare var $:any

@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.component.html',
  styleUrls: ['./sub-admin.component.css']
})
export class SubAdminComponent implements OnInit {

  searchForm: FormGroup;
  pagination: any = { limit: 10, currPage: 1, total: 0 };
  userList: any = [];
  copyUserList: any = [];
  sortOnCreatedAtKey: any = 1;
  sortOnUpdateedAtKey: any = 1;
  sortOnNameKey: any = 1;
  totalUsers: any = 0;
  whichmodal: string;
  particularUserData: any;
  permission: any = [];
  calender: any = { toDate: '', formdate: '' }
  minAge: Date;
  fromDate: any = '';
  twoDate: any = '';
  searchByName: any;
  csvData: any = [];
  newArr: any;
  constructor(
    private service: ServiceService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    this.form();
    this.getUserList();
  }

  goToEdit(data){
    this.router.navigate(['/edit-subadmin'],{queryParams:{id:data._id, email:data.email, number:data.mobileNumber}})
  }

  exportCSV() {
    let dataArr = [];
    dataArr.push({
        sno: "S.No.",
        Name: "Name",
        Email: "Email Id",
        Phone: "Phone Number",
    });
  
    this.copyUserList.forEach((element,ind) => {
        dataArr.push({
            sno:ind+1,
            Name:element.name?element.name:'--',
            Email:element.email?element.email:'--',
            Phone: element.mobileNumber?element.mobileNumber:'--',
        })
    }) 
    new ngxCsv(dataArr, 'User_management');
}

  gotonextPage() {
    this.router.navigate(['/add-subadmin']);
  }

  form() {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
  }
  // formdate() {
  //   console.log('this.calender.formdate', this.calender.formdate)
  //   this.fromDate = new Date(this.calender.formdate)
  //   console.log('this.fromDate ==> 1', this.fromDate)
  //   this.fromDate = this.fromDate.getTime()
  //   console.log('this.fromDate ==> 2', this.fromDate)
  //   let newDate = new Date(this.fromDate)
  //   console.log(newDate)
  // }
  // todate() {
  //   this.twoDate = new Date(this.calender.todate)
  //   console.log('this.twoDate ==>1', this.twoDate)
  //   this.twoDate = this.twoDate.getTime()
  //   console.log('this.twoDate ==>2', this.twoDate)
  // }
  searchValue(value) {
    this.searchByName = value
    console.log("hgfhgf", this.searchByName);

    this.searchUser();
  }
  searchUser() {
    this.service.postApii('admin/listOfSubAdmin', { search: this.searchByName }, 1).subscribe(success => {
      console.log("success", success);
      if (success.response_code == 200) {
        
        this.copyUserList = success.result[0].docs;
        this.spinner.hide();
      }
      else
       {
         this.copyUserList=[];
        this.copyUserList=success.result[0].docs;
        this.spinner.hide();
      }
    })
  }

  getUserList() {
    this.spinner.show();
    this.service.postApii('admin/listOfSubAdmin', '', 1).subscribe(success => {
      console.log("success", success);
      if (success.response_code == 200) {
        
        this.copyUserList = success.result[0].docs;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })

  }

  getType(attributes) {
    return attributes.filter(item1 => {
      return item1.Name === 'custom:userType';
    });
  }

  userListPagination(event) {
    this.pagination.currPage = event;
  }


  cancel() {
    this.searchForm.reset();
    this.copyUserList = this.userList;
    this.pagination.total = this.copyUserList.length;
  }


  filterData(value, args) {
    let data = value.filter(item => {
      return item.Name === args;
    });
    return data;
  }

  sortOnCreateedAt() {
    if (this.sortOnCreatedAtKey % 2 === 0) {
      this.copyUserList.sort((a, b) => {
        var m = new Date(a.UserCreateDate).getTime();
        var n = new Date(b.UserCreateDate).getTime();
        return (m - n);
      });
    } else {
      this.copyUserList.sort((a, b) => {
        var m = new Date(a.UserCreateDate).getTime();
        var n = new Date(b.UserCreateDate).getTime();
        return (n - m);
      });
    }
    this.sortOnCreatedAtKey++;
  }

  sortOnUpdateedAt() {
    if (this.sortOnUpdateedAtKey % 2 === 0) {
      this.copyUserList.sort((a, b) => {
        var m = new Date(a.UserLastModifiedDate).getTime();
        var n = new Date(b.UserLastModifiedDate).getTime();
        return (m - n);
      });
    } else {
      this.copyUserList.sort((a, b) => {
        var m = new Date(a.UserLastModifiedDate).getTime();
        var n = new Date(b.UserLastModifiedDate).getTime();
        return (n - m);
      });
    }
    this.sortOnUpdateedAtKey++;
  }

  // admin/deleteAndBlockUser

  enableDisableOrDeleteOpenModal(data, whichModal) {
    console.log("Data >>>>> ", data)
    if (whichModal === 'enable') {
      this.whichmodal = 'enable';
    } else {
      if (whichModal === 'disable') {
        this.whichmodal = 'disable';
      } else {
        this.whichmodal = 'delete';
      }
    }
    this.particularUserData = data;
    $('#enableDisableDeleteModal').modal({ backdrop: 'static', keyboard: false });
  }

  anableDisable(enableorDisable) {
    if (enableorDisable === 'disable')  {
      console.log("Inside Disable Block")
      this.disableSubadmin(this.particularUserData);
      $('#enableDisableDeleteModal').modal('hide');
      this.getUserList();
    } else {
      if (enableorDisable === 'enable') {
        console.log("Inside Enable Block")
        this.enableSubadmin(this.particularUserData);
        $('#enableDisableDeleteModal').modal('hide');
        this.getUserList();
      } else {
        console.log("Inside Delete Block")
        this.deleteSubadmin(this.particularUserData);
        $('#enableDisableDeleteModal').modal('hide');
        this.getUserList();
      }
    }
  }

  disableSubadmin(data) {
    console.log("disableSubadmin", data);

    let dataa = {
      userId: data,
      status: 'BLOCK'
    }
    this.spinner.show();
    this.service.postApii('admin/deleteAndBlockUser', dataa, 1).subscribe(success => {
      if (success.response_code == 200) {
        this.service.success("Successfully deactivated.")
        this.spinner.hide();
        this.getUserList();
      }
      else {
        this.spinner.hide();
      }
    })
  }

  reset() {
    this.searchForm.reset();
    this.getUserList();
  }
  enableSubadmin(data) {
    console.log("enableSubadmin", data);
    let dataa = {
      userId: data,
      status: 'ACTIVE'
    }
    this.spinner.show();
    this.service.postApii('admin/deleteAndBlockUser', dataa, 1).subscribe(success => {
      if (success.response_code == 200) {
        this.service.success("Successfully activated.")
        this.spinner.hide();
        this.getUserList();
      }
      else {
        this.spinner.hide();
      }
    })
  }
  deleteSubadmin(data) {
    this.spinner.show();
    this.service.postApii('admin/deleteSubAdmin', { subAdminId: data._id }, 1).subscribe(success => {
      if (success.response_code == 200) {
        // this.service.success(success.response_message)
        this.spinner.hide();
        this.getUserList()
      }
      else {
        this.spinner.hide();
      }
    })
  }
  getEmailOrPhone(objectVal) {
    let v = objectVal.Attributes.filter(item => {
      return item.Name === 'phone_number';
    });
    return v;
  }

  openView(data) {
    this.router.navigate(['/viewuser', data.Username]);
  }


}
