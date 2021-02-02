import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../../../../providers/mainService.service';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  filterForm: FormGroup;
  userid: any;
  memberList: any=[];
  membershipname: any;
  membershipId: any;
  servicelist: any=[];
  servicename: any;
  serviceId: any;
  show:boolean = false;
  disable: boolean = true;
  evaluationList: any=[];
  searchYear: any;
  searchMonth: any;
  playerId: any;
  evaluate: any = {};
  evaluateForm: FormGroup;
  constructor(public service: MainService) { }

  ngOnInit() {
    this.userid = JSON.parse(localStorage.getItem('userDetailYala') );
    console.log("User--> ",this.userid)
    console.log("User Id--> ",this.userid._id);
    this.formValidation();
    this.membershipListApi();
  }
formValidation(){
  this.filterForm = new FormGroup({
    'membershipName':new FormControl('',Validators.required),
    'serviceName':new FormControl('',Validators.required),
    'playerName':new FormControl('',Validators.required),
    'serviceDate':new FormControl('',Validators.required)
  });
  this.evaluateForm = new FormGroup({
    'bad':new FormControl('',[Validators.pattern(/^(?=.*[1-9])\d+(\.\d{1,50})?$/)]),
    'pass':new FormControl('',[Validators.pattern(/^(?=.*[1-9])\d+(\.\d{1,50})?$/)]),
    'shooting':new FormControl('',[Validators.pattern(/^(?=.*[1-9])\d+(\.\d{1,50})?$/)]),
    'strenght':new FormControl('',[Validators.pattern(/^(?=.*[1-9])\d+(\.\d{1,50})?$/)]),
    'speed':new FormControl('',[Validators.pattern(/^(?=.*[1-9])\d+(\.\d{1,50})?$/)]),
    'flexibility':new FormControl('',[Validators.pattern(/^(?=.*[1-9])\d+(\.\d{1,50})?$/)]),
    'decision':new FormControl('',[Validators.pattern(/^(?=.*[1-9])\d+(\.\d{1,50})?$/)]),
    'offensive':new FormControl('',[Validators.pattern(/^(?=.*[1-9])\d+(\.\d{1,50})?$/)]),
    'concentration':new FormControl('',[Validators.pattern(/^(?=.*[1-9])\d+(\.\d{1,50})?$/)]),
    'competitivenedd':new FormControl('',[Validators.pattern(/^(?=.*[1-9])\d+(\.\d{1,50})?$/)]),
    'selfConfidence':new FormControl('',[Validators.pattern(/^(?=.*[1-9])\d+(\.\d{1,50})?$/)]),
    'avg':new FormControl('',[Validators.pattern(/^(?=.*[1-9])\d+(\.\d{1,50})?$/)])
  })
}
/*********** Get MemberShip List Api *********/
membershipListApi(){
  var url = `membership/selectMembership?organizerId=`+this.userid._id;
  this.service.getApi(url,1).subscribe(response => {
   if(response.responseCode == 200) {
   // console.log(JSON.stringify(response));
    this.memberList = response.result;
    console.log("Memember list--> ",this.memberList);
   } else if(response.responseCode == 402) {
     
   }
 });
}
/*********************** Get MembershipID ****************/
getMembershipId(event){
  console.log("MememberName-->  ",event.target.value);
 this.membershipname = event.target.value;
  for(var i= 0;i<this.memberList.length;i++){
    console.log("MememberName-->  ",this.membershipname);
    if(this.memberList[i].membershipName == this.membershipname){
      this.membershipId = this.memberList[i]._id;
      this.getServiceList();
      console.log("Membership Id--> ",this.membershipId);
    }
  }
}
/************************** Get List Of Service of Particular Membership *****************/
getServiceList(){
  var url = `membership/selectService?organizerId=`+this.userid._id+`&membershipId=`+this.membershipId;
  this.service.getApi(url,1).subscribe(response => {
   if(response.responseCode == 200) {
    console.log(JSON.stringify(response));
    this.servicelist = response.result;
    console.log("member list--> ",this.servicelist);
   } else if(response.responseCode == 402) {
     
   }
 });
}
/************************* Get Service Id *****************/
getServiceId(event){
  console.log("MememberName-->  ",event.target.value);
this.servicename = event.target.value;
  for(var i= 0;i<this.servicelist.length;i++){
    console.log("MememberName-->  ",this.servicename);
    if(this.servicelist[i].serviceName == this.servicename){
      this.serviceId = this.servicelist[i]._id;
      console.log("Membership Id--> ",this.serviceId);
    }
  }
  var url = `membership/getAService?organizerId=`+this.userid._id+`&serviceId=`+this.serviceId;
  this.service.getApi(url,1).subscribe(response => {
   if(response.responseCode == 200) {
    console.log(JSON.stringify(response));
    this.disable = false;
    console.log("Response---> ",response.result);
      this.onDateChange(response.result.startDate,response.result.endDate);   
   } else if(response.responseCode == 402) {
     
   }
 });
}
/******************Date Validation  between the given Dates**************/
public myDatePickerOptions: IMyDpOptions = { 
  dateFormat: 'yyyy-mm-dd', 
  editableDateField:false, 
  openSelectorOnInputClick:false,
  disableUntil:{year: 0, month: 0, day: 0},
  disableSince: {year: 0, month: 0, day: 0}
  };
  onDateChange(startdate,enddate) {
    let startD = new Date(startdate);
    let endD = new Date(enddate)
    startD.setDate(startD.getDate() -1 );
    let copy1 = this.getCopyOfOptions();
    copy1.disableUntil = {
    year: startD.getFullYear(),
    month: startD.getMonth() + 1,
    day: startD.getDate()
    };
    this.myDatePickerOptions = copy1 
    endD.setDate(endD.getDate() +1);
    let copy2 = this.getCopyOfOptions();
    copy2.disableSince = {
    year: endD.getFullYear(),
    month: endD.getMonth() + 1,
    day: endD.getDate()
    };
    this.myDatePickerOptions = copy2
    }
 //Returns copy of myDatePickerOptions
getCopyOfOptions(): IMyDpOptions {
  return JSON.parse(JSON.stringify(this.myDatePickerOptions));
  }
 /****************************Get Player List **************/
 onChange(event){
   console.log("Event---> ",event.jsdate);
   this.show = true;
   this.searchYear =  event.date.year;
   this.searchMonth = event.date.month;
  var date = event.jsdate.toISOString();
    var apiDoc = {
      "date":date,
      "membershipId":this.membershipId,
      "serviceId":this.serviceId
    }
   console.log("Api Doc===>>  ",apiDoc); 
   this.service.postApi(`membership/getListOfPlayersLeaderboard`,apiDoc,1).subscribe(response => {
    if(response.responseCode == 200) {
      console.log(JSON.stringify(response));
      this.evaluationList = response.result;
    //   var evaluation = response.result
    // //this.leaderboardList = this.currentList.filter(x => x.leaderBoard.hasOwnProperty(this.currentYear))
    // this.evaluationList = evaluation.filter(x => x.evaluation.hasOwnProperty(this.searchYear))
    // console.log("Leader Array----> ",this.evaluationList);
    } else{
      
    }
  });
 }
 getPlayerId(player){
   console.log("Id--->   Player--->",player.target.value);
   var playerName = player.target.value
   for(var i= 0;i<this.evaluationList.length;i++){
    console.log("PlayerName-->  ",playerName);
    if(this.evaluationList[i].playerId.firstName == playerName){
      this.playerId = this.evaluationList[i]._id;
      console.log("Player Id--> ",this.playerId);
    }
 }
}
getLeaderBoard(){
  console.log("PlayerId---> ",this.playerId);
  var url = `membership/getDetailOfPlayerEvaluation?bookingId=`+this.playerId;
  this.service.getApi(url,1).subscribe(response => {
   if(response.responseCode == 200) {
   console.log(JSON.stringify(response));

    var dataarray = response.result;
    console.log("Value of data--> ",JSON.stringify(dataarray));
    this.evaluate = dataarray.evaluation;
    console.log("Value of a--> ",JSON.stringify(this.evaluate));
    this.changeValue(this.evaluate)
    // this.evaluate = {'year':a[this.searchYear]}
    // console.log("Value of e--> ",JSON.stringify(this.evaluate));
    // var e1 = {'month' : e[this.searchMonth]};
    // console.log('Month',this.searchMonth);
    // console.log("Value of e1--> ",JSON.stringify(e1));
   } 
   else if(response.responseCode == 402) {
     
   }
 });
}
changeValue(val) {
  var data = this.evaluateForm.value;
  var dateData = [this.searchYear , this.searchMonth];
  for (var i in val) {
  var x = val[i];
  for (var y in x) {
  if (dateData[0] == i && dateData[1] == y) {
  this.evaluateForm.patchValue({
  bad: x[y].bad,
  pass: x[y].pass,
  shooting: x[y].shooting,
  strenght: x[y].strenght,
  speed: x[y].speed,
  flexibility: x[y].flexibility,
  decision: x[y].decision,
  offensive: x[y].offensive,
  concentration: x[y].concentration,
  competitivenedd: x[y].competitivenedd,
  selfConfidence: x[y].selfConfidence,
  avg:x[y].avg
  });
  }
  }
  }
  }
  /********************* Update Functionality ******************/
  update(formval){
    console.log("Form Value---> ",formval);
    var apiDoc = {
    "bookingId":this.playerId,
    "year":this.searchYear,
    "month":this.searchMonth,
    "bad":Number(formval.bad),
    "pass":Number(formval.pass),
    "shooting":Number(formval.shooting),
    "strenght":Number(formval.strenght),
    "speed":Number(formval.speed),
    "flexibility":Number(formval.flexibility),
    "decision":Number(formval.decision),
    "offensive":Number(formval.offensive),
    "concentration":Number(formval.concentration),
    "competitivenedd":Number(formval.competitivenedd),
    "selfConfidence":Number(formval.selfConfidence),
    "avg":Number(formval.avg)
    }
   console.log("Api Doc---> ",JSON.stringify(apiDoc)); 
   this.service.postApi(`membership/setEvaluation`,apiDoc,1).subscribe(response => {
    if(response.responseCode == 200) {
      console.log(JSON.stringify(response));
      
          } 
          else{
            console.log(JSON.stringify(response));
    }
  });
  }
}
