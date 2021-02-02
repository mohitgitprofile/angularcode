import { Component, OnInit, MainService, ActivatedRoute, FormGroup, Validators, FormBuilder } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

declare var $: any
declare var window: any

@Component({
  selector: 'app-venue-booking',
  templateUrl: './venue-booking.component.html',
  styleUrls: ['./venue-booking.component.css']
})
export class VenueBookingComponent implements OnInit {
  // filterFromDate: any = "";
  // filterToDate: any = "";
  currDate: number;
  currMonth: number;
  currYear: number;
  todayDate: Date;
  fromDate: any = "";
  toDate: any = "";
  bookingDate: any = "";
  venueStatus: any = 'all';
  bookingData: any = {};
  currTab = 'booking'
  bookingId: any;
  bookingList: any = { result: [] };
  venueList: any = [];
  organizerId: any;
  currency: any;
  venueId: any = "";
  userDetail: any = {};
  venueDetail: any = {};
  bookingStatus: any = [];
  page: any = { currPage: 1, limit: GlobalConstant.paginationLimit, search: '', limitChangeArr: GlobalConstant.limitChangeArr, entryLimit: GlobalConstant.limitChangeArr[0] };
  constructor(private service: MainService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.userDetail = JSON.parse(this.service.getStorage('userDetailYala'))
    this.currency = this.service.currencyLogo
  }
  public myDatePickerOptions: IMyDpOptions = {
  };
  ngOnInit() {
    this.getVenueListApi();
    this.getBookingListApi();
  }

  /*********************************************** API INTEGRATION TO GET VENUE LIST ********************************************/
  getVenueListApi() {
    this.service.getApi('venue/getVenueWithoutPagination?organizerId=' + this.userDetail._id, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.venueList = response.result
      }
    })
  }
  /**************************************************************** END *********************************************************/

  getVenueDetail() {
    let venueData = {
      "playerId": this.userDetail._id
    }
    this.service.postApi('venue/getDetailOfAVenue?venueId=' + this.venueId, venueData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.venueDetail = response.result
      }
    })
  }

  /*********************************************** API INTEGRATION TO GET BOOKING LIST ********************************************/
  getBookingListApi() {
    let bookingData = {
      "organizerId": this.userDetail._id,
      "venueId": this.venueId,
      "page": this.page.currPage,
      "limit": this.page.limit,
      "search": this.page.search,
      "bookingStatus": this.bookingStatus,
      "fromDate": this.fromDate,
      "toDate": this.toDate
    }
    this.service.postApi('venue/getBookingList', bookingData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.bookingList = response.result
      }
    })
  }
  /**************************************************************** END *********************************************************/

  onVenueSelect() {
    this.page.currPage = 1
    this.getBookingListApi();
  }

  onPageChange(pageNo) {
    this.page.currPage = pageNo;
    this.getBookingListApi()
  }

  onLimitChange() {
    this.page.currPage = 1
    this.page.limit = Number(this.page.entryLimit);
    this.getBookingListApi()
  }

  onSearch(val, event) {
    this.page.currPage = 1
    if (val === 1) {
      if (!this.page.search || event.keyCode == 13)
        this.getBookingListApi()
    } else if (val === 2)
      this.getBookingListApi()
  }

  statusFilterFun() {
    this.bookingStatus = []
    this.page.currPage = 1
    if (this.venueStatus != 'all') {
      this.bookingStatus.push(this.venueStatus)
    }
    this.getBookingListApi()
  }

  changeTabFunc(val) {
    this.currTab = val
    this.page.currPage = 1
    if (this.currTab == 'booking') {
      this.bookingStatus = []
      this.getBookingListApi()
    } else if (this.currTab == 'invoices') {
      this.bookingStatus = ['confirmed', 'Cancelled']
      this.getBookingListApi()
    } else {
      this.todayDate = new Date()
      this.currYear = this.todayDate.getFullYear()
      this.currMonth = this.todayDate.getMonth() + 1
      this.currDate = this.todayDate.getDate()
      this.fromDate = '';
      this.toDate = '';
      this.getBookingListApi()
    }
  }

  getCopyOfOptions(): IMyDpOptions {
    return JSON.parse(JSON.stringify(this.myDatePickerOptions));
  }

  fromDateSelect(e) {
    this.fromDate = e
    this.toDate = e
    let copy1 = this.getCopyOfOptions();
    copy1.disableUntil = { year: this.fromDate.date.year, month: this.fromDate.date.month, day: this.fromDate.date.day }
    this.myDatePickerOptions = copy1;
  }

  // *************************************** FILTER INVOICES BY DATE/PERIOD *************************************** //

  filterByToFromDate() {
    if (this.toDate.date) {
      this.toDate = this.toDate.date.year + '-' + ("0" + this.toDate.date.month).slice(-2) + '-' + this.toDate.date.day;
    }
    if (this.fromDate.date) {
      this.fromDate = this.fromDate.date.year + '-' + ("0" + this.fromDate.date.month).slice(-2) + '-' + this.fromDate.date.day;
    }
    this.getBookingListApi()
  }

  filterBydate() {
    this.page.currPage = 1;
    console.log(this.bookingDate)
    if (this.bookingDate == '') {
      this.fromDate = '';
      this.toDate = '';
    } else if (this.bookingDate == 'Today') {
      this.fromDate = this.currYear + '-' + ("0" + (new Date(this.currMonth).getMonth() + 1)).slice(-2) + '-' + this.currDate;
      this.toDate = this.currYear + '-' + ("0" + (new Date(this.currMonth).getMonth() + 1)).slice(-2) + '-' + this.currDate;
    } else if (this.bookingDate == 'Tomorrow') {
      this.fromDate = this.currYear + '-' + ("0" + (new Date(this.currMonth).getMonth() + 1)).slice(-2) + '-' + (this.currDate + 1);
      this.toDate = this.currYear + '-' + ("0" + (new Date(this.currMonth).getMonth() + 1)).slice(-2) + '-' + (this.currDate + 1);
    } else if (this.bookingDate == 'This week') {
      let curr = new Date;
      let first = curr.getDate() - curr.getDay();
      let last = first + 6;
      let firstday = new Date(curr.setDate(first)).toISOString();
      let lastday = new Date(curr.setDate(last)).toISOString();
      let monthtst = ("0" + (new Date(firstday).getMonth() + 1)).slice(-2)
      this.fromDate = new Date(firstday).getFullYear() + '-' + ("0" + (new Date(firstday).getMonth() + 1)).slice(-2) + '-' + new Date(firstday).getDate()
      this.toDate = new Date(lastday).getFullYear() + '-' + ("0" + (new Date(lastday).getMonth() + 1)).slice(-2) + '-' + new Date(lastday).getDate()
    } else if (this.bookingDate == 'Next week') {
      let curr = new Date;
      let first = curr.getDate() - curr.getDay();
      let nextWeekStart = first + 7;
      let nextWeekEnd = nextWeekStart + 6
      let nextWeekStartday = new Date(curr.setDate(nextWeekStart)).toISOString();
      let nextWeekEndDay = new Date(curr.setDate(nextWeekEnd)).toISOString();
      this.fromDate = new Date(nextWeekStartday).getFullYear() + '-' + ("0" + (new Date(nextWeekStartday).getMonth() + 1)).slice(-2) + '-' + new Date(nextWeekStartday).getDate()
      this.toDate = new Date(nextWeekEndDay).getFullYear() + '-' + ("0" + (new Date(nextWeekEndDay).getMonth() + 1)).slice(-2) + '-' + new Date(nextWeekEndDay).getDate()
    } else if (this.bookingDate == 'This month') {
      let date = new Date();
      let firstDayCurrMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      let lastDayCurrMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.fromDate = new Date(firstDayCurrMonth).getFullYear() + '-' + ("0" + (new Date(firstDayCurrMonth).getMonth() + 1)).slice(-2) + '-' + new Date(firstDayCurrMonth).getDate()
      this.toDate = new Date(lastDayCurrMonth).getFullYear() + '-' + ("0" + (new Date(lastDayCurrMonth).getMonth() + 1)).slice(-2) + '-' + new Date(lastDayCurrMonth).getDate()
    } else if (this.bookingDate == 'Next month') {
      let date = new Date();
      let firstDayNextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      let lastDayNextMonth = new Date(date.getFullYear(), date.getMonth() + 2, 0);
      this.fromDate = new Date(firstDayNextMonth).getFullYear() + '-' + ("0" + (new Date(firstDayNextMonth).getMonth() + 1)).slice(-2) + '-' + new Date(firstDayNextMonth).getDate()
      this.toDate = new Date(lastDayNextMonth).getFullYear() + '-' + ("0" + (new Date(lastDayNextMonth).getMonth() + 1)).slice(-2) + '-' + new Date(lastDayNextMonth).getDate()
    }
    this.getBookingListApi()
  }
  // *************************************************** END ******************************************************** //

  deleteBookingModal(currId) {
    this.bookingId = currId
    $(`#delete-booking-modal`).modal({ backdrop: 'static' })
  }

  // ********************************* Delete Store on modal ******************************************************* //
  onDeleteBooking() {
    this.service.getApi('venue/deleteBookingList?bookingId=' + this.bookingId + '&type=bookingList', 1).subscribe(response => {
      if (response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage)
        $(`#delete-booking-modal`).modal('hide')
        this.getBookingListApi()
      }
    })
  }
  // *************************************************** END ******************************************************** //


  editBookingModal(data) {
    this.bookingData = data
    $(`#changeStatus-booking-modal`).modal({ backdrop: 'static' })
  }

  // ********************************* Delete Store on modal******************************************************* //
  onEditBookingStatus() {
    this.service.getApi('venue/deleteBookingList?bookingId=' + this.bookingId + '&type=bookingList', 1).subscribe(response => {
      if (response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage)
        $(`#changeStatus-booking-modal`).modal('hide')
        this.getBookingListApi()
      }
    })
  }
  // *************************************************** END ******************************************************** //


  // ********************************************* Print Function *************************************************** //
  print() {
    window.print();
  }

  // **********************************************  EXPORT TO CSV  ************************************************* //
  exportToCSV() {

    var data = [
      {
        orderNumber: 'Order Number',
        venueName: 'Venue name',
        sportsName: 'Sports Name',
        bookingDate: 'Booking Date',
        customerDetails: 'Customer Details',
        amount: 'Amount',
        status: 'Status'
      }
    ];

    for (let i = 0; i < this.bookingList.result.length; i++) {
      data.push({
        orderNumber: this.bookingList.result[i]._id,
        venueName: this.bookingList.result[i].venueName,
        sportsName: this.bookingList.result[i].sportName,
        bookingDate: this.bookingList.result[i].bookingDate,
        customerDetails: this.bookingList.result[i].playerId[0].firstName,
        amount: this.bookingList.result[i].totalAmount,
        status: this.bookingList.result[i].status
      })
    }

    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
      noDownload: true,
      headers: ["FirstName", "LastName", "UserID"]
    };

    new Angular5Csv(data, 'Invoice Report');
  }
  // *************************************************** END ******************************************************** //



}
