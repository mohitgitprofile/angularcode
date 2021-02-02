import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../../../../providers/mainService.service';

@Component({
  selector: 'app-membersetting',
  templateUrl: './membersetting.component.html',
  styleUrls: ['./membersetting.component.css']
})
export class MembersettingComponent implements OnInit {
  applyForm: FormGroup;
  userid: any;
  memberlist: any;
  membershipId: any;
  show:string = 'hide';
  membershipname: any;
  constructor(public service:MainService) { }

  ngOnInit() {
    this.userid = JSON.parse(localStorage.getItem('userDetailYala') );
    console.log("User--> ",this.userid)
    console.log("User Id--> ",this.userid._id);
    this.formValidation();
    this.membershipApi();
  }
  /************ Form Validation *******************/
 formValidation(){
  this.applyForm = new FormGroup({
    comments : new FormControl('',),
    club : new FormControl('',),
    follow : new FormControl('',)
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
      this.show = 'show';
      console.log("Membership Id--> ",this.membershipId);
    }
  }
}
/******************* Settings Api ****************************/
settingsApi(formval){
  var setting = formval;
  console.log("Form Value---> ",JSON.stringify(formval));
  var settingData = {
    "organizerId":this.userid._id,
    "allowComments":setting.comments?""+setting.comments:"false",
    "enableRegistration":setting.club?""+setting.club:"false",
    "membershipName":this.membershipname,
   "membershipId":this.membershipId,
   "allowPublicToFollow":setting.follow?setting.follow:'',
    }
    console.log("Setting Api Data----> ",JSON.stringify(settingData));
    this.service.postApi(`membership/editMembership`, settingData, 1).subscribe(response => {
      if(response.responseCode == 200) {
       console.log("Message---> ",response.responseMessage);
       this.show = 'hide';
       this.membershipname = '';
       this.applyForm.reset();
        } else if(response.responseCode == 402) {
        console.log("Message---> ",response.responseMessage);
      }
    })
}
}
