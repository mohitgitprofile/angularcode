import { Component, OnInit } from '@angular/core';
import { MainService } from "../../../../index";
import { GlobalConstant } from '../../../../global/global.constant';

@Component({
  selector: 'app-comp-messages',
  templateUrl: './comp-messages.component.html',
  styleUrls: ['./comp-messages.component.css']
})
export class CompMessagesComponent implements OnInit {
  MessagesList: any = {docs: []};
  userDetails: any;
  list: any = { limitChangeArr: GlobalConstant.limitChangeArr };
  filter: any = { currPage: 1, limit: GlobalConstant.paginationLimit, limitChange: GlobalConstant.paginationLimit };
  competitionDetObj: any = { competitionId: '', competitionDetail: {}, compImage: '' };
  constructor(private service: MainService) {
    window.scrollTo(0, 0)
  }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.getMessagesListApi()
  }

  getMessagesListApi() {
    // console.log('get messages list api')
      let data = {organizerId: this.userDetails._id, page:this.filter.currPage, limit: this.filter.limit}
      this.service.postApi('chat/getMessages', data, 1).subscribe(responseList => {
        // console.log(JSON.stringify(responseList))
        let Response = responseList;
        if(Response['responseCode'] == 200) {
          this.MessagesList = Response[`result`]
        }
      })
  }

  onPageChange(pageNo) {
    this.filter.currPage = pageNo
    // this.filter.limitChange = 
    this.getMessagesListApi()
  }
  onChangeLimit() {
    // console.log( 'limit change => '+ this.filter.limitChange )
    this.filter.limit = Number(this.filter.limitChange)
    this.filter.currPage = 1
    this.getMessagesListApi()
  }
}
