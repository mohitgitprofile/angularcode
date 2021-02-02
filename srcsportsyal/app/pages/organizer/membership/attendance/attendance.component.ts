import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../providers/mainService.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  userid: any;
  filterForm: FormGroup;
  memberList: any=[];
  membershipname: any;
  membershipId: any;
  servicelist: any=[];
  servicename: any;
  disable: boolean=true;
  dayArr: any =[];
  markedArray: any=[];
  allPlayerArray: any=[];
  markArr: any=[];
 show:boolean = false;
  serachMonth: any;
  FinalShowAttendancArr : any =[];
  searchYear: any;
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
  serviceId(arg0: string, serviceId: any): any {
    throw new Error("Method not implemented.");
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
// filter(formval){
//   this.dayArr = [];
//   this.markArr = [];
//  // console.log("Value---> ",JSON.stringify(formval));
//  this.serachMonth = formval.serviceDate.date.month;
//  this.searchYear = formval.serviceDate.date.year;
//   var month = formval.serviceDate.date.month;
//  // console.log("Month---> ",month);
//   if((month == 1)||(month == 3)||(month == 5)||(month == 7)||(month == 8)||(month == 10)||(month == 12))
//   {
//     for(var i=1;i<=31;i++){    
//       this.dayArr.push({
//         "day" : i
//       })
//       }
//      // console.log("DayArr--> ",this.dayArr)    
//   }
//  else if((month == 4)||(month == 6)||(month == 9)||(month == 11))
//   {
//     for(var i=1;i<=30;i++){
//        this.dayArr.push({
//         "day" : i
//       })
//       }
//       //console.log("DayArr--> ",this.dayArr)    
//   }
//   else if (month == 2){
//     var year = formval.serviceDate.date.year;
//     var leap = year%4;
//     if(leap == 0){
//       for(var i=1;i<=29;i++){
//          this.dayArr.push({
//         "day" : i
//       })
//       }  
//     //  console.log("DayArr--> ",this.dayArr)
//     }
//     else{
//       for(var i=1;i<=28;i++){
//          this.dayArr.push({
//         "day" : i
//       })
//       }   
//       //console.log("DayArr--> ",this.dayArr);  
//     }
//   }
//   var date = formval.serviceDate.formatted;
//   var apiDoc = {
//     "membershipId":this.membershipId,
//     "serviceId":this.serviceId,
//     "date":date
//   }
//  // console.log("ApiDoc---> ",apiDoc);
//   this.service.postApi(`membership/getAttendanceHistory`,apiDoc,1).subscribe(response => {
//     if(response.responseCode == 200) {
//       //console.log(JSON.stringify(response));
//       this.markedArray = response.result.markedPlayers;
//       this.allPlayerArray = response.result.allPlayers;
//       this.show = true;

     
//    for(var i=0;i<this.allPlayerArray.length;i++){
//         for(var j=0;j<this.markedArray.length;j++){
//           for(var k=0;k<this.markedArray[j].players.length;k++){
//               if(this.allPlayerArray[i].playerId._id == this.markedArray[j].players[k].playerId._id){
//                // console.log("Attendance--> ",this.markedArray[j].players[k].playerAttendence.attendenceStatus);
//                 if(this.markedArray[j].players[k].playerAttendence.attendenceStatus == true){
//                  // console.log("Attendance--> ",this.markedArray[j].players[k].playerAttendence.attendenceStatus)
//                   this.markArr.push(
//                     {
//                       "day" : this.markedArray[j]._id.day,
//                       "name" : this.markedArray[j].players[k].playerId.firstName +" "+ this.markedArray[j].players[k].playerId.lastName,
//                       "attendance":"P"
//                     });
//                   // console.log("PresentMarkArray---> ",this.markArr);
//                 }
//                 else{
//                 //  console.log("Attendance--> ",this.markedArray[j].players[k].playerAttendence.attendenceStatus)
//                   this.markArr.push(
//                     {  
//                       "day" : this.markedArray[j]._id.day, 
//                       "name" : this.markedArray[j].players[k].playerId.firstName + " "+ this.markedArray[j].players[k].playerId.lastName,                 
//                       "attendance":"A"}
//                     );
//                   // console.log("AbsentMarkArray---> ",this.markArr);
//                 }
//               }
//           }
       
//        }
//      }
//       /*for(var i=0;i<this.allPlayerArray.length;i++){
//         for(var j=0;j<this.markedArray.length;j++){
//           for(var x =0;x<this.dayArr.length;x++){
//            if(this.markedArray[j]._id.day == this.dayArr[x]) {
//              console.log("True");
//              for(var k=0;k<this.markedArray[j].players.length;k++){
//               if(this.allPlayerArray[i].playerId._id == this.markedArray[j].players[k].playerId._id){
//                // console.log("Attendance--> ",this.markedArray[j].players[k].playerAttendence.attendenceStatus);
//                 if(this.markedArray[j].players[k].playerAttendence.attendenceStatus == true){
//                  // console.log("Attendance--> ",this.markedArray[j].players[k].playerAttendence.attendenceStatus)
//                   this.markArr.push({"attendance":"P"});
//                   console.log("MarkArray---> ",this.markArr);
//                 }
//                 else{
//                 //  console.log("Attendance--> ",this.markedArray[j].players[k].playerAttendence.attendenceStatus)
//                   this.markArr.push({"attendance":"A"});
//                   console.log("MarkArray---> ",this.markArr);
//                 }
//               }
//           }
//             //  this.markArr.push({"attendance":"P"});
//             // console.log("MarkArray---> ",this.markArr);
//            } 
//            else {
//             this.markArr.push({"attendance":"A"});
//             // console.log("MarkArray---> ",this.markArr);
//             console.log("False");
//            }
//          }
//        }
//       }*/
//       console.log(" FinalMarkArray---> ",this.markArr);
//       // console.log("DayArr--> ",this.dayArr);  
    
//     } else{
      
//     }
//   });
// }
filter(formval){
  this.dayArr = [];
 // console.log("Value---> ",JSON.stringify(formval));
 this.serachMonth = formval.serviceDate.date.month;
 this.searchYear = formval.serviceDate.date.year;
  var month = formval.serviceDate.date.month;
 // console.log("Month---> ",month);
  if((month == 1)||(month == 3)||(month == 5)||(month == 7)||(month == 8)||(month == 10)||(month == 12))
  {
    for(var i=1;i<=31;i++){
      this.dayArr.push(i);
      }
     // console.log("DayArr--> ",this.dayArr)    
  }
 else if((month == 4)||(month == 6)||(month == 9)||(month == 11))
  {
    for(var i=1;i<=30;i++){
      this.dayArr.push(i);
      }
      //console.log("DayArr--> ",this.dayArr)    
  }
  else if (month == 2){
    var year = formval.serviceDate.date.year;
    var leap = year%4;
    if(leap == 0){
      for(var i=1;i<=29;i++){
        this.dayArr.push(i);
      }  
    //  console.log("DayArr--> ",this.dayArr)
    }
    else{
      for(var i=1;i<=28;i++){
        this.dayArr.push(i);
      }   
      //console.log("DayArr--> ",this.dayArr);  
    }
  }
  var date = formval.serviceDate.formatted;
  var apiDoc = {
    "membershipId":this.membershipId,
    "serviceId":this.serviceId,
    "date":date
  }
 // console.log("ApiDoc---> ",apiDoc);
  this.service.postApi(`membership/getAttendanceHistory`,apiDoc,1).subscribe(response => {
    if(response.responseCode == 200) {
      //console.log(JSON.stringify(response));
      this.markedArray = response.result.markedPlayers;
      this.allPlayerArray = response.result.allPlayers;
      this.show = true;
   for(var i=0;i<this.allPlayerArray.length;i++){
        for(var j=0;j<this.markedArray.length;j++){
          for(var k=0;k<this.markedArray[j].players.length;k++){
              if(this.allPlayerArray[i].playerId._id == this.markedArray[j].players[k].playerId._id){
               // console.log("Attendance--> ",this.markedArray[j].players[k].playerAttendence.attendenceStatus);
                if(this.markedArray[j].players[k].playerAttendence.attendenceStatus == true){
                 // console.log("Attendance--> ",this.markedArray[j].players[k].playerAttendence.attendenceStatus)
                  this.markArr.push({"attendance":"P"});
                  console.log("MarkArray---> ",this.markArr);
                }
                else{
                //  console.log("Attendance--> ",this.markedArray[j].players[k].playerAttendence.attendenceStatus)
                  this.markArr.push({"attendance":"A"});
                  console.log("MarkArray---> ",this.markArr);
                }
              }
          }
       
       }
     }
      // for(var i=0;i<this.allPlayerArray.length;i++){
      //   for(var j=0;j<this.markedArray.length;j++){
      //     for(var x =0;x<this.dayArr.length;x++){
      //      if(this.markedArray[j]._id.day == this.dayArr[x]) {
      //        console.log("True");
      //        this.markArr.push({"attendance":"P"});
      //       console.log("MarkArray---> ",this.markArr);
      //      } 
      //      else {
      //       this.markArr.push({"attendance":"P"});
      //       console.log("MarkArray---> ",this.markArr);
      //       console.log("False");
      //      }
        //  for(var k=0;k<this.markedArray[j].players.length;k++){
        //       if(this.allPlayerArray[i].playerId._id == this.markedArray[j].players[k].playerId._id){
        //        // console.log("Attendance--> ",this.markedArray[j].players[k].playerAttendence.attendenceStatus);
        //         if(this.markedArray[j].players[k].playerAttendence.attendenceStatus == true){
        //          // console.log("Attendance--> ",this.markedArray[j].players[k].playerAttendence.attendenceStatus)
        //           this.markArr.push({"attendance":"P"});
        //           console.log("MarkArray---> ",this.markArr);
        //         }
        //         else{
        //         //  console.log("Attendance--> ",this.markedArray[j].players[k].playerAttendence.attendenceStatus)
        //           this.markArr.push({"attendance":"A"});
        //           console.log("MarkArray---> ",this.markArr);
        //         }
        //       }
        //   }
        //}
       // }
     // }
      console.log(" FinalMarkArray---> ",this.markArr);
    } else{
      
    }
  });
}

}
