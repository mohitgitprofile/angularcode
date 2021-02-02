import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-trade-details',
  templateUrl: './trade-details.component.html',
  styleUrls: ['./trade-details.component.css']
})
export class TradeDetailsComponent implements OnInit {
  @ViewChild('scrollMe', { static: true }) private myScrollContainer: ElementRef
  tradeId: any;
  tradeDetails: any;
  chatHistory: any = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public service: ServiceService) {
    this.activatedRoute.params.subscribe((res) => {
      console.log(res);
      if (res.id) {
        this.tradeId = res.id
      }
    })
  }

  ngOnInit() {
    this.getTradeDetails();
  }

  scrollToBottom() {
    setTimeout(() => {
      try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight
      } catch (err) { }
    }, 100)
  }

  getTradeDetails() {
    this.service.showSpinner();
    this.service.get(`p2p-exchange/admin/get-trade-details-by-tradeid?tradeId=${this.tradeId}`).subscribe((res) => {
      console.log(res)
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.tradeDetails = res['data'].RESULT_LIST
        this.getChatHistory()
      }
    }, err => {
      this.service.hideSpinner()
    })
  }

  getChatHistory() {
    this.service.showSpinner();
    this.service.get(`notification/get-chat-data-for-admin?tradeId=${this.tradeId}`).subscribe((res) => {
      console.log(res)
      this.service.hideSpinner();
      if (res['status'] == 1620) {
        this.chatHistory = res['data']
        console.log(this.chatHistory)
        this.scrollToBottom()
      }
    }, err => {
      this.service.hideSpinner()
    })
  }

  openDispute() {
    this.service.showSpinner();
    this.service.get(`p2p-exchange/after-press-dispute-button?disputeStatus=Raised&tradeId=${this.tradeId}`).subscribe((res) => {
      console.log(res)
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.service.toasterSucc(res['message'])
        this.router.navigate['/trade-management']
      } else {
        this.service.toasterErr(res['message'])
      }
    }, err => {
      this.service.toasterErr(err['message'])
      this.service.hideSpinner()
    })
  }
}
