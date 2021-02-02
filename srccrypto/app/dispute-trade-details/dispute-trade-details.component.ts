import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-dispute-trade-details',
  templateUrl: './dispute-trade-details.component.html',
  styleUrls: ['./dispute-trade-details.component.css']
})
export class DisputeTradeDetailsComponent implements OnInit {
  @ViewChild('scrollMe', { static: true }) private myScrollContainer: ElementRef
  tradeId: any;
  obj: any = {}
  tradeDetails: any;
  toEmail: string;
  adminData: any;
  adminEmail: any;
  currentDate: Date;
  buyerSeller: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public service: ServiceService) {
    this.activatedRoute.params.subscribe((res) => {
      console.log(res);
      if (res.id) {
        this.tradeId = res.id
      }
    })
  }

  ngOnInit() {
    this.adminEmail="mohitcryptocurrency@mailinator.com";
    // this.activatedRoute.params.subscribe((res) => {
    //   console.log(res);
    //   if (res.id) {
    //     this.toEmail = 'ds123@mailinator.com'
    //     console.log("to user email->", this.toEmail)
    //   }
    // })
    this.scrollToBottom();
    this.service.supportChatArr = [];
    this.adminData = JSON.parse(localStorage.getItem('data'));
    this.adminEmail = this.adminData.email;
    console.log("admin email->", this.adminEmail);
    console.log(this.service.supportChatArr);
    this.currentDate = new Date();
    console.log(this.currentDate);
    this.chatHistory();
    this.service.getMessage().subscribe(res => {
      this.scrollToBottom();
    })
    this.getTradeDetails();
  }

  scrollToBottom() {
    setTimeout(() => {
      try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight
      } catch (err) { }
    }, 10)
  }

  chatHistory() {
    this.service.showSpinner()
    this.service.get(`notification/get-support-chat-data?toUsername=${this.toEmail}`).subscribe((res) => {
      console.log(res);
      this.service.hideSpinner()
      if (res['status'] == 1620) {
        let data = res['data']
        this.service.supportChatArr = data
        this.scrollToBottom()
      }
    }, err=>{
      this.service.hideSpinner()
    })
  }

  getTradeDetails() {
    this.service.showSpinner();
    this.service.get(`p2p-exchange/admin/get-trade-details-by-tradeid?tradeId=${this.tradeId}`).subscribe((res) => {
      console.log(res)
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.tradeDetails = res['data'].RESULT_LIST
        this.buyerSeller = res['data'].RESULT_LIST.type
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
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.service.toasterSucc(res['message'])
        this.router.navigate(['/dispute-management'])
      } else {
        this.service.toasterErr(res['message'])
      }
    }, err => {
      this.service.toasterErr(err['message'])
      this.service.hideSpinner()
    })
  }
  
  sendChat() {
    console.log("send chat clicked");
    if (this.obj.chat) {
      let data = {
        "fromEmail": this.adminEmail,
        "topic": "SUPPORT",
        "message": this.obj.chat
      }
      console.log("send chat data->", data)
      this.service.wsSupportChat.send(JSON.stringify(data))
        this.service.supportChatArr.push(data)
      this.obj.chat = ''
    }
  }

  releaseForDetails() {
    this.service.showSpinner();
    this.service.post(`/p2p-exchange/admin/release-bitcoins-by-admin?tradeId=${this.tradeId}`,'').subscribe((res) => {
      console.log(res)
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.tradeDetails = res['data'].RESULT_LIST
        // this.getChatHistory()
        this.service.toasterSucc(res['message'])
      }
      else {
        this.service.toasterSucc(res['message'])
      }
    }, err => {
      this.service.hideSpinner()
    })
  }
}



