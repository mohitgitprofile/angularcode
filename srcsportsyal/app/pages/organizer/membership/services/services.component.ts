import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../../../../providers/mainService.service';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { GlobalConstant } from '../../../../global/global.constant';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  currency:any
  addserviceForm: FormGroup;
  userid: any;
  memberlist: any;
 professionallist: any=[];
  venuelist: any;
  beDisable: boolean = true;
 timeslot:any=[];
  slot: any;
  endtime: any=[];
  filter: any = { currPage: 1, limit: GlobalConstant.paginationLimit };
  membershipId: any;
  serviceListForm: FormGroup;
  servicelist: any =[];
  pageLimit: any;
  dropdownSettings: any = GlobalConstant.multidropDownSettings
  pageTotal: any;
  weekOff:any=[{item_id:1,item_text:"Sunday"},
    {item_id:2,item_text:"Monday"},
    {item_id:3,item_text:"Tuseday"},
    {item_id:4,item_text:"Wednesday"},
    {item_id:5,item_text:"Thursday"},
    {item_id:6,item_text:"Friday"},
    {item_id:7,item_text:"Saturday"},]
  searchListForm: FormGroup;
  professionalArr: any =[];
  WeekoffArr: any =[];
  venueId: any;
  organizerName: any;
  hold: any;
  obj: any={};
  slotArray: any=[];
  startTime: any;
  endTime: any;
  editserviceForm: FormGroup;
  serviceId: any;
  serviceDetail: any={servicetype:'',membershipname:'',serviceName:'',professionals:'',venueName:'',
  startDate:'',endDate:'',duration:'',startDuration:'',endDuration:'',noOfPlayersPerSlot:'',amount:'',offDays:'',showStatus:'',description:''};
  formtype: any;
  serviceData: { "organizerId": any; "page": any; "limit": number; "status": any; "professionalId":any; "membershipName": any; "membershipId": any; "loginWith": string; "search": any; };
  amount: boolean = true;
  constructor(public service:MainService,public route: Router) { }

  ngOnInit() {
    this.currency= this.service.currencyLogo
    this.userid = JSON.parse(localStorage.getItem('userDetailYala') );
    console.log("User--> ",this.userid)
    console.log("User Id--> ",this.userid._id);
    this.formValidation();
    this.onDateChanged();
    this.getOrganizerName();
    this.memberList();
    this.professionalList();
    this.venueList();
    this.serviceList('',this.filter.currPage,1);
  }
formValidation(){
  this.addserviceForm = new FormGroup ({ 
     servicetype:new FormControl('',Validators.required),
     membershipname : new FormControl('',Validators.required),
     servicename: new FormControl('', [Validators.required ,Validators.pattern(/^[a-zA-Z\s]*$/)]),
     professional: new FormControl('',Validators.required),
     duration: new FormControl('',Validators.required),
     venue: new FormControl('',Validators.required),
     startdate:new FormControl('',Validators.required),
     enddate:new FormControl('',Validators.required),
     starttime:new FormControl('',Validators.required),
     endtime:new FormControl('',Validators.required),
     perslot:new FormControl('',[Validators.required,Validators.pattern(/^[0-9\s]*$/)]),
     amount:new FormControl('',[Validators.pattern(/^[0-9\s]*$/)]),
     weekoff:new FormControl('',Validators.required),
     status: new FormControl('', [Validators.required]),
     description:new FormControl('',Validators.required)
  });
  this.serviceListForm = new FormGroup ({ 
    status:new FormControl('',Validators.required),
    membershipname : new FormControl('',Validators.required),
    professionalname:new FormControl('',Validators.required)
    });
  this.searchListForm =   new FormGroup ({ 
    search:new FormControl('',),
     });
 this.editserviceForm = new FormGroup ({ 
      servicetype:new FormControl('',Validators.required),
      membershipname : new FormControl('',Validators.required),
      servicename: new FormControl('', [Validators.required ,Validators.pattern(/^[a-zA-Z\s]*$/)]),
      professional: new FormControl('',Validators.required),
      duration: new FormControl('',Validators.required),
      venue: new FormControl('',Validators.required),
      startdate:new FormControl('',Validators.required),
      enddate:new FormControl('',Validators.required),
      starttime:new FormControl('',Validators.required),
      endtime:new FormControl('',Validators.required),
      perslot:new FormControl('',[Validators.required,Validators.pattern(/^[0-9\s]*$/)]),
      amount:new FormControl('',[Validators.required,Validators.pattern(/^[0-9\s]*$/)]),
      weekoff:new FormControl('',Validators.required),
      status: new FormControl('', [Validators.required]),
      description:new FormControl('',Validators.required)
   });
}
/************* Get Organizer Name **************/
getOrganizerName(){
  var url = `users/getDetail?_id=`+this.userid._id;
  this.service.getApi(url,1).subscribe(response => {
   if(response.responseCode == 200) {
    console.log(JSON.stringify(response));
    this.organizerName = response.result.firstName;
    console.log("Organizer Name--> ",this.organizerName);
   } else if(response.responseCode == 402) {
     
   }
 });
}
/*************** Multiple select ************/
public onMouseDown(name:MouseEvent,id) {
  console.log("Multiple select===>  ",id," NAme--> "+name.target['label']);
  event.preventDefault();
  event.target['selected'] = !event.target['selected'];
 this.professionalArr.push({
  "professionalId":id,
  "professionalName":name.target['label']
}
);
 console.log("professionalArr===>  ",this.professionalArr);
}
public onweekend(weekoff:MouseEvent) {
  console.log("Weekoff--> "+weekoff.target['label']);
  event.preventDefault();
  event.target['selected'] = !event.target['selected'];
 this.WeekoffArr.push(weekoff.target['label']);
 console.log("professionalArr===>  ",this.WeekoffArr);
}
/*********** Get Membership List ****************/
memberList(){
  var url = `membership/selectMembership?organizerId=`+this.userid._id;
  this.service.getApi(url,1).subscribe(response => {
   if(response.responseCode == 200) {
    console.log(JSON.stringify(response));
    this.memberlist = response.result;
    console.log("member list--> ",this.memberlist);
   } else if(response.responseCode == 402) {
     
   }
 });
}
/*********** Get Professional List ****************/
professionalList(){
  var url = `membership/selectProfessional?organizerId=`+this.userid._id;
  this.service.getApi(url,1).subscribe(response => {
   if(response.responseCode == 200) {
    console.log(JSON.stringify(response));
    /**sportResponse['result'].map(item => {
          return { item_id: item._id, item_text: item.sportName }
        }) */
        this.professionallist = response.result.map(item => {
          return { item_id:item._id , item_text: item.professionalName }
        })
    // for(var i=0;i<response.result.length;i++){
    //   this.professionallist.push({'id':i,"professionalId":response.result[i]._id,"professionalName":response.result[i].professionalName});
    // }
   console.log("professional list--> ",this.professionallist);
   } else if(response.responseCode == 402) {
     
   }
 });
}
/*********** Get venue List ****************/
venueList(){
  var url = `data/selectVenue?userId=`+this.userid._id;
  this.service.getApi(url,1).subscribe(response => {
   if(response.responseCode == 200) {
    console.log(JSON.stringify(response));
    this.venuelist = response.result;
    console.log("venue list--> ",this.venuelist);
   } else if(response.responseCode == 402) {
     
   }
 });
}
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
    copy1.disableUntil = {year: d.getFullYear(), 
    month: d.getMonth() + 1, 
    day: d.getDate() - 1};
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

    this.addserviceForm.patchValue({
      'to': null,
      'from': null
    })
    
  }
  
}
getCopyOfToDateOpt(): IMyDpOptions {
  return JSON.parse(JSON.stringify(this.toDate));
}
/*******************Date managing Ends Here**************/
/************************** Dividing Time In  Slots Start ******************/
onchange(event){
console.log("Time------>",(event.target.value));
this.slot = event.target.value;
if(this.slot == '30'){
this.timeslot = [{'time':'9:00',id:1},{'time':'9:30',id:2},{'time':'10:00',id:3},{'time':'10:30',id:4},{'time':'11:00',id:5},{'time':'11:30',id:6},{'time':'12:00',id:7},{'time':'12:30',id:8},{'time':'13:00',id:9},{'time':'13:30',id:10},{'time':'14:00',id:11},{'time':'14:30',id:12},{'time':'15:00',id:13},{'time':'15:30',id:14},{'time':'16:00',id:15},{'time':'16:30',id:16},{'time':'17:00',id:17},{'time':'17:30',id:18},{'time':'18:00',id:19}];
}
else{
  this.timeslot = [{'time':'9:00',id:1},{'time':'10:00',id:2},{'time':'11:00',id:3},{'time':'12:00',id:4},{'time':'13:00',id:5},{'time':'14:00',id:6},{'time':'15:00',id:7},{'time':'16:00',id:8},{'time':'17:00',id:9},{'time':'18:00',id:10}];
}
console.log('Times Array---->',this.timeslot);
}
ontime(event){
  console.log("Start time----->",event.target.value);
  var start  = event.target.value
  var index = this.timeslot.findIndex( x=> x.time == start)
  console.log("Index of Start time----->",index);
 
  this.endtime = this.timeslot.filter(x => x.id > index)
   console.log("End Time Array--> ",this.endtime);
}
timeslotFun(start,end,perSlot,duration){ 
  console.log("Start Time-->  ",start+" End Time----> ",end+" No of Slot: ",perSlot+ "  Duration---> ",duration);
  var startTime = new Date(start).getTime();
  var endTime = new Date(end).getTime();
  console.log("Start Time-->  ",startTime+" End Time----> ",endTime);
var diff = endTime - startTime;
var Duration = Number(duration)
var chunks = [];
this.hold = startTime;
var threshold = (60 * Duration * 1000); //30minutes//60minutes
for (var i = (startTime + threshold); i <= endTime; i += (threshold)) {
var newEndTime = new Date(i);
chunks.push({
  start: new Date(this.hold),
  end: newEndTime
});
this.hold = newEndTime;
}
var times=[];
for (let i of chunks){
this.obj={'time':((i.start.getHours()<10 ? "0"+i.start.getHours() :i.start.getHours())+":"+(i.start.getMinutes()<10 ? "0"+i.start.getMinutes() : i.start.getMinutes())),'noOfSeats':perSlot};
times.push(this.obj);

}
return times;
}
/************************** Dividing Time In  Slots Ends ******************/
addserviceFunc(formvalue){
console.log("Formvalue----> ",JSON.stringify(formvalue));
this.professionalArr = formvalue.professional.map(item => {
  return { professionalId:item.item_id , professionalName: item.item_text}
})  
for(var i=0;i<formvalue.weekoff.length;i++){
  this.WeekoffArr.push(formvalue.weekoff[i].item_text);
} 
this.startTime = formvalue.startdate.formatted + " "+formvalue.starttime;
this.endTime = formvalue.startdate.formatted + " " + formvalue.endtime;
console.log("Start Time-->  ",this.startTime+" End Time----> ",this.endTime);
this.slotArray =  this.timeslotFun(this.startTime,this.endTime,formvalue.perslot,formvalue.duration);
console.log("Slot Array---> ",this.slotArray);
var addserviceData = {
	"organizerId":this.userid._id,
	"oragnizerName":this.organizerName,
	"membershipId":this.membershipId,
	"membershipName":formvalue.membershipname,
	"serviceName":formvalue.servicename,
	"amount":formvalue.amount,
	"duration":formvalue.duration,
	"professionals":this.professionalArr,
	"status":formvalue.status,
	"venueName":formvalue.venue,
	"venueId":this.venueId,
	"description":formvalue.description,
	"noOfPlayersPerSlot":formvalue.perslot,
	"serviceType":formvalue.servicetype,
	"offDays":this.WeekoffArr,
	"startDate":formvalue.startdate.formatted,
	"endDate":formvalue.enddate.formatted,
	"startDuration":formvalue.starttime,
	"endDuration":formvalue.endtime,
	"slots":this.slotArray
}
console.log("Formvalue----> ",JSON.stringify(addserviceData));
this.service.postApi(`membership/addService`, addserviceData, 1).subscribe(response => {
  if(response.responseCode == 200 ||response.responseCode == 201 ) {
    console.log("Message---> ",response.responseMessage);
    $('#addService').modal('hide');
    this.serviceList('formval',this.filter.currPage,1);
   }
    else if(response.responseCode == 402) {
    console.log("Message---> ",response.responseMessage);
  }
})
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
/*********************** Get Venue Id ****************/
getVenueId(event){
  console.log("VenueName-->  ",event.target.value);
  var venuename = event.target.value;
  for(var i= 0;i<this.venuelist.length;i++){
    console.log("venuename-->  ",venuename);
    if(this.venuelist[i].venue == venuename){
      this.venueId = this.venuelist[i]._id;
      console.log("Venue Id--> ",this.venueId);
    }
  }
}
/*********************** Get Service List ****************/
serviceList(formval,page,id){
  this.filter.currPage = page
  var apiData = formval;
  this.formtype = id;
  if(this.formtype == 1){
    this.serviceData= {	
      "organizerId":this.userid._id,
        "page":this.filter.currPage,
        "limit":4,
        "status":apiData.status?apiData.status:null,
        "membershipName":apiData.membershipname?apiData.membershipname:'',
       "membershipId":this.membershipId?this.membershipId:'',
      "loginWith":"WEBSITE",
      "professionalId":apiData.professionalname?apiData.professionalname:'',
        "search":null,
    }
  }
  else {
    this.serviceData= {	
      "organizerId":this.userid._id,
        "page":this.filter.currPage,
        "limit":4,
        "status":null,
        "membershipName":'',
       "membershipId":'',
      "loginWith":"WEBSITE",
      "professionalId":'',
        "search":apiData.search,
    }
  } 
  console.log("Api Doc---> ",JSON.stringify(this.serviceData));
  this.service.postApi(`membership/getListOfService`, this.serviceData, 1).subscribe(response => {
    if(response.responseCode == 200) {
     this.servicelist = response.result.docs;
     this.pageLimit = response.result.limit;
     this.pageTotal = response.result.total;
     }
      else if(response.responseCode == 402) {
      console.log("Message---> ",response.responseMessage);
    }
  })
    
}
/*********************** Get Particular Service Detail ****************/
getServiceDetail(id){
  this.serviceId = id;
  console.log("Service Id--> ",this.serviceId);
  var url = `membership/getAService?organizerId=`+this.userid._id+`&serviceId=`+this.serviceId;
  this.service.getApi(url,1).subscribe(response => {
   if(response.responseCode == 200) {
    console.log(JSON.stringify(response));
    this.serviceDetail = response.result;
  console.log("ProfessionalList----> ",this.serviceDetail);
    this.venueId = this.serviceDetail.venueId;
    $('#editService').modal('show');
   console.log("venue list--> ",this.serviceDetail);
   } else if(response.responseCode == 402) {
     
   }
 });
}
/******************* Edit Service Function ************/
editserviceFunc(formvalue){
  console.log("Edit Form Value ------> ",JSON.stringify(formvalue));
  this.professionalArr = formvalue.professional.map(item => {
    return { professionalId:item.item_id , professionalName: item.item_text}
  }) 
  var editData = {

    "serviceId":formvalue.servicename?this.serviceId:this.serviceDetail._id,
    "serviceName":formvalue.servicename?formvalue.servicename:this.serviceDetail.serviceName,
    "amount":formvalue.amount?formvalue.amount:this.serviceDetail.amount,
    "professionals":this.professionalArr,
    "status":formvalue.status?formvalue.status:this.serviceDetail.showStatus,
    "venueName":formvalue.venue?formvalue.venue:this.serviceDetail.venueName,
    "venueId":this.venueId,
    "description":formvalue.description?formvalue.description:this.serviceDetail.description
    
  }
  console.log("Edit Api Doc ---> ",JSON.stringify(editData));
  this.service.postApi(`membership/editService`, editData, 1).subscribe(response => {
    if(response.responseCode == 200) {
      console.log("Message---> ",response.responseMessage);
      $('#editService').modal('hide');
      this.serviceList('',this.filter.currPage,1);
     }
      else if(response.responseCode == 402) {
      console.log("Message---> ",response.responseMessage);
    }
  })
}
/********************* Publish Service **************/
publishFun(id){
  this.serviceId = id;
  var url = `membership/publishService?serviceId=`+this.serviceId;
  this.service.getApi(url,1).subscribe(response => {
   if(response.responseCode == 200) {
    console.log(response.responseMessage);
    this.serviceList('',this.filter.currPage,1);
     } else if(response.responseCode == 402) {
    console.log(response.responseMessage);
    this.serviceList('',this.filter.currPage,1);
   }
 });
}
/*********************** Unpublish Service ****************/
unpublishFun(id){
  this.serviceId = id;
  var url = `membership/publishService?serviceId=`+this.serviceId;
  this.service.getApi(url,1).subscribe(response => {
   if(response.responseCode == 200) {
    console.log(response.responseMessage);
    this.serviceList('',this.filter.currPage,1);
     } 
     else if(response.responseCode == 402) {
    console.log(response.responseMessage);
    this.serviceList('',this.filter.currPage,1);
   }
 });
}
// /************* Remove Amount Field ******************/
disappear(){
  this.amount = false;
}
appear(){
  this.amount = true;
}
}
