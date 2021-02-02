import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
declare var $: any

@Component({
  selector: 'app-enquire-management',
  templateUrl: './enquire-management.component.html',
  styleUrls: ['./enquire-management.component.css']
})
export class EnquireManagementComponent implements OnInit {
  enquireListData: any = [];
  p = 1;
  userDetail: any;
  constructor(public server: ServiceService, public router: Router) { }

  ngOnInit() {
    this.getEnquireList();
  }

  getEnquireList() {
    this.server.showSpinner();
    this.server.get('wallet/get-bulk-purchase-request-list?page=0&pageSize=10').subscribe((succ) => {
     
      this.server.hideSpinner();
      if (succ['status'] == 200) {
        this.enquireListData = succ['data'].RESULT_LIST
       
      }
    })
  }

  // View User Detail
  viewDetail(userId) {
    var url = 'wallet/get-bulk-purchase-request-details?requestId=' + userId;
    this.server.showSpinner();
    this.server.get(url).subscribe(res => {
     
      this.server.hideSpinner();
     
      if (res['status'] == 200) {
        $('#view').modal('show');
        this.userDetail = res['data'].message;
       
      } else {
        this.server.toasterErr(res['message']);
      }
    }, err => {
   
      this.server.hideSpinner();
      if (err['status'] == '401') {
        this.server.onLogout();
        this.server.toasterErr('Unauthorized Access');
      } else {
        this.server.toasterErr('Something Went Wrong');
      }
    })
  }
  
  // resolve
  resolve(userId) {
    var url = 'wallet/bulk-purchase-request-set-resolved?isResolved=true&requestId=' + userId;
    this.server.showSpinner();
    this.server.get(url).subscribe(res => {
    
      this.server.hideSpinner();
    
      if (res['status'] == 200) {
        $('#active').modal('show');
      } else {
        this.server.toasterErr(res['message']);
      }
    }, err => {
     
      this.server.hideSpinner();
      if (err['status'] == '401') {
        this.server.onLogout();
        this.server.toasterErr('Unauthorized Access');
      } else {
        this.server.toasterErr('Something Went Wrong');
      }
    })
  }
}
