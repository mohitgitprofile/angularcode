import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.css']
})
export class AdminManagementComponent implements OnInit {
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
  ipAddress: any;
  userListlength: any;
  constructor(
    private router: Router, public service: ServiceService, public http: HttpClient
  ) {
    this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(data => {
        console.log('th data', data);
        this.ipAddress = data.ip
        console.log("djfhgdj", this.ipAddress)
      })
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      'startdate': new FormControl('', Validators.required),
      'enddate': new FormControl('', Validators.required),
      'searchText': new FormControl(''),
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
    let data = {
      "page": 0,
      "pageSize": 10,
    }


    // var url = "account/admin/user-management/filter-user-details?&page=1";
    var url = "account/admin/user-management/search-and-filter-admin";
    this.service.showSpinner();
    this.service.post(url, data).subscribe(res => {

      this.service.hideSpinner();
      if (res['status'] == 569) {
        this.userList = res['data']['list'];
        this.userListlength = this.userList.length;

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
      var startdate = Math.round(new Date(this.userForm.value.startdate).getTime())
      var enddate = Math.round(new Date(this.userForm.value.enddate).getTime())
      var url = "account/admin/user-management/search-and-filter-admin?fromDate=" + startdate + "&page=" + (this.pageNumber - 1) + "&toDate=" + enddate + "&pageSize=10";
    } else {
      var url = "account/admin/user-management/search-and-filter-admin?&page=" + (this.pageNumber - 1) + "&search=" + this.userForm.value.searchText + "&pageSize=10";
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
  userdetail(userId) {
    this.router.navigate(['view-admin/' + userId])
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
        "Role": element.role ? element.role : 'N/A',
        "Phone": element.phoneNo ? element.phoneNo : 'N/A',
        "Status": element.userStatus == true ? 'Active' : 'Inactive',
        "Last Logged In": element.createTime ? element.createTime.slice(0, 10) : 'N/A',
      })
    })

    this.service.exportAsExcelFile(dataArr, 'Admin User list');
  }

  // Delete User 
  deleteFunction() {
    $('#deleteModal').modal('hide')
    let data = {
      "ipAddress": this.ipAddress.ip,
      "primaryIdCommonPerRequest": this.userID
    }
    console.log("hjgvdksxjcfghkjshdg",data)
    this.service.post('account/admin/user-management/detele-staff', data).subscribe((res)=>{
      console.log("hjgvdksxjcfghkjshdg",res)
      this.getUserList();
    })
  }

  performAction() {
    $('#active').modal('hide')
    this.service.showSpinner();
   
    var url = 'account/admin/user-management/user-status?ipAddress='+(this.ipAddress)+'&location='+('unknown')+ '&userIdForStatusUpdate='+(this.userID) + '&userStatus=' + ('ACTIVE');
    this.service.post(url, '').subscribe((res) => {
      console.log("djsfhgbdjkmsfghk", res);
      this.service.toasterSucc("Successfully activated.")
      this.service.hideSpinner();
      this.getUserList();
    })
  }

  performActionActive() {
    $('#block').modal('hide')
    this.service.showSpinner();
    
    var url = 'account/admin/user-management/user-status?ipAddress='+(this.ipAddress)+'&location='+('unknown')+ '&userIdForStatusUpdate='+(this.userID) + '&userStatus=' + ('BLOCK');
    this.service.post(url, '').subscribe((res) => {
      console.log("djsfhgbdjkmsfghk", res);
      this.service.toasterSucc("Successfully deactivated.")
      this.service.hideSpinner();
      this.getUserList();
    })
  }

  addAdmin() {
    console.log("add-admin");

    this.router.navigate(['/add-admin'])
  }

  reset() {
    this.userForm.reset();
    this.getUserList();
  }

  search() {
    this.service.showSpinner();
    if(this.userForm.value.enddate)
    {
      let data = {
        "fromDate": this.userForm.value.startdate.epoc * 1000,
        "page": "0",
        "pageSize": "10",
        "toDate": this.userForm.value.enddate.epoc * 1000
        }
        console.log("hgfdjkuysfklhjug",data)
        var url = "account/admin/user-management/search-and-filter-admin";
        this.service.post(url, data).subscribe((res)=>{
          if(res['status'] == 569) {
            console.log("hgfdjkuysfklhjug",res)
            this.userList = res['data']['list'];
            this.userListlength = this.userList.length;
            this.service.hideSpinner();
          }
          else {
            this.userList = [];
            this.service.hideSpinner();
          }
          
        })
    }
    else if (this.userForm.value.searchText) {
      let data = {
        "page": "0",
        "pageSize": "10",
        "search": this.userForm.value.searchText,
        }
        console.log("hgfdjkuysfklhjug",data)
        var url = "account/admin/user-management/search-and-filter-admin";
        this.service.post(url, data).subscribe((res:any)=>{
          this.userList = null;
          if(res.status == 569) {
            console.log("hgfdjkuysfklhjug",res)
          this.userList = res['data']['list'];
          this.userListlength = this.userList.length;
          this.service.hideSpinner();
          }
          else {
            this.userList = [];
            this.service.hideSpinner();
          }
        })
    }
  }

  goUser() {
    this.router.navigate(['/user-management'])
  }

}
