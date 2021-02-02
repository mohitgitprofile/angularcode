import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../providers/mainService.service';
import { Router } from '@angular/router';
import { GlobalConstant } from '../../../../global/global.constant';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-membercard',
  templateUrl: './membercard.component.html',
  styleUrls: ['./membercard.component.css']
})
export class MembercardComponent implements OnInit {
  userid: any;
  filter: any = { currPage: 1, limit: GlobalConstant.paginationLimit };
  membercardList: any=[];
  pageLimit: any;
  pageTotal: any;
  searchForm: FormGroup;
  membercardId: any;
  constructor(public service:MainService, public routes: Router) { }

  ngOnInit() {
    this.userid = JSON.parse(localStorage.getItem('userDetailYala') );
    console.log("User--> ",this.userid)
    console.log("User Id--> ",this.userid._id);
    this.formvalidation();
    this.getMemberCardList('',this.filter.currPage);
  }
  formvalidation(){
    this.searchForm = new FormGroup({
      searchname: new FormControl('',)
    })
  }
/****************************** Get List of Member Card *************/
getMemberCardList(formvalue,page){
  this.filter.currPage = page;
  var formData =formvalue
var memberCardData = {	
  "organizerId":this.userid._id,
  "type":"membercard",
  "search":formData.searchname?formData.searchname:'',
    "page":this.filter.currPage,
    "limit":4
  }
  console.log("Member Card Data---> ",JSON.stringify(memberCardData))
  this.service.postApi(`membership/getBookingList`, memberCardData, 1).subscribe(response => {
    console.log("Request---> ",JSON.stringify(response));
    if(response.responseCode == 200) {
     console.log("Message---> ",response.responseMessage);
     var memberCardDetail = response.result;
     this.membercardList = memberCardDetail.docs;
     this.pageLimit = memberCardDetail.limit;
     this.pageTotal = memberCardDetail.total
    } else if(response.responseCode == 402) {
      console.log("Message---> ",response.responseMessage);
    }
  })
}
/***************************** Send As PDF Api **********************/
send(id){
  this.membercardId = id;
  $('#send').modal('show')
}
sendApi(){
  var url = `membership/sendPdfToPlayer?_id=`+this.membercardId;
  this.service.getApi(url,1).subscribe(response => {
   if(response.responseCode == 200) {
    this.getMemberCardList('',this.filter.currPage);
    $('#send').modal('hide');
   } else if(response.responseCode == 402) {
     
   }
 });
}
/****************************** Delete Player *************************/
delete(id){
  this.membercardId = id;
  $('#delete').modal('show')
}
deleteApi(){
  var url = `membership/deletePlayerfromList?listId=`+this.membercardId+`&type=memberCard`;
  this.service.getApi(url,1).subscribe(response => {
   if(response.responseCode == 204) {
    console.log(JSON.stringify(response));
    this.getMemberCardList('',this.filter.currPage);
    $('#delete').modal('hide');
   } else if(response.responseCode == 402) {
     
   }
 });
}
}
