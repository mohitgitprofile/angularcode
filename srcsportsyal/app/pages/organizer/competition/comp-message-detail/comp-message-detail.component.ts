import { Component, OnInit } from '@angular/core';
import { Router, MainService } from "../../../../index";

@Component({
  selector: 'app-comp-message-detail',
  templateUrl: './comp-message-detail.component.html',
  styleUrls: ['./comp-message-detail.component.css']
})
export class CompMessageDetailComponent implements OnInit {
  Messages: any;
  userDetails: any;
  sendMessage: any;
  constructor(private router: Router, private service: MainService) { 
  }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.getMessagesListApi();
  }

  getMessagesListApi() {
    // console.log('get messages list api')
      let data = {organizerId: this.userDetails._id, playerId:this.router.url.split('/')[3] ,page:1, limit: 10}
      this.service.postApi('chat/getMessages', data, 1).subscribe(responseList => {
        let Response = responseList;
        if(Response['responseCode'] == 200) {
          this.Messages = Response[`result`].docs[0].message;
        }
      })
  }

  sendMessageApi() {
    if(this.sendMessage != null) {
      // console.log('send messages api')
      let data = {playerId:this.router.url.split('/')[3], organizerId:this.userDetails._id,message:{
      message:this.sendMessage,
      senderId:this.userDetails._id}
      }
        this.service.postApi('chat/sendMessage', data, 1).subscribe(responseList => {
          if(responseList['responseCode'] == 200) {
            this.getMessagesListApi();
            this.sendMessage = null;
          }
        })
    }
  }
}
