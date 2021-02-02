import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advertisement-management',
  templateUrl: './advertisement-management.component.html',
  styleUrls: ['./advertisement-management.component.css']
})
export class AdvertisementManagementComponent implements OnInit {
  fromDate: any = ''
  twoDate: any = ''
  calender: any = { todate: '', fromdate: '' }
  minAge: Date;

  advertisementData: any = []

  userId2: any = ''
  userName: any = ''
  paymentType: any = ''
  orderType: any = ''
  country: any = ''
  orderStatus: any = ''

  itemsPerPage: any = 5;
  currentPage: any = 1;
  totalItems: any;

  countryList: any = []

  constructor(public router: Router, public service: ServiceService) { }

  ngOnInit() {
    var today = new Date();
    var minAge = 0;
    this.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    this.getAdvertisement()
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

  // get country list
  getCountryList() {
    this.service.get('account/get-country-list').subscribe((res) => {
      if (res['status'] == 200) {
        this.countryList = res['data']
      }
    })
  }

  // get advertisement list
  getAdvertisement() {
    this.service.showSpinner()
    let url = `p2p-exchange/admin/search-and-filters-advertisement?page=${this.currentPage - 1}&pageSize=${this.itemsPerPage}${(this.userId2 ? ('&userId2=' + this.userId2) : '') + (this.userName ? ('&userName=' + this.userName) : '') +
      (this.fromDate ? ('&fromDate=' + this.fromDate) : '') + (this.twoDate ? ('&toDate=' + this.twoDate) : '') + (this.orderStatus ? ('&orderStatus=' + this.orderStatus) : '') + (this.country ? ('&country=' + this.country) : '') +
      (this.paymentType ? ('&paymentType=' + this.paymentType) : '') + (this.orderType ? ('&orderType=' + this.orderType) : '')}`
    this.service.get(url).subscribe((res) => {
      console.log(res);
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.service.toasterSucc(res['message'])
        this.advertisementData = res['data'].list
        this.totalItems = res['data'].totalCount
      } else {
        this.service.toasterErr(res['message'])
        this.advertisementData = [];
        this.totalItems = 0
      }
    }, err => {
      console.log(err)
      this.service.hideSpinner()
      this.service.toasterErr(err['message'])
      this.advertisementData = [];
      this.totalItems = 0
    })
  }

  // search advertisement
  search() {
    if (this.userId2 || this.userName || this.fromDate || this.twoDate || this.orderStatus || this.country || this.paymentType || this.orderType) {
      console.log("value get");
      this.getAdvertisement()
    } else {
      console.log("empty clicked")
    }
  }

  // reset search fields
  reset() {
    if (this.userId2 || this.userName || this.fromDate || this.twoDate || this.orderStatus || this.country || this.paymentType || this.orderType) {
      console.log("value get");
      this.userId2 = ''
      this.userName = ''
      this.fromDate = ''
      this.twoDate = ''
      this.calender = { todate: '', fromdate: '' }
      this.orderStatus = ''
      this.country = ''
      this.paymentType = ''
      this.orderType = ''
      this.getAdvertisement()
    } else {
      console.log("empty clicked")
    }
  }

  // pagination
  pagination(page) {
    console.log(page)
    this.currentPage = page
    this.getAdvertisement()
  }

  // navigate to advertisement details page
  navigate(peerToPeerExchangeId) {
    this.router.navigate(['/advertisement-details', peerToPeerExchangeId])
  }
}
