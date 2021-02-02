import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../providers/mainService.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  userid: any;
  filterForm: FormGroup;
  memberlist: any;
  membershipId: any;
  servicelist: any;
  data1:any = 100;
  data2:any= 25;
  data3:any = 75;
  beDisable: boolean = true;
  public pieChartLabels:string[] = ['All Booking', 'Confirmed Booking', 'Pending Booking'];
  public pieChartData:number[] = [this.data1, this.data2, this.data3];
  public pieChartType:string = 'pie';
  serviceId: any;
  servicename: any;
  membershipname: any;
  graphData: any='';
  data:any='';
  constructor(public service:MainService) { }

  ngOnInit() {
    this.userid = JSON.parse(localStorage.getItem('userDetailYala') );
    console.log("User--> ",this.userid)
    console.log("User Id--> ",this.userid._id);
    this.formValidation();
    this.membershipApi();
    this.onDateChanged();
   // this.createGraphApi('');
  }
/************ Form Validation *******************/
formValidation(){
  this.filterForm = new FormGroup({
    membershipname: new FormControl('',Validators.required),
    servicename : new FormControl('',Validators.required),
    startDate : new FormControl('',Validators.required),
    endDate : new FormControl('',Validators.required)
  });
 }
 /********************** Membership Api *****************/
 membershipApi(){
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
 /*********************** Get MembershipID ****************/
getMembershipId(event){
  console.log("MememberName-->  ",event.target.value);
 this.membershipname = event.target.value;
  for(var i= 0;i<this.memberlist.length;i++){
    console.log("MememberName-->  ",this.membershipname);
    if(this.memberlist[i].membershipName == this.membershipname){
      this.membershipId = this.memberlist[i]._id;
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
}
/**************** Date managing Start Here***************/
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
 
  this.filterForm.patchValue({
    'to': null,
    'from': null
  })
   
  }
  
}
getCopyOfToDateOpt(): IMyDpOptions {
  return JSON.parse(JSON.stringify(this.toDate));
}
/*******************Date managing Ends Here**************/
/****************** Graph Function **********************/
//   public chartClicked(e:any):void {
//   console.log("Chart Clicked---> ",e);
// }

// public chartHovered(e:any):void {
//   console.log("Chart hovered---> ",e);
// }
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}
/******************* Create Graph Api ***************************/
createGraphApi(formval){
console.log("Form Val---> ",JSON.stringify(formval));
var apiDoc = {
	"organizerId":this.userid._id,
	"membershipId":this.membershipId?this.membershipId:null,
	"serviceId":this.serviceId?this.serviceId:null,
	"startDate":formval.startDate?formval.startDate.formatted:null,
	"endDate":formval.endDate?formval.endDate.formatted:null
}
console.log("Api Doc ------>  ",JSON.stringify(apiDoc));

this.service.postApi(`membership/generateReport`,apiDoc,1).subscribe(response => {
  if(response.responseCode == 200) {
    console.log(JSON.stringify(response));
    this.graphData = 'GraphData';
    this.data1 = response.result.allBooking;
    this.data2 = response.result.confirmedBooking;
    this.data3 = response.result.allBooking - response.result.confirmedBooking;
    this.pieChartData = [this.data1, this.data2,this.data3];
     console.log(this.pieChartData);  
  } else{
    this.graphData = '';
    console.log(JSON.stringify(response));
     this.data = "No Data Found Related To Your Search";
  }
});
}

}
