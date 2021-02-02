import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../providers/mainService.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-role-matrix',
  templateUrl: './role-matrix.component.html',
  styleUrls: ['./role-matrix.component.css']
})
export class RoleMatrixComponent implements OnInit {


  counter: number = 0;
  administratorDatabaseCompetitonArray: any = [];
  administratorDatabaseVenueArray: any = [];
  administratorDatabaseMembershipArray: any = [];
  administratorVenueArray: any = [];
  administratorCompetitionArray: any = [];
  administratorMembershipArray: any = [];
  administratorMediaArray: any = [];
  coordinatorDatabaseCompetitionArray: any = [];
  coordinatorDatabaseMembershipArray: any = [];
  coordinatorDatabaseVenueArray: any = [];
  coordinatorCompetitionArray: any = [];
  coordinatorMembershipArray: any = [];
  coordinatorVenueArray: any = [];
  coordinatorMediaArray: any = [];
  userDetails: any;
  id: any;
  loginTypeArr: any = [];
  subscriptionAccess: any={};
  media: any;
  subscriptionAccessDataBase: any=[];
  subscriptionAccessCompetition: any=[];
  subscriptionAccessMembership: any=[];
  subscriptionAccessVenue: any=[];
  userManagment: any;
  administratorDataBase: any=[];
  coordinatorDataBase: any=[];
  administratorCompetition: any=[];
  administratorMembership: any=[];
  administratorVenue: any=[];
  coordinatorCompetition: any=[];
  coordinatorMembership: any=[];
  coordinatorVenue: any=[];
  mediaCheck: any;
  userManagmentCheck: any;
  coordinatorMediaCheck: any;
  coordinatorUserManagmentCheck: any;
  productCoordinator: any;
  productCheck:any;
  coordinatorProductCheck:any;
  constructor(public service: MainService, public routes: ActivatedRoute, public router: Router) { }

  ngOnInit() {

    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.loginTypeArr = localStorage.getItem('LoginWith').split(',');
    this.subscriptionAccess = JSON.parse(localStorage.getItem('subscriptionAccess'));
    this.media = this.subscriptionAccess.Media;
    this.userManagment = this.subscriptionAccess.userManagement;
    this.productCoordinator = this.subscriptionAccess.Product;
  console.log("productCoordinator ---->>>> ",this.productCoordinator); 
   if(this.loginTypeArr.includes("COMPETITION")){
     this.subscriptionAccess.competition.database.map(x => {
         if (!this.subscriptionAccessDataBase.includes(x)) this.subscriptionAccessDataBase.push(x)
       }) 
       this.subscriptionAccess.competition.competition.map(x => {
         if (!this.subscriptionAccessCompetition.includes(x)) this.subscriptionAccessCompetition.push(x)
       }) 
    
   }       
   if(this.loginTypeArr.includes("MEMBERSHIP")){
     this.subscriptionAccess.membership.database.map(x => {
       if (!this.subscriptionAccessDataBase.includes(x)) this.subscriptionAccessDataBase.push(x)
     }) 
     this.subscriptionAccess.membership.membership.map(x => {
       if (!this.subscriptionAccessMembership.includes(x)) this.subscriptionAccessMembership.push(x)
     }) 
    }       
   if(this.loginTypeArr.includes("VENUE")){
     this.subscriptionAccess.venue.database.map(x => {
       if (!this.subscriptionAccessDataBase.includes(x)) this.subscriptionAccessDataBase.push(x)
     })
     this.subscriptionAccess.venue.venue.map(x => {
       if (!this.subscriptionAccessVenue.includes(x)) this.subscriptionAccessVenue.push(x)
     }) 
    
   }   
   console.log("subscriptionAccessDataBase--->>> ",JSON.stringify(this.subscriptionAccessDataBase));
   console.log("subscriptionAccessCompetition--->>> ",JSON.stringify(this.subscriptionAccessCompetition));
   console.log("subscriptionAccessMembership--->>> ",JSON.stringify(this.subscriptionAccessMembership));
   console.log("subscriptionAccessVenue--->>> ",JSON.stringify(this.subscriptionAccessVenue));
    this.getPermissionMatrix();
  }

  checkbox(id, value) {
    // console.log("Id--->>> ", id, " &Value--->>>", value);
    if (id == 'administratorDatabaseVenue') {
      if (!this.administratorDatabaseVenueArray.includes(value)) {
        this.counter = 0;
      }
      if ((this.counter == 0) || (this.counter % 2 == 0)) {
        if (!this.administratorDatabaseVenueArray.includes(value)) {
          this.administratorDatabaseVenueArray.push(value);
          this.counter = this.counter + 1;
        }
        console.log("administratorDatabaseVenueArray--->>>>", this.administratorDatabaseVenueArray);
        console.log("Counter --->>> ", this.counter)

      }
      else if ((this.counter != 0) && (this.administratorDatabaseVenueArray.includes(value))) {
        var index = this.administratorDatabaseVenueArray.indexOf(value);
        if (index > -1) {
          console.log("index --->>> ", index)
          this.administratorDatabaseVenueArray.splice(index, 1);
          this.counter = this.counter - 1;
        }
        console.log("administratorDatabaseVenueArray --->>> ", this.administratorDatabaseVenueArray)
        console.log("Counter --->>> ", this.counter)
      }
    }
    else if (id == 'administratorDatabaseCompetion') {
      if (!this.administratorDatabaseCompetitonArray.includes(value)) {
        this.counter = 0;
      }
      if ((this.counter == 0) || (this.counter % 2 == 0)) {
        if (!this.administratorDatabaseCompetitonArray.includes(value)) {
          this.administratorDatabaseCompetitonArray.push(value);
          this.counter = this.counter + 1;
        }
        console.log("administratorDatabaseCompetitonArray--->>>>", this.administratorDatabaseCompetitonArray);
        console.log("Counter --->>> ", this.counter)

      }
      else if ((this.counter != 0) && (this.administratorDatabaseCompetitonArray.includes(value))) {
        var index = this.administratorDatabaseCompetitonArray.indexOf(value);
        if (index > -1) {
          console.log("index --->>> ", index)
          this.administratorDatabaseCompetitonArray.splice(index, 1);
          this.counter = this.counter - 1;
        }
        console.log("administratorDatabaseCompetitonArray --->>> ", this.administratorDatabaseCompetitonArray)
        console.log("Counter --->>> ", this.counter)
      }
    }
    else if (id == 'administratorCompetition') {
      if (!this.administratorCompetitionArray.includes(value)) {
        this.counter = 0;
      }
      if ((this.counter == 0) || (this.counter % 2 == 0)) {
        if (!this.administratorCompetitionArray.includes(value)) {
          this.administratorCompetitionArray.push(value);
          this.counter = this.counter + 1;
        }
        console.log("administratorCompetitionArray--->>>>", this.administratorCompetitionArray);
        console.log("Counter --->>> ", this.counter)

      }
      else if ((this.counter != 0) && (this.administratorCompetitionArray.includes(value))) {
        var index = this.administratorCompetitionArray.indexOf(value);
        if (index > -1) {
          console.log("index --->>> ", index)
          this.administratorCompetitionArray.splice(index, 1);
          this.counter = this.counter - 1;
        }
        console.log("administratorCompetitionArray --->>> ", this.administratorCompetitionArray)
        console.log("Counter --->>> ", this.counter)
      }
    }
    else if (id == 'administratorMembership') {
      if (!this.administratorMembershipArray.includes(value)) {
        this.counter = 0;
      }
      if ((this.counter == 0) || (this.counter % 2 == 0)) {
        if (!this.administratorMembershipArray.includes(value)) {
          this.administratorMembershipArray.push(value);
          this.counter = this.counter + 1;
        }
        console.log("administratorMembershipArray--->>>>", this.administratorMembershipArray);
        console.log("Counter --->>> ", this.counter)

      }
      else if ((this.counter != 0) && (this.administratorMembershipArray.includes(value))) {
        var index = this.administratorMembershipArray.indexOf(value);
        if (index > -1) {
          console.log("index --->>> ", index)
          this.administratorMembershipArray.splice(index, 1);
          this.counter = this.counter - 1;
        }
        console.log("administratorMembershipArray --->>> ", this.administratorMembershipArray)
        console.log("Counter --->>> ", this.counter)
      }
    }
    else if (id == 'administratorVenue') {
      if (!this.administratorVenueArray.includes(value)) {
        this.counter = 0;
      }
      if ((this.counter == 0) || (this.counter % 2 == 0)) {
        if (!this.administratorVenueArray.includes(value)) {
          this.administratorVenueArray.push(value);
          this.counter = this.counter + 1;
        }
        console.log("administratorVenueArray--->>>>", this.administratorVenueArray);
        console.log("Counter --->>> ", this.counter)

      }
      else if ((this.counter != 0) && (this.administratorVenueArray.includes(value))) {
        var index = this.administratorVenueArray.indexOf(value);
        if (index > -1) {
          console.log("index --->>> ", index)
          this.administratorVenueArray.splice(index, 1);
          this.counter = this.counter - 1;
        }
        console.log("administratorVenueArray --->>> ", this.administratorVenueArray)
        console.log("Counter --->>> ", this.counter)
      }
    }
    else if (id == 'administratorMedia') {
      if (!this.administratorMediaArray.includes(value)) {
        this.counter = 0;
      }
      if ((this.counter == 0) || (this.counter % 2 == 0)) {
        if (!this.administratorMediaArray.includes(value)) {
          this.administratorMediaArray.push(value);
          this.counter = this.counter + 1;
        }
        console.log("administratorMediaArray--->>>>", this.administratorMediaArray);
        console.log("Counter --->>> ", this.counter)

      }
      else if ((this.counter != 0) && (this.administratorMediaArray.includes(value))) {
        var index = this.administratorMediaArray.indexOf(value);
        if (index > -1) {
          console.log("index --->>> ", index)
          this.administratorMediaArray.splice(index, 1);
          this.counter = this.counter - 1;
        }
        console.log("administratorMediaArray --->>> ", this.administratorMediaArray)
        console.log("Counter --->>> ", this.counter)
      }
    }
    else if (id == 'coordinatorDatabaseCompetition') {
      if (!this.coordinatorDatabaseCompetitionArray.includes(value)) {
        this.counter = 0;
      }
      if ((this.counter == 0) || (this.counter % 2 == 0)) {
        if (!this.coordinatorDatabaseCompetitionArray.includes(value)) {
          this.coordinatorDatabaseCompetitionArray.push(value);
          this.counter = this.counter + 1;
        }
        console.log("coordinatorDatabaseCompetitionArray--->>>>", this.coordinatorDatabaseCompetitionArray);
        console.log("Counter --->>> ", this.counter)

      }
      else if ((this.counter != 0) && (this.coordinatorDatabaseCompetitionArray.includes(value))) {
        var index = this.coordinatorDatabaseCompetitionArray.indexOf(value);
        if (index > -1) {
          console.log("index --->>> ", index)
          this.coordinatorDatabaseCompetitionArray.splice(index, 1);
          this.counter = this.counter - 1;
        }
        console.log("coordinatorDatabaseCompetitionArray --->>> ", this.coordinatorDatabaseCompetitionArray)
        console.log("Counter --->>> ", this.counter)
      }
    }
    else if (id == 'coordinatorCompetition') {
      if (!this.coordinatorCompetitionArray.includes(value)) {
        this.counter = 0;
      }
      if ((this.counter == 0) || (this.counter % 2 == 0)) {
        if (!this.coordinatorCompetitionArray.includes(value)) {
          this.coordinatorCompetitionArray.push(value);
          this.counter = this.counter + 1;
        }
        console.log("coordinatorCompetitionArray--->>>>", this.coordinatorCompetitionArray);
        console.log("Counter --->>> ", this.counter)

      }
      else if ((this.counter != 0) && (this.coordinatorCompetitionArray.includes(value))) {
        var index = this.coordinatorCompetitionArray.indexOf(value);
        if (index > -1) {
          console.log("index --->>> ", index)
          this.coordinatorCompetitionArray.splice(index, 1);
          this.counter = this.counter - 1;
        }
        console.log("coordinatorCompetitionArray --->>> ", this.coordinatorCompetitionArray)
        console.log("Counter --->>> ", this.counter)
      }
    }
    else if (id == 'coordinatorMembership') {
      if (!this.coordinatorMembershipArray.includes(value)) {
        this.counter = 0;
      }
      if ((this.counter == 0) || (this.counter % 2 == 0)) {
        if (!this.coordinatorMembershipArray.includes(value)) {
          this.coordinatorMembershipArray.push(value);
          this.counter = this.counter + 1;
        }
        console.log("coordinatorMembershipArray--->>>>", this.coordinatorMembershipArray);
        console.log("Counter --->>> ", this.counter)

      }
      else if ((this.counter != 0) && (this.coordinatorMembershipArray.includes(value))) {
        var index = this.coordinatorMembershipArray.indexOf(value);
        if (index > -1) {
          console.log("index --->>> ", index)
          this.coordinatorMembershipArray.splice(index, 1);
          this.counter = this.counter - 1;
        }
        console.log("coordinatorMembershipArray --->>> ", this.coordinatorMembershipArray)
        console.log("Counter --->>> ", this.counter)
      }
    }
    else if (id == 'coordinatorVenue') {
      if (!this.coordinatorVenueArray.includes(value)) {
        this.counter = 0;
      }
      if ((this.counter == 0) || (this.counter % 2 == 0)) {
        if (!this.coordinatorVenueArray.includes(value)) {
          this.coordinatorVenueArray.push(value);
          this.counter = this.counter + 1;
        }
        console.log("coordinatorVenueArray--->>>>", this.coordinatorVenueArray);
        console.log("Counter --->>> ", this.counter)

      }
      else if ((this.counter != 0) && (this.coordinatorVenueArray.includes(value))) {
        var index = this.coordinatorVenueArray.indexOf(value);
        if (index > -1) {
          console.log("index --->>> ", index)
          this.coordinatorVenueArray.splice(index, 1);
          this.counter = this.counter - 1;
        }
        console.log("coordinatorVenueArray --->>> ", this.coordinatorVenueArray)
        console.log("Counter --->>> ", this.counter)
      }
    }
    else if (id == 'coordinatorMedia') {
      if (!this.coordinatorMediaArray.includes(value)) {
        this.counter = 0;
      }
      if ((this.counter == 0) || (this.counter % 2 == 0)) {
        if (!this.coordinatorMediaArray.includes(value)) {
          this.coordinatorMediaArray.push(value);
          this.counter = this.counter + 1;
        }
        console.log("coordinatorMediaArray--->>>>", this.coordinatorMediaArray);
        console.log("Counter --->>> ", this.counter)

      }
      else if ((this.counter != 0) && (this.coordinatorMediaArray.includes(value))) {
        var index = this.coordinatorMediaArray.indexOf(value);
        if (index > -1) {
          console.log("index --->>> ", index)
          this.coordinatorMediaArray.splice(index, 1);
          this.counter = this.counter - 1;
        }
        console.log("coordinatorMediaArray --->>> ", this.coordinatorMediaArray)
        console.log("Counter --->>> ", this.counter)
      }
    }
  }
  getPermissionData() {
    var apiDoc = {
       "employeePermissionForAdminstartor": {
        "subscriptionAccess":{
          "competition":{
          "database": this.administratorDatabaseCompetitonArray,//['Team','Matches','Player','Clubs','Refree','Sponsor','Newslatter','Activity Log','Venue'],
          "competition":this.administratorCompetitionArray,
          "oneEvent":20,
          "monthly":50,
          "yearly":100 
          },
          "membership":{
          "database": this.administratorDatabaseCompetitonArray,//['Player','Clubs','Venue','Sponsor','Newslatter','Activity Log'] ,
          "membership": this.administratorMembershipArray,//['Registration','Member Card','Attendance','Leaderboard','Evaluation','Approval','Settings','Report','Section'],
          "oneEvent":20,
          "monthly":50,
          "yearly":100 
          },
          "venue":{
          "database": this.administratorDatabaseCompetitonArray,//['Player','Sponsor','Newslatter','Activity Log'] ,
          "venue":this.administratorVenueArray,//['Dashboard','Venue','Booking','Stores','Configuration','Section'],
          "oneEvent":20,
          "monthly":50,
          "yearly":100 
          },
          "Media":(this.administratorMediaArray.includes('Media'))?true:false,
          "userManagement" :(this.administratorMediaArray.includes('UserManagement'))?true:false,
          "Product" :(this.administratorMediaArray.includes('Product'))?true:false,
          "addOn":{
          "web&hosting":20,
          "event&membershipManagement":60
          }
          }
      },
      "employeePermissionForCoordinator": {
        "subscriptionAccess":{
          "competition":{
          "database":this.coordinatorDatabaseCompetitionArray,  // ['Team','Matches','Player','Clubs','Refree','Sponsor','Newslatter','Activity Log','Venue'],
          "competition":this.coordinatorCompetitionArray,
          "oneEvent":20,
          "monthly":50,
          "yearly":100 
          },
          "membership":{
          "database": this.coordinatorDatabaseCompetitionArray ,
          "membership": this.coordinatorMembershipArray,//['Registration','Member Card','Attendance','Leaderboard','Evaluation','Approval','Settings','Report','Section'],
          "oneEvent":20,
          "monthly":50,
          "yearly":100 
          },
          "venue":{
          "database": this.coordinatorDatabaseCompetitionArray ,
          "venue":this.coordinatorVenueArray, //['Dashboard','Venue','Booking','Stores','Configuration','Section'],
          "oneEvent":20,
          "monthly":50,
          "yearly":100 
          },
          "Media":(this.coordinatorMediaArray.includes('Media'))?true:false,
          "userManagement" :(this.coordinatorMediaArray.includes('UserManagement'))?true:false,
          "Product" :(this.coordinatorMediaArray.includes('Product'))?true:false,
          "addOn":{
          "web&hosting":20,
          "event&membershipManagement":60
          }
          }
      }
    }
 
    console.log("ApiDoc---->>> ", JSON.stringify(apiDoc));
    this.service.postApi('users/setRoleForEmployee?userId='+this.userDetails._id, apiDoc, 1).subscribe(response => {
      if(response.responseCode == 201 || response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage)
        this.router.navigate(['/organizer/menuCompConfUser']);
       }
    })    
  }
  getPermissionMatrix() {
    this.service.getApi('users/getRoleForEmployee?userId=' + this.userDetails._id, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage);
     console.log("Response--->>>> ", JSON.stringify(response.result));
       var  result = response.result;
       var administratorPermission = result.employeePermissionForAdminstartor;
       var coordinatorPermision = result.employeePermissionForCoordinator;
     //  For Administrator Related Array
      if(administratorPermission.competition.database.length == 0){
        if(administratorPermission.membership.database.length == 0){
          if(administratorPermission.venue.database.length != 0){
            administratorPermission.venue.database.map(x => {
              if (!this.administratorDataBase.includes(x)) this.administratorDataBase.push(x)
            }) 
          }
          else {
          this.administratorDataBase = [];
          }
        } 
        else {
          administratorPermission.membership.database.map(x => {
            if (!this.administratorDataBase.includes(x)) this.administratorDataBase.push(x)
          }) 
        }       
      }
      else {
        administratorPermission.competition.database.map(x => {
          if (!this.administratorDataBase.includes(x)) this.administratorDataBase.push(x)
        }) 
      }
      if(administratorPermission.competition.competition.length){
        administratorPermission.competition.competition.map(x => {
          if (!this.administratorCompetition.includes(x)) this.administratorCompetition.push(x)
        })   
       }
       if(administratorPermission.membership.membership.length){
        administratorPermission.membership.membership.map(x => {
          if (!this.administratorMembership.includes(x)) this.administratorMembership.push(x)
        })   
       }
       if(administratorPermission.venue.venue.length){
        administratorPermission.venue.venue.map(x => {
          if (!this.administratorVenue.includes(x)) this.administratorVenue.push(x)
        })   
       }
       this.mediaCheck = administratorPermission.Media;
       this.userManagmentCheck = administratorPermission.userManagement;
      this.productCheck = administratorPermission.Product;
      console.log("productCheck--->>>", this.productCheck)
      // console.log("administrator Competition--->>>", this.administratorCompetition)
      // console.log("administrator Membership--->>>", this.administratorMembership)
      // console.log("administrator Venue--->>>", this.administratorVenue)

    // For Coordinator Related Array
      if(coordinatorPermision.competition.database.length == 0){
        if(coordinatorPermision.membership.database.length == 0){
          if(coordinatorPermision.venue.database.length != 0){
            coordinatorPermision.venue.database.map(x => {
              if (!this.coordinatorDataBase.includes(x)) this.coordinatorDataBase.push(x)
            }) 
          }
          else {
          this.coordinatorDataBase = [];
          }
        } 
        else {
          coordinatorPermision.membership.database.map(x => {
            if (!this.coordinatorDataBase.includes(x)) this.coordinatorDataBase.push(x)
          }) 
        }       
      }
      else {
        coordinatorPermision.competition.database.map(x => {
          if (!this.coordinatorDataBase.includes(x)) this.coordinatorDataBase.push(x)
        }) 
      }
      if(coordinatorPermision.competition.competition.length){
        coordinatorPermision.competition.competition.map(x => {
          if (!this.coordinatorCompetition.includes(x)) this.coordinatorCompetition.push(x)
        })   
       }
       if(coordinatorPermision.membership.membership.length){
        coordinatorPermision.membership.membership.map(x => {
          if (!this.coordinatorMembership.includes(x)) this.coordinatorMembership.push(x)
        })   
       }
       if(coordinatorPermision.venue.venue.length){
        coordinatorPermision.venue.venue.map(x => {
          if (!this.coordinatorVenue.includes(x)) this.coordinatorVenue.push(x)
        })   
       }
       this.coordinatorMediaCheck = coordinatorPermision.Media;
       this.coordinatorUserManagmentCheck= coordinatorPermision.userManagement;
       this.coordinatorProductCheck = coordinatorPermision.Product
      console.log("coordinatorProductCheck--->>>", this.coordinatorProductCheck)
      // console.log("coordinator Competition--->>>", this.coordinatorCompetition)
      // console.log("coordinator Membership--->>>", this.coordinatorMembership)
      // console.log("coordinator Venue--->>>", this.coordinatorVenue)
     
        // this.router.navigate(['/organizer/menuCompConfUser']);
      }
    })
  }
}
