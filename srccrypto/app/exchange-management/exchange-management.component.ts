import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
declare var $: any;
@Component({
  selector: 'app-exchange-management',
  templateUrl: './exchange-management.component.html',
  styleUrls: ['./exchange-management.component.css']
})
export class ExchangeManagementComponent implements OnInit {
  exchangeArry: any;
  total: any;
  p: number = 0;
  fromDate: any = ''
  twoDate: any = ''
  calender: any = { todate: '', formdate: '' }
  minAge: Date;
  withdrwal: any = ''
  pageNumber:number=1;
  searchText:string=''
  exchangeForm: any;
  userList: any=[];
  constructor(private router : Router, public service:ServiceService) { }

  ngOnInit() {
  
  var today = new Date();
  var minAge = 0;
  this.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
  this.getUserListwallet1(this.p)
  }
  formdate() {

    this.fromDate = new Date(this.calender.formdate)
    this.fromDate = this.fromDate.getTime()
   
}
todate() {
    this.twoDate = new Date(this.calender.todate)
    this.twoDate = this.twoDate.getTime()
}
onChange(val) {
  this.withdrwal = val
  this.getUserListwallet(this.p)
}

  getUserListwallet(p) {
   
    this.service.showSpinner();
    
    this.service.get('p2p-exchange/find-all-buy-sell-for-admin1?pageSize=' + '10' + '&page=' + this.p + '&orderType=' + this.withdrwal  + '&fromDate=' + this.fromDate + '&toDate=' + this.twoDate).subscribe((res) => {
  
        this.service.hideSpinner();
        if (res['status'] == 200) {
            this.exchangeArry = res['data'].RESULT_LIST
            this.total = res['totalCount'];
        }
       
        else {
            this.service.toasterErr(res['message']);
            this.service.hideSpinner();
        }
    }, (err) => {
        this.service.hideSpinner();
    })
  }

  getUserListwallet1(p) {
   
    this.service.showSpinner();
   
    this.service.get('p2p-exchange/find-all-buy-sell-for-admin1?pageSize=' + '10' + '&page=' + this.p + '&orderType=' + 'BUY'  + '&fromDate=' + this.fromDate + '&toDate=' + this.twoDate).subscribe((res) => {
  
        this.service.hideSpinner();
        if (res['status'] == 200) {
            this.exchangeArry = res['data'].RESULT_LIST
            this.total = res['totalCount'];
        }
        
        else {
            this.service.toasterErr(res['message']);
            this.service.hideSpinner();
        }
    }, (err) => {
        this.service.hideSpinner();
    })
  }

 
  
}
