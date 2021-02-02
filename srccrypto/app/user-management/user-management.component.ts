import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $: any
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  pageNumber: number = 1;
  beDisable: boolean = true;
  userForm: FormGroup;
  userID: any;
  action: any;
  userList: any = [];
  searchText: string = ''
  userDetail: any = {};
  space: string = ' ';
  convertFormat: any;
  newArray: any=[];
  newFromDate: number;
  newToDate: any;
  constructor(
    private router: Router, public service: ServiceService
  ) {

  }

  ngOnInit() {
    this.userForm = new FormGroup({
      'startdate': new FormControl('', Validators.required),
      'enddate': new FormControl('', Validators.required),
      'searchText': new FormControl(''),
      'sedan': new FormControl(''),
      'hatch': new FormControl(''),
      'suv': new FormControl(''),
    })
    // this.onDateChanged();
    this.getUserList();
  }

  /**************** Date managing***************/
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    openSelectorOnInputClick: false,
    disableSince: { year: 0, month: 0, day: 0 }
  };
  public toDate: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    openSelectorOnInputClick: false,
    disableUntil: { year: 0, month: 0, day: 0 }
  };

  onDateChanged() {
    let d = new Date();
    let copy1 = this.getCopyOfOptions();
    copy1.disableSince = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    };
    this.myDatePickerOptions = copy1;
  }
  //Returns copy of myDatePickerOptions
  getCopyOfOptions(): IMyDpOptions {
    return JSON.parse(JSON.stringify(this.myDatePickerOptions));
  }


  public onChange(event: IMyDateModel) {
    if (event.formatted) {
      this.beDisable = false
      let d: Date = new Date(event.jsdate.getTime());
      d.setDate(d.getDate() - 1);
      let copy: IMyDpOptions = this.getCopyOfToDateOpt();
      copy.disableUntil = {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate()
      };
      this.toDate = copy;
    }

  }
  getCopyOfToDateOpt(): IMyDpOptions {
    return JSON.parse(JSON.stringify(this.toDate));
  }
  /*******************Date managing Ends Here**************/


  // Get List of User
  getUserList() {
    var url = "account/admin/user-management/filter-user-details";
    // var url = "account/admin/user-management/filter-user-details?&page=1";
    this.service.showSpinner();
    this.service.get(url).subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.userList = res['data']['list'];
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }

  // Apply Filter 
  applyFilter(val) {
    if (val == 'date') {
      var startdate = this.userForm.value.startdate.epoc ? (Number(this.userForm.value.startdate.epoc) * 1000) : ''
      var enddate = this.userForm.value.enddate.epoc ? (Number(this.userForm.value.enddate.epoc) * 1000) : ''
      var url = "account/admin/user-management/filter-user-details?fromDate=" + startdate + "&page=" + (this.pageNumber - 1) + "&toDate=" + enddate + "&pageSize=10";
    } else {
      var url = "account/admin/user-management/filter-user-details?&page=" + (this.pageNumber - 1) + "&search=" + this.userForm.value.searchText + "&pageSize=10";
    }
    this.service.showSpinner();
    this.service.get(url).subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.userList = res['data']['list'];
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }

  // Delete / Block Function
  openModal(action, userId) {
    this.userID = userId;
    this.action = action;
    if (action == 'DELETE') {
      $('#deleteModal').modal('show')

    } else if (action == 'BLOCK') {
      $('#block').modal('show')
    }
    else {
      $('#active').modal('show')
    }
  }
  //User Details
  userdetails(userId, email) {
    console.log("fgsdgsdf",userId);
    this.router.navigate(['/user-details/'], {queryParams: {userId,email}} )
  }
  walletdetail(userId) {
    this.router.navigate(['walletdetails/' + userId])
  }

  //export User
  exportAsXLSX() {
    let dataArr = [];
    this.userList.forEach((element, ind) => {

      dataArr.push({
        "S no": ind + 1,
        "User ID": element.userId ? element.userId : '',
        "User Name": element.firstName + '' + element.lastName ? element.lastName : '',
        "Email": element.email ? element.email : 'N/A',
        "Phone": element.phoneNo ? element.phoneNo : 'N/A',
        "Status": element.userStatus == true ? 'Active' : 'Inactive',
        "Date": element.createTime ? element.createTime.slice(0, 10) : 'N/A',
      })
    })

    this.service.exportAsExcelFile(dataArr, 'Admin User list');
  }

  // Delete User 
  deleteFunction() {
    var url = 'account/admin/user-management/delete-user-detail?userIdToDelete=' + (this.userID) + '&ipAddress=' + (6754675467) + '&location=' + ('unknown');
    this.service.showSpinner();
    this.service.get(url).subscribe(res => {

      this.service.hideSpinner();
      if (res['status'] == 200) {
        $('#deleteModal').modal('hide')
        this.service.toasterSucc('User Deleted Successfully');
        this.getUserList();
      }
    }, err => {

      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }

  performAction() {
    var url = 'account/admin/user-management/user-status?ipAddress='+(11)+'&location='+('unknown')+ '&userIdForStatusUpdate='+(this.userID) + '&userStatus=' + (this.action);
    this.service.showSpinner();
    this.service.post(url, '').subscribe(res => {

      this.service.hideSpinner();
      if (res['status'] == 200) {
        if (this.action == 'BLOCK') {
          $('#block').modal('hide');
          this.service.toasterSucc('User Blocked Successfully');
        }
        else {
          $('#active').modal('hide');
          this.service.toasterSucc('User Activated Successfully');
        }
        this.getUserList();
      }
    }, err => {

      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }

  searchTe() {
    this.service.get('account/admin/user-management/filter-user-details?search='+(this.userForm.value.searchText)).subscribe((res:any)=>{
      console.log("djhgsfjhdgf",res)
      if(res.status == 200) {
        this.userList = res['data']['list'];
      }
      else {
        this.userList = res['data']['list'];
      }
      
    })
  }
  reset() {
    this.userForm.reset();
    this.getUserList();
  }

  searchByDate() {
    this.newFromDate = Math.round(new Date(this.userForm.value.startdate).getTime())
    this.newToDate = Math.round(new Date(this.userForm.value.enddate).getTime())
    console.log("newFromDate",this.newFromDate)
    console.log("newFromDate", this.newToDate)
    console.log("newFromDate", this.userForm.value.startdate.epoc)
    console.log("newFromDate", this.userForm.value.enddate.epoc)
    this.service.get('account/admin/user-management/filter-user-details?fromDate='+(this.userForm.value.startdate.epoc * 1000) + '&toDate='+(this.userForm.value.enddate.epoc * 1000)).subscribe((res:any)=>{
      console.log("hjgvjhgds",res)
      this.userList = res['data']['list'];
    })
  }
  goAdmin() {
    this.router.navigate(['/admin-management'])
  }

}

