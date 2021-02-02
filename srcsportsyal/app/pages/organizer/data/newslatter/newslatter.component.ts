import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../providers/mainService.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalConstant } from '../../../../global/global.constant';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { VenueDetailComponent } from '../../../player/venue/venue-detail/venue-detail.component';

@Component({
  selector: 'app-newslatter',
  templateUrl: './newslatter.component.html',
  styleUrls: ['./newslatter.component.css']
})
export class NewslatterComponent implements OnInit {
  pdfdoc: any=[];
  pdflink: string;
  searchForm: FormGroup;
  filter: any = { currPage: 1, limit: GlobalConstant.paginationLimit, limitChange: GlobalConstant.paginationLimit };
  memberlist: any;
  venuelist: any;
  userid: any;
  membershipId: any;
  venueId: any;
  applyFilterForm: FormGroup;
  beDisable: boolean =true;
  emaillist: any=[];
  pageLimit: any;
  pageTotal: any;
  check:boolean=false;
  mailList: any=[];
  apiDoc: { "search": string; "page": any; "limit": number; "membershipId": any; "endDate": any; "startDate": any; "competitionId":any , "venueId":any;  };
  counter: number = 1;
  loginTypeArr: any=[];
  orgCompetitionList: any;
  competitionId: any;
  constructor(public service:MainService) { }

  ngOnInit() {
    this.userid = JSON.parse(localStorage.getItem('userDetailYala') );
    this.loginTypeArr = localStorage.getItem('LoginWith').split(',');  
    console.log("User Id--> ",this.userid._id);
    console.log("Checked--> ",this.check);
    this.formValidation();
    this.onDateChanged();
    this.organizerList();
    this.emailList('',this.filter.currPage,1);
  }
  /*************** form Validation *****************/
  formValidation(){
    this.searchForm = new FormGroup({
      'search':new FormControl('',),
       })
    this.applyFilterForm = new FormGroup({
      'startdate':new FormControl('',Validators.required),
      'enddate':new FormControl('',Validators.required),
       })
  }
 /*********************** Image Conversion/***********************/
 onUploadChange(evt: any) {
  this.pdfdoc = [] 
  console.log("Evt---> ",evt.target.files[0].name)
  const file = evt.target.files[0];
  this.pdflink = evt.target.files[0].name;
  if (file) {
    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
    // this.service.spinnerHide();
  }
}

handleReaderLoaded(e) {
  this.pdfdoc.push('data:image/png;base64,' + btoa(e.target.result)); 
 
  console.log("ARRay---> ",this.pdfdoc);
}
/*********************** Image Conversion/***********************/
/**************** Date managing***************/
public myDatePickerOptions: IMyDpOptions = { 
  dateFormat: 'yyyy-mm-dd', 
  editableDateField:false, 
  openSelectorOnInputClick:false,
  disableSince: {year: 0, month: 0, day: 0}
  };
 public toDate: IMyDpOptions = { 
      dateFormat: 'yyyy-mm-dd', 
      editableDateField:false, 
      openSelectorOnInputClick:false,
      disableUntil: {year: 0, month: 0, day: 0}
      };

  onDateChanged() {
    let d = new Date();
    let copy1 = this.getCopyOfOptions();
    copy1.disableSince = {year: d.getFullYear(), 
    month: d.getMonth() + 1, 
    day: d.getDate()};
    this.myDatePickerOptions = copy1;
    }
 //Returns copy of myDatePickerOptions
getCopyOfOptions(): IMyDpOptions {
  return JSON.parse(JSON.stringify(this.myDatePickerOptions));
  }


public onChange(event : IMyDateModel){
  // console.log(this.transantionForm.value)
  // console.log(event)
  if(event.formatted) {
      this.beDisable = false
    let d: Date = new Date(event.jsdate.getTime());
    d.setDate(d.getDate() -  1);
    let copy: IMyDpOptions = this.getCopyOfToDateOpt();
    copy.disableUntil = {year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    };
    this.toDate = copy;
  } else {
    this.beDisable = true
    // this.filter(3)

    this.applyFilterForm.patchValue({
      'to': null,
      'from': null
    })
    
  }
  
}
getCopyOfToDateOpt(): IMyDpOptions {
  return JSON.parse(JSON.stringify(this.toDate));
}
/*******************Date managing Ends Here**************/
/*********** Get Organizer List ****************/
organizerList(){
if(this.loginTypeArr.includes('COMPETITION')){
  this.service.getApi('data/selectCompition?userId=' + this.userid._id, 1).subscribe(responseList => {
    let Response = responseList;
    if (Response['responseCode'] == 200) {
      this.orgCompetitionList = Response[`result`]
      console.log("CompetitionList--->>>",JSON.stringify(this.orgCompetitionList));
    }
  })
}
if(this.loginTypeArr.includes('MEMBERSHIP')){
  var url = `membership/selectMembership?organizerId=`+this.userid._id;
  this.service.getApi(url,1).subscribe(response => {
   if(response.responseCode == 200) {
    // console.log(JSON.stringify(response));
    this.memberlist = response.result;
     console.log("member list--> ",this.memberlist);
   } else if(response.responseCode == 402) {
     
   }
 });
}
if(this.loginTypeArr.includes('VENUE')){
  var url = `data/selectVenue?userId=`+this.userid._id;
  this.service.getApi(url,1).subscribe(response => {
   if(response.responseCode == 200) {
    // console.log(JSON.stringify(response));
    this.venuelist = response.result;
  console.log("venue list--> ",this.venuelist);
   } else if(response.responseCode == 402) {
     
   }
 });
}  
}
// Get Competition Id Functionality 
getorganizerFunctionality(event){
  this.competitionId = event.target.value;
  var apiDoc = {
     "search":"",
     "page":this.filter.currPage,
     "limit":2,
     "membershipId":"",
     "competitionId":this.competitionId,
     "venueId":"",
     "endDate":"",
     "startDate":"",
    }
    console.log("Api Doc---->>> ",JSON.stringify(apiDoc));
    this.service.postApi(`data/newsletterPlayerList?organizerId=`+this.userid._id, apiDoc, 1).subscribe(response => {
     if(response.responseCode == 200) {
       console.log("Message---> ",JSON.stringify(response));
      var emailDetail = response.result;
      this.emaillist = emailDetail.docs;
       this.pageLimit = emailDetail.limit;
       this.pageTotal = emailDetail.total;
       // console.log("emailList---> ",this.emaillist[0]._id.email);
      }
       else if(response.responseCode == 402) {
       console.log("Message---> ",response.responseMessage);
     }
   })
}
/*********************** Get MembershipID ****************/
getMembershipId(event){
  this.membershipId = event.target.value;
 var apiDoc = {
    "search":"",
    "page":this.filter.currPage,
    "limit":2,
    "membershipId":this.membershipId,
    "competitionId":"",
    "venueId":"",
    "endDate":"",
    "startDate":"",
   }
   console.log("Api Doc---->>> ",JSON.stringify(apiDoc));
  }
/*********************** Get Venue Id ****************/
getVenueId(event){
  this.venueId = event.target.value
   var apiDoc = {
    "search":'',
    "page":this.filter.currPage,
    "limit":2,
    "membershipId":"",
    "competitionId":"",
    'venueId':this.venueId,
    "endDate":"",
    "startDate":"",
   }
   console.log("Api Doc---->>> ",JSON.stringify(apiDoc));
   this.service.postApi(`data/newsletterPlayerList?organizerId=`+this.userid._id, apiDoc, 1).subscribe(response => {
    if(response.responseCode == 200) {
      console.log("Message---> ",JSON.stringify(response));
     var emailDetail = response.result;
     this.emaillist = emailDetail.docs;
      this.pageLimit = emailDetail.limit;
      this.pageTotal = emailDetail.total;
      // console.log("emailList---> ",this.emaillist[0]._id.email);
     }
      else if(response.responseCode == 402) {
      console.log("Message---> ",response.responseMessage);
    }
  })
}
/*********************** Email List Functionality ***************/
emailList(formvalue,page,id){  
  console.log("Form Value ---> ",formvalue)
  this.filter.currPage = page;  
  if(id == 1){
    console.log("PAge--> ",this.filter.currPage);
   this.apiDoc = {
      "search":'',
      "page":this.filter.currPage,
      "limit":2,
      "competitionId":this.competitionId?this.competitionId:'',
      'venueId':this.venueId?this.venueId:'',
      "membershipId":this.membershipId?this.membershipId:"",
      "endDate":formvalue.startdate?formvalue.startdate.formatted:"",
      "startDate":formvalue.enddate?formvalue.enddate.formatted:"",
     }
     console.log("Api Doc---> ",JSON.stringify(this.apiDoc));
  }
  
  else if(id == 2){
    console.log("PAge--> ",this.filter.currPage);
   this.apiDoc = {
      "page":this.filter.currPage,
      "limit":2,
      "search":formvalue.search?formvalue.search:"",
      "competitionId":this.competitionId?this.competitionId:'',
      'venueId':this.venueId?this.venueId:'',
      "membershipId":this.membershipId?this.membershipId:"",
      "endDate":"",
      "startDate":"",
       }
  }
    console.log("Api Doc---> ",JSON.stringify(this.apiDoc));
this.service.postApi(`data/newsletterPlayerList?organizerId=`+this.userid._id, this.apiDoc, 1).subscribe(response => {
  if(response.responseCode == 200) {
    console.log("Message---> ",JSON.stringify(response));
   var emailDetail = response.result;
   this.emaillist = emailDetail.docs;
    this.pageLimit = emailDetail.limit;
    this.pageTotal = emailDetail.total;
    // console.log("emailList---> ",this.emaillist[0]._id.email);
   }
    else if(response.responseCode == 402) {
    console.log("Message---> ",response.responseMessage);
  }
})
}
/************** Select Functionality ************/
select(email){
  if(this.check){
    let mail = new FormData();
    // mail.append('attachement',this.pdflink)
    console.log("email----->>>>>",email);
    this.mailList.push(email);
    console.log("MailList---> ",this.mailList);
     mail.append('mailList',
     (this.mailList).toString());
     console.log("FormData----->>>>>",mail);
    //  this.service.postApi1(`data/sendMailToAll?organizerId=`+this.userid._id, mail, 1).subscribe(response => {
    //   if(response.responseCode == 200) {
    //     console.log("Message---> ",JSON.stringify(response.responseMessage));
      
    //     // console.log("emailList---> ",this.emaillist[0]._id.email);
    //    }
    //     else if(response.responseCode == 402) {
    //     console.log("Message---> ",response.responseMessage);
    //   }
    // })
  }
 
}
/************************** Select All ******************/
selectAll(){
  this.counter = 0;
  this.check = true
}
unselectAll(){
  this.counter = 1;
  this.check = false;
}
}
