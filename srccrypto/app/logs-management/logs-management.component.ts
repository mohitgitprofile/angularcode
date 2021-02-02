import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-logs-management',
  templateUrl: './logs-management.component.html',
  styleUrls: ['./logs-management.component.css']
})
export class LogsManagementComponent implements OnInit {
  minAge: Date;
  fromDate: any = ''
  twoDate: any = ''
  calender: any = { todate: '', fromdate: '' }
  searchByEmail: any;

  customerLogsData: any = []
  staffLogsData: any = []
  adminLogsData: any = []
  itemsPerPage = 5
  currentPage = 1
  totalItems: any

  currTab: any = 'customer';

  constructor(public service: ServiceService, private datePipe: DatePipe) { }

  ngOnInit() {
    var today = new Date();
    var minAge = 0;
    this.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate())
    this.getCustomerLogs()
  }

  // from/to date validation
  fromdate() {
    this.fromDate = new Date(this.calender.fromdate)
    this.fromDate = this.fromDate.getTime()
  }
  todate() {
    this.twoDate = new Date(this.calender.todate)
    this.twoDate = this.twoDate.getTime()
  }

  // select tab
  selectTab(tab) {
    this.currentPage = 1
    this.totalItems = 0
    this.currTab = tab
    this.searchByEmail = ''
    this.fromDate = ''
    this.twoDate = ''
    this.calender = { todate: '', fromdate: '' }
    switch (this.currTab) {
      case 'customer':
        this.getCustomerLogs();
        this.customerLogsData = []
        break;
      case 'staff':
        this.staffLogsData = []
        this.getStaffLogs();
        break;
      case 'admin':
        this.adminLogsData = []
        this.getAdminLogs();
        break
    }
  }

  // get active logs of customer
  getCustomerLogs() {
    this.service.showSpinner();
    this.service.get(`account/admin/logs/search-all-user-login-details?page=${this.currentPage - 1}&pageSize=${this.itemsPerPage}${(this.searchByEmail ? ('&search=' + this.searchByEmail) : '') + (this.fromDate ? ('&fromDate=' + this.fromDate) : '') + (this.twoDate ? ('&toDate=' + this.twoDate) : '')}`).subscribe((res) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.customerLogsData = res['data'].list
        this.totalItems = res['data'].totalCount
        this.service.toasterSucc(res['message'])
      } else {
        this.customerLogsData = []
        this.totalItems = 0
        this.service.toasterErr(res['message'])
      }
    }, err => {
      this.service.hideSpinner()
      this.service.toasterErr(err['message'])
      console.log(err)
    })
  }
  // searchCustomerByFilters(){
  //   this.service.showSpinner();
  //   this.service.get(`account/admin/logs/search-all-user-login-details?page=0&pageSize=5&search=${this.searchByEmail}&fromDate=${this.fromDate}&toDate=${this.twoDate}`).subscribe((res) => {
  //     this.service.hideSpinner()
  //     if (res['status'] == 200) {
  //       this.customerLogsData = res['data'].list
  //       this.totalItems = res['data'].totalCount
  //       this.service.toasterSucc(res['message'])
  //     } else {
  //       this.customerLogsData = []
  //       this.totalItems = 0
  //       this.service.toasterErr(res['message'])
  //     }
  //   }, err => {
  //     this.service.hideSpinner()
  //     this.service.toasterErr(err['message'])
  //     console.log(err)
  //   })
  // }
  

  // get active logs of staff
  getStaffLogs() {
    this.service.showSpinner();
    this.service.get(`account/admin/logs/search-all-staff-login-details?page=${this.currentPage - 1}&pageSize=${this.itemsPerPage}${(this.searchByEmail ? ('&search=' + this.searchByEmail) : '') + (this.fromDate ? ('&fromDate=' + this.fromDate) : '') + (this.twoDate ? ('&toDate=' + this.twoDate) : '')}`).subscribe((res) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.staffLogsData = res['data'].list
        this.totalItems = res['data'].totalCount
        this.service.toasterSucc(res['message'])
      } else {
        this.staffLogsData = []
        this.totalItems = 0
        this.service.toasterErr(res['message'])
      }
    }, err => {
      this.service.hideSpinner()
      this.service.toasterErr(err['message'])
      console.log(err)
    })
  }

  // get active logs of admin
  getAdminLogs() {
    this.service.showSpinner();
    this.service.get(`account/admin/logs/search-all-admin-login-details?page=${this.currentPage - 1}&pageSize=${this.itemsPerPage}${(this.searchByEmail ? ('&search=' + this.searchByEmail) : '') + (this.fromDate ? ('&fromDate=' + this.fromDate) : '') + (this.twoDate ? ('&toDate=' + this.twoDate) : '')}`).subscribe((res) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.adminLogsData = res['data'].list
        this.totalItems = res['data'].totalCount
        this.service.toasterSucc(res['message'])
      } else {
        this.adminLogsData = []
        this.totalItems = 0
        this.service.toasterErr(res['message'])
      }
    }, err => {
      this.service.hideSpinner()
      this.service.toasterErr(err['message'])
      console.log(err)
    })
  }

  // common search for active logs of customer/staff/agent
  search() {
    if (this.searchByEmail || this.fromDate || this.twoDate) {
      switch (this.currTab) {
        case 'customer':
          this.searchCustomerByEmail();
          break;
        case 'staff':
          this.getStaffLogs();
          break;
        case 'admin':
          this.getAdminLogs();
          break
      }
    } else {
      console.log('Please enter the fields for search.')
    }
  }
  searchCustomerByEmail() {
    this.service.showSpinner();
      this.service.get(`account/admin/logs/search-all-user-login-details?page=0&pageSize=5&search=${this.searchByEmail}&fromDate=${this.fromDate}&toDate=${this.twoDate}`).subscribe((res) => {
        this.service.hideSpinner()
        if (res['status'] == 200) {
          this.customerLogsData = res['data'].list
          this.totalItems = res['data'].totalCount
          this.service.toasterSucc(res['message'])
        } else {
          this.customerLogsData = []
          this.totalItems = 0
          this.service.toasterErr(res['message'])
        }
      }, err => {
        this.service.hideSpinner()
        this.service.toasterErr(err['message'])
        console.log(err)
      })
    }
  

  // common reset for active logs of customer/staff/agent
  reset() {
    if (this.searchByEmail || this.fromDate || this.twoDate) {
      this.searchByEmail = ''
      this.fromDate = ''
      this.twoDate = ''
      this.calender = { todate: '', fromdate: '' }
      switch (this.currTab) {
        case 'customer':
          this.getCustomerLogs();
          break;
        case 'staff':
          this.getStaffLogs();
          break;
        case 'admin':
          this.getAdminLogs();
          break
      }
    }
  }

  // common pagination for active logs of customer/staff/agent
  pagination(page) {
    this.currentPage = page
    switch (this.currTab) {
      case 'customer':
        this.getCustomerLogs();
        break;
      case 'staff':
        this.getStaffLogs();
        break;
      case 'admin':
        this.getAdminLogs();
        break
    }
  }

  // common export as excel for active logs of customer/staff/agent
  exportAsXLXS() {
    let dataArr = [];
    switch (this.currTab) {
      case 'customer':
        this.customerLogsData.forEach((element) => {
          dataArr.push({
            'ID': element.userId ? element.userId : 'N/A',
            'Email': element.email ? element.email : 'N/A',
            'Date and Time': element.createTime ? this.datePipe.transform(element.createTime) : 'N/A',
            'IP': element.ipAddress ? element.ipAddress : 'N/A',
            'Browser Agent': element.userAgent ? element.userAgent : 'N/A'
          })
        })
        break;
      case 'staff':
        this.staffLogsData.forEach((element) => {
          dataArr.push({
            'ID': element.userId ? element.userId : 'N/A',
            'Staff Email': element.email ? element.email : 'N/A',
            'Date': element.createTime ? this.datePipe.transform(element.createTime) : 'N/A',
            'IP': element.ipAddress ? element.ipAddress : 'N/A',
            'Browser Agent': element.userAgent ? element.userAgent : 'N/A'
          })
        })
        break;
      case 'admin':
        this.adminLogsData.forEach((element) => {
          dataArr.push({
            'Id': element.userId ? element.userId : 'N/A',
            'Email': element.email ? element.email : 'N/A',
            'Activity': element.activity ? element.activity : 'N/A',
            'Date': element.createTime ? this.datePipe.transform(element.createTime) : 'N/A',
            'IP': element.ipAddress ? element.ipAddress : 'N/A',
            'Browser Agent': element.userAgent ? element.userAgent : 'N/A'
          })
        })
        break;
    }
    this.service.exportAsExcelFile(dataArr, 'Activity Logs ' + this.currTab.charAt(0).toUpperCase() + this.currTab.slice(1))
  }

}
 