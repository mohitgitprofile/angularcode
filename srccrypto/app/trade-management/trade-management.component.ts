import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-trade-management',
  templateUrl: './trade-management.component.html',
  styleUrls: ['./trade-management.component.css']
})
export class TradeManagementComponent implements OnInit {
  fromDate: any = ''
  twoDate: any = ''
  calender: any = { todate: '', formdate: '' }
  minAge: Date;
  tradeStatus: any = ''
  country: any = ''
  paymentType: any = '';
  type: any = '';
  tradeList: any = [];
  itemsPerPage: number = 5;
  currentPage: number = 1
  totalItems: number;
  countryList: any = [];

  constructor(private router: Router, public service: ServiceService) { }

  ngOnInit() {
    var today = new Date();
    var minAge = 0;
    this.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    this.getTradeList()
    this.getCountryList()
  }

  formdate() {
    this.fromDate = new Date(this.calender.formdate)
    this.fromDate = this.fromDate.getTime()
  }
  todate() {
    this.twoDate = new Date(this.calender.todate)
    this.twoDate = this.twoDate.getTime()
  }

  // get trade list 
  getTradeList() {
    let url = `p2p-exchange/search-and-filters-trade-list?page=${this.currentPage - 1}&pageSize=${this.itemsPerPage}${(this.tradeStatus ? ('&tradeStatus=' + this.tradeStatus) : '')
      + (this.country ? ('&country=' + this.country) : '') + (this.paymentType ? ('&paymentType=' + this.paymentType) : '') + (this.type ? ('&type=' + this.type) : '') +
      ((this.fromDate) ? ('&fromDate=' + this.fromDate) : '') + (this.twoDate ? ('&toDate=' + this.twoDate) : '')}`
    this.service.showSpinner();
    this.service.get(url).subscribe((res: any) => {
      this.service.hideSpinner();
      if (res.status == 200) {
        this.tradeList = res.data.list
        this.totalItems = res.data.totalCount;
      } else {
        this.tradeList = []
        this.totalItems = 0
      }
    }, err => {
      this.service.hideSpinner();
      console.log(err)
      this.tradeList = []
      this.totalItems = 0
    })
  }

  // search 
  search() {
    if (this.tradeStatus || this.country || this.paymentType || this.type || (this.twoDate || this.fromDate)) {
      this.getTradeList()
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
      this.calender = { todate: '', formdate: '' }
      this.twoDate = ''
      this.fromDate = ''
      this.getTradeList()
    }
  }

  // pagination
  pagination(page) {
    this.currentPage = page;
    console.log(this.currentPage)
    this.getTradeList()
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
    this.router.navigate(['/trade-details', tradeId])
  }

}
