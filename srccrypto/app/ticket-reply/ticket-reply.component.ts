import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-ticket-reply',
  templateUrl: './ticket-reply.component.html',
  styleUrls: ['./ticket-reply.component.css']
})
export class TicketReplyComponent implements OnInit {
  @ViewChild('scrollMe', { static: true }) private myScrollContainer: ElementRef
  obj: any = {}
  adminData: any;
  adminEmail: any;
  toEmail: any;
  currentDate: Date;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public service: ServiceService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      console.log(res);
      if (res.id) {
        this.toEmail = res.id
        console.log("to user email->", this.toEmail)
      }
    })
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
  }

  scrollToBottom(): void {
    setTimeout(() => {
      try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight
      } catch (err) { }
    }, 100)
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

}
