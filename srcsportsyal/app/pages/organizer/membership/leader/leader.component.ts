import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../providers/mainService.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-leader',
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.css']
})
export class LeaderComponent implements OnInit {
  userid: any;
  memberList: any=[];
  membershipname: any;
  membershipId: any;
  servicelist: any=[];
  servicename: any;
  serviceId: any;
  filterForm: FormGroup;
  disable:boolean = true;
  leaderList: any=[];
  searchYear: any;
  searchMonth: any;
  leaderboardList: any=[];
  pointForm: FormGroup;
  show : string ='hide';
  
  constructor(public service: MainService) { }

  ngOnInit() {
    this.userid = JSON.parse(localStorage.getItem('userDetailYala') );
    console.log("User--> ",this.userid)
    console.log("User Id--> ",this.userid._id);
    this.formValidation();
    this.membershipListApi();
   
  }
  /******************Form Validation ****************/
  formValidation(){
    this.filterForm = new FormGroup({
      'membershipName': new FormControl('',Validators.required),
      'serviceName':new FormControl('',Validators.required),
      'serviceDate': new FormControl('',Validators.required)
    });
    // this.pointForm = new FormGroup({
    //   'points':new FormControl('')
    // })
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
    // var startDate = response.result.startDate;
    // var isostart = new Date("2018-09-10T00:00:00.000Z");
    // var endDate = response.result.endDate;
    // var isoDate = new Date("2018-09-25T00:00:00.000Z");
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
 
  /************** Get Leader Board Functionality *************/
  getLeaderBoard(formvalue){
    console.log("Form Value---> ",formvalue);
    this.searchYear = formvalue.serviceDate.date.year;
    this.searchMonth = formvalue.serviceDate.date.month;
    console.log("Year---->",this.searchYear+"  Month---> ",this.searchMonth);
    var date = formvalue.serviceDate.jsdate.toISOString();
    var apiDoc = {
      "date":date,
      "membershipId":this.membershipId,
      "serviceId":this.serviceId
    }
   console.log("Api Doc===>>  ",apiDoc); 
  
   this.service.postApi(`membership/getListOfPlayersLeaderboard`,apiDoc,1).subscribe(response => {
    if(response.responseCode == 200) {
      console.log(JSON.stringify(response));
     this.leaderList = response.result;
    
     //this.leaderboardList = this.currentList.filter(x => x.leaderBoard.hasOwnProperty(this.currentYear))
     if(this.leaderList != []){
      this.show = 'show';
      this.leaderboardList = this.leaderList.filter(x => x.leaderBoard.hasOwnProperty(this.searchYear))
     }
    
    console.log("Leader Array----> ",this.leaderboardList);
  
    } else{
      
    }
  });
  }
  onSearchChange(val,id){
     console.log(" Value-->",val," id-->",id);
     for(var i=0;i<this.leaderboardList.length;i++){
       if(this.leaderboardList[i]._id == id){
         console.log("Id LeaderList----> ",this.leaderboardList[i]._id+"    id---> ",id);
         this.leaderboardList[i].leaderBoard[this.searchYear][this.searchMonth]  = val;
        console.log("Value===> ", this.leaderboardList[i].leaderBoard[this.searchYear][this.searchMonth]);
       }
     }
     console.log("Array Change--->",this.leaderboardList);
  }
  update(){
  var apiDoc = {
    "result": this.leaderboardList
    }
    console.log("Api Doc---> ",apiDoc);
    this.service.postApi(`membership/updateLeaderBoardPoint`,apiDoc,1).subscribe(response => {
      if(response.responseCode == 200) {
        console.log(JSON.stringify(response));
      //  this.leaderList = response.result;
      //  this.show = 'show'
      //  //this.leaderboardList = this.currentList.filter(x => x.leaderBoard.hasOwnProperty(this.currentYear))
      // this.leaderboardList = this.leaderList.filter(x => x.leaderBoard.hasOwnProperty(this.searchYear))
      // console.log("Leader Array----> ",this.leaderboardList);
    
      } else{
        
      }
    });
    }
   
}
