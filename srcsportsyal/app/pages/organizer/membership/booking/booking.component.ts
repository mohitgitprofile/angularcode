import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../providers/mainService.service';
import { GlobalConstant } from '../../../../global/global.constant';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
filter: any = { currPage: 1, limit: GlobalConstant.paginationLimit };
  userid: any;
  serviceListForm: FormGroup;
  searchListForm: FormGroup;
  memberlist: any={};
  membershipId: any;
  bookingList: any =[];
  pageLimit: any;
  pageTotal: any;
  bookingid: any;
  constructor(public service:MainService) { 

  }

  ngOnInit() {
    this.userid = JSON.parse(localStorage.getItem('userDetailYala') );
    console.log("User--> ",this.userid)
    console.log("User Id--> ",this.userid._id);
    this.formValidation();
    this.memberList();
    this.getBookingList('',this.filter.currPage);
  }
/******************** Form Validation ****************/
formValidation(){
   this.searchListForm =   new FormGroup ({ 
     membershipname : new FormControl('',Validators.required),
    search:new FormControl('',),
   });
}
/**************************** Get List of Booking ******************/
getBookingList(formval,page){
  this.filter.currPage = page
  var apiData = formval;
  var serviceData = {	
    "organizerId":this.userid._id,
      "page":this.filter.currPage,
      "limit":4,
      "type":"booking",
      "loginWith":"Website",
     "membershipName":apiData.membershipname?apiData.membershipname:'',
      "search":apiData.search?apiData.search:'',
  }
  console.log("Api Doc---> ",JSON.stringify(serviceData));
  this.service.postApi(`membership/getBookingList`, serviceData, 1).subscribe(response => {
    if(response.responseCode == 200) {
      console.log("Message---> ",response.responseMessage);
      var bookingData = response.result;
      this.bookingList =  bookingData.docs;
      this.pageLimit = bookingData.limit;
      this.pageTotal = bookingData.total;
     }
      else if(response.responseCode == 402) {
      console.log("Message---> ",response.responseMessage);
    }
  })
}
/************************* MemberShip List ***************************/
memberList(){
  var url = `membership/selectMembership?organizerId=`+this.userid._id;
  this.service.getApi(url,1).subscribe(response => {
   if(response.responseCode == 200) {
    this.memberlist = response.result;
    console.log("member list--> ",this.memberlist);
   } else if(response.responseCode == 402) {
     
   }
 });
}
/*********************** Get MembershipID ****************/
getMembershipId(event){
  console.log("MememberName-->  ",event.target.value);
  var membershipname = event.target.value;
  for(var i= 0;i<this.memberlist.length;i++){
    console.log("MememberName-->  ",membershipname);
    if(this.memberlist[i].membershipName == membershipname){
      this.membershipId = this.memberlist[i]._id;
      console.log("Membership Id--> ",this.membershipId);
    }
  }
}
/************************* Change Status **************/
changeStatus(event,id,payment){
  console.log("Status ---> ",event.target.value);
  console.log("Id ---> ",id," Payment--> "+payment);
  var statusData = 
  {
    "bookingId":id,
    "paymentMethod":payment,
    "status":event.target.value
  }
  console.log("Status Data -->  ",JSON.stringify(statusData));
  this.service.postApi(`membership/changeBookingStatus`, statusData, 1).subscribe(response => {
    if(response.responseCode == 200) {
      console.log("Message---> ",response.responseMessage);
      this.getBookingList('',this.filter.currPage);
     }
      else if(response.responseCode == 402) {
      console.log("Message---> ",response.responseMessage);
      this.getBookingList('',this.filter.currPage);
    }
  })
}
/********************** Delete From Booking List **************/
delete(id){
  this.bookingid = id;
  $('#delete').modal('show');  
}
deleteBookingList(){
  var url = `membership/deletePlayerfromList?listId=`+this.bookingid+`&type=booking`;
  this.service.getApi(url,1).subscribe(response => {
   if(response.responseCode == 204) {
     $('#delete').modal('hide');
    this.getBookingList('',this.filter.currPage);
    console.log("Message---> ",response.responseMessage);
      } else if(response.responseCode == 402) {
        this.getBookingList('',this.filter.currPage);
        console.log("Message---> ",response.responseMessage);
   }
 });
}
}
