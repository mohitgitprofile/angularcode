import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { DatePipe } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-dispute-management',
  templateUrl: './dispute-management.component.html',
  styleUrls: ['./dispute-management.component.css']
})
export class DisputeManagementComponent implements OnInit {
  // exchangeArry: any;
  // total: any;
  // p: number = 0;
  // fromDate: any = ''
  // twoDate: any = ''
  // calender: any = { todate: '', formdate: '' }

  // minAge: Date;
  // withdrwal: any = ''

  fromDate: any = ''
  twoDate: any = ''
  calender: any = { todate: '', fromdate: '' }
  minAge: Date;
  tradeStatus: any = ''
  country: any = ''
  paymentType: any = '';
  type: any = '';
  disputeList: any = [];
  itemsPerPage: number = 5;
  currentPage: number = 1
  totalItems: number;
  countryList: any = [];

  constructor(private router: Router, public service: ServiceService, private datePipe: DatePipe) { }

  ngOnInit() {
    var today = new Date();
    var minAge = 0;
    this.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    // this.getUserListwallet(this.p)
    this.getDisputeList()
    this.getCountryList()

  }

  fromdate() {

    this.fromDate = new Date(this.calender.fromdate)
    this.fromDate = this.fromDate.getTime()

  }
  todate() {
    this.twoDate = new Date(this.calender.todate)
    this.twoDate = this.twoDate.getTime()
  }

  // getUserListwallet(p) {

  //   this.service.showSpinner();

  //   // this.service.get('p2p-exchange/get-trade-history-for-admin?pageSize=' + '10' + '&page=' + this.p + '&tradeStatus=' + 'DISPUTE'  + '&fromDate=' + this.fromDate + '&toDate=' + this.twoDate).subscribe((res) => {
  //     this.service.get('p2p-exchange/get-trade-history-for-admin?pageSize=' + '10' + '&page=' + this.p + '&tradeStatus=' + 'DISPUTE').subscribe((res) => {

  //       this.service.hideSpinner();
  //       if (res['status'] == 200) {
  //           this.exchangeArry = res['data'].RESULT_LIST
  //           this.total = res['totalCount'];
  //       }

  //       else {
  //           this.service.toasterErr(res['message']);
  //           this.service.hideSpinner();
  //       }
  //   }, (err) => {
  //       this.service.hideSpinner();
  //   })
  // }


  // get dispute list 
  getDisputeList() {
    let url = `p2p-exchange/search-and-filters-trade-list?page=${this.currentPage - 1}&pageSize=${this.itemsPerPage}${(this.tradeStatus ? ('&disputeStatus=' + this.tradeStatus) : '')
      + (this.country ? ('&country=' + this.country) : '') + (this.paymentType ? ('&paymentType=' + this.paymentType) : '') + (this.type ? ('&type=' + this.type) : '') +
      ((this.fromDate) ? ('&fromDate=' + this.fromDate) : '') + (this.twoDate ? ('&toDate=' + this.twoDate) : '')}`
    this.service.showSpinner();
    this.service.get(url).subscribe((res: any) => {
      console.log(res)
      this.service.hideSpinner();
      if (res.status == 200) {
        this.disputeList = res.data.list
        this.totalItems = res.data.totalCount;
      } else {
        this.disputeList = []
        this.totalItems = 0
      }
    }, err => {
      this.service.hideSpinner();
      console.log(err)
      this.disputeList = []
      this.totalItems = 0
    })
  }

  // search 
  search() {
    if (this.tradeStatus || this.country || this.paymentType || this.type || (this.twoDate || this.fromDate)) {
      this.getDisputeList()
    } else {
      console.log("Please select field for search.", this.tradeStatus)
    }
  }

  // reset search 
  reset() {
    if (this.tradeStatus || this.country || this.paymentType || this.type || (this.twoDate || this.fromDate)) {
      this.tradeStatus = ''
      this.country = ''
      this.paymentType = '';
      this.type = '';
      this.calender = { todate: '', fromdate: '' }
      this.twoDate = ''
      this.fromDate = ''
      this.getDisputeList()
    }
  }

  // pagination
  pagination(page) {
    this.currentPage = page;
    console.log(this.currentPage)
    this.getDisputeList()
  }

  // get country list
  getCountryList() {
    this.service.get('account/get-country-list').subscribe((res) => {
      if (res['status'] == 200) {
        this.countryList = res['data']
      }
    })
  }

  // nevigate to trade details
  navigate(tradeId) {
    this.router.navigate(['/dispute-trade-details', tradeId])
  }

  exportAsXLXS() {
    let dataArr = [];
    this.disputeList.forEach((element, ind) => {
      dataArr.push({
        'Trade ID': element.tradeId ? element.tradeId : 'N/A',
        'Dispute ID': element.disputeId ? element.disputeId : 'N/A',
        'Trade Date': element.creationTime ? this.datePipe.transform(element.creationTime) : 'N/A',
        'Dispute Date': element.disputeTime ? this.datePipe.transform(element.disputeTime) : 'N/A',
        'Dispute Status': element.disputeStatus ? element.disputeStatus : 'N/A',
        'Trade Amount': element.tradeAmount ? element.tradeAmount : 'N/A',
        'Staff Incharge': element.staffIncharge ? element.staffIncharge : 'N/A'

      })
    })
    this.service.exportAsExcelFile(dataArr, 'Dispute Management List')
  }

}
