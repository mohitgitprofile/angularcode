import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.css']
})
export class TicketManagementComponent implements OnInit {
  minAge: Date;
  fromDate: any = ''
  twoDate: any = ''
  calender: any = { todate: '', fromdate: '' }
  searchByEmail: any = '';
  ticketStatus: any = '';

  ticketData: any = [];
  itemsPerPage = 5
  currentPage = 1
  totalItems: any

  constructor(private router: Router, public service: ServiceService, private datePipe: DatePipe) { }

  ngOnInit() {
    var today = new Date();
    var minAge = 0;
    this.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate())
    this.getTicketList()
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


  getTicketList() {
    let data = {
      "fromDate": this.fromDate,
      "page": this.currentPage - 1,
      "pageSize": this.itemsPerPage,
      "search": this.searchByEmail,
      "ticketStatus": this.ticketStatus,
      "toDate": this.twoDate
    }
    data = this.service.removeEmptyKey(data)
    console.log(data)
    this.service.showSpinner();
    this.service.post('static/search-and-filter-ticket-list', data).subscribe((res) => {
      console.log(res)
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.ticketData = res['data'].list
        this.totalItems = res['data'].size
        this.service.toasterSucc(res['message'])
      } else {
        this.ticketData = []
        this.totalItems = 0
        this.service.toasterErr(res['message'])
      }
    }, err => {
      console.log(err);
      this.ticketData = []
      this.totalItems = 0
      this.service.hideSpinner();
      this.service.toasterErr(err['message'])
    })
  }

  search() {
    if (this.ticketStatus || this.fromDate || this.twoDate || this.searchByEmail) {
      console.log("value get")
      this.getTicketList()
    } else {
      console.log("value not get")
    }
  }

  reset() {
    if (this.ticketStatus || this.fromDate || this.twoDate || this.searchByEmail) {
      console.log("value get")
      this.fromDate = ''
      this.twoDate = ''
      this.calender = { todate: '', fromdate: '' }
      this.searchByEmail = '';
      this.ticketStatus = '';
      this.getTicketList()
    } else {
      console.log("value not get")
    }
  }

  pagination(page) {
    this.currentPage = page
    this.getTicketList()
  }

  viewTicketDetails(ticketId) {
    console.log(ticketId)
    this.router.navigate(['/ticket-details', ticketId])
  }

  ticketReply(toEmail) {
    console.log(toEmail)
    this.router.navigate(['/ticket-reply', toEmail])
  }

  changeTicketStatus(ticketStatus, ticketId) {
    let data = {}
    this.service.post(`static/change-ticket-status?ticketId=${ticketId}&ticketStatus=${ticketStatus}`, data).subscribe((res) => {
      console.log(res);
      if (res['status'] == 200) {
        this.getTicketList()
      }
    })
  }

  exportAsXLXS() {
    let dataArr = [];
    this.ticketData.forEach((element, ind) => {
      dataArr.push({
        'Ticket ID': element.ticketId ? element.ticketId : 'N/A',
        'Subject': element.subject ? element.subject : 'N/A',
        'Request Date': element.createdAt ? this.datePipe.transform(element.createdAt) : 'N/A',
        'Customer Name': element.name ? element.name : 'N/A',
        'Customer Email': element.email ? element.email : 'N/A',
        'Status': element.ticketStatus ? element.ticketStatus : 'N/A'
      })
    })
    this.service.exportAsExcelFile(dataArr, 'Ticket Management List')
  }

}
