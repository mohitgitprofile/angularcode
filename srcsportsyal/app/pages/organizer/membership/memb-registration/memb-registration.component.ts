import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../providers/mainService.service';
declare var $:any;
@Component({
  selector: 'app-memb-registration',
  templateUrl: './memb-registration.component.html',
  styleUrls: ['./memb-registration.component.css']
})
export class MembRegistrationComponent implements OnInit {
  configurePlayerList: any = [];
  configureTeamList: any = [];
  configurePlayerArr : any= [{field:"",fieldType:"text", importance:"optional"}];
  configureTeamArr : any= [{field:"",fieldType:"text", importance:"optional"}];
  userid: any;
  memberlist: any;
  membershipId: any;
  membershipname: any = '';
  toggleBool: any=true;
  constructor(public service:MainService) {
    window.scrollTo(0, 0)
  }

  ngOnInit() {
    this.userid = JSON.parse(localStorage.getItem('userDetailYala') );
    console.log("User--> ",this.userid)
    console.log("User Id--> ",this.userid._id);
    this.memberList();
  }
  addOtherPlayerField(){
    var dataFills = false;
    for(var i=0; i<this.configurePlayerArr.length; i++){
        if(this.configurePlayerArr[i].field=="" ){
            this.service.toastrErr('Please enter Player Field.')
            dataFills = false;
            break;
        }else{ 
          dataFills = true;
        }
    }      
    if(dataFills == true){
        this.configurePlayerArr.push({field:"",fieldType:"",importance:"optional"});
    }        
  }

  /*************************************************/
  saveConfigPlayerFields (type) {
    let dynamicPlayerArr = [];

    if (type == "modal") {
      console.log("Check1 ===>> ",this.configurePlayerList);
      dynamicPlayerArr = this.configurePlayerArr.concat(this.configurePlayerList) 	
    } else {
      dynamicPlayerArr = this.configurePlayerList	
    }
    console.log("Check2 ===>> ",dynamicPlayerArr);
    //************** Configure Dynamic Player fields fields Api Integration *************//
    let dynamicFieldsData = {	
      "membershipId": this.membershipId,
      "dynamicFormField": dynamicPlayerArr					
    } 
  console.log("Dynamic Field Data ===>> ",JSON.stringify(dynamicFieldsData));
      this.service.postApi(`membership/dynamicFormField`, dynamicFieldsData,1).subscribe(response => {
      if(response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage)
        $('#add_player').modal('hide');
        if (type == "modal") {
          this.configurePlayerArr = [{field:"",fieldType:"",importance:"optional"}];
        }
       this.getplayerFields();
      } else {
        this.service.toastrErr(response.responseMessage)
      }
    })
    //******************* End ******************//
  }
  /*****************************************************/
  getplayerFields () {
    //**************Get Dynamic Player fields Api Integration *************//
    // let dynamicFieldsData = {	
    //   "userId": this.userid._id,
    //   "membershipId": this.membershipId,
    // } 
   var url ="membership/getAMembership?organizerId="+this.userid._id+"&membershipId="+this.membershipId;
    this.service.getApi(url,1).subscribe(response => {
     console.log("Form Fields-----> ",JSON.stringify(response));
      if(response.responseCode == 200) {
        this.configurePlayerList = response.result.dynamicFormField;
      }
    })
    //******************* End ******************//
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
  /*********************** Get MembershipID ****************/
// getMembershipId(event){
//   console.log("MememberName-->  ",event.target.value);
// this.membershipname = event.target.value;
//    if (this.membershipname != '') {
//   this.toggleBool= false;
//   console.log("Toggle---> ",this.toggleBool);
//      }
//     else {
//   this.toggleBool= true;
//   console.log("Toggle---> ",this.toggleBool);
//    }
//   for(var i= 0;i<this.memberlist.length;i++){
//     console.log("MememberName-->  ",this.membershipname);
//     if(this.memberlist[i].membershipName == this.membershipname){
//       this.membershipId = this.memberlist[i]._id;
//       console.log("Membership Id--> ",this.membershipId);
//     }
//   }
// }
/****************************************************************/
  /*********************** Get MembershipID ****************/
  getMembershipIdApi(event){

    console.log("MememberName-->  ",event.target.value);
  this.membershipname = event.target.value;
  // if (this.membershipname != '') {
  //   this.toggleBool= false;
  //   console.log("Toggle---> ",this.toggleBool);
  //      }
  //     else {
  //   this.toggleBool= true;
  //   console.log("Toggle---> ",this.toggleBool);
  //    }
    for(var i= 0;i<this.memberlist.length;i++){
      console.log("MememberName-->  ",this.membershipname);
      if(this.memberlist[i].membershipName == this.membershipname){
        this.membershipId = this.memberlist[i]._id;
        console.log("Membership Id--> ",this.membershipId);
      }
    }
    var url ="membership/getAMembership?organizerId="+this.userid._id+"&membershipId="+this.membershipId;
    this.service.getApi(url,1).subscribe(response => {
console.log("Form Fields-----> ",JSON.stringify(response));
      if(response.responseCode == 200) {
        this.configurePlayerList = response.result.dynamicFormField;
      }
    })
  }
/*********************** Get Venue Id ****************/
  /*********************************************************************************/
//   saveConfigTeamFields (type) {
//     let dynamicTeamArr = []
//     if (type == "modal") {
//       dynamicTeamArr = this.configureTeamArr.concat(this.configureTeamList) 	
//     } else {
//       dynamicTeamArr = this.configureTeamList	
//     }
//     //************** Configure Dynamic Team fields Api Integration *************//
//     let dynamicFieldsData = {	
//       "userId": this.userid._id,
//      // "competitionId": this.competitionId,
//       "teamFields": dynamicTeamArr					
//     } 
//     // console.log('configureTeamList Api dynamicTeamArr =>> ' + JSON.stringify(dynamicTeamArr))
//     this.service.postApi(`organizer/competition/configTeamFields`, dynamicFieldsData,1).subscribe(response => {
//       this.configureTeamList = [];
//       // console.log('configureTeamList Api hit =>> ' + JSON.stringify(this.configureTeamList))
//       if(response.responseCode == 200) {
//         this.configureTeamList = [];
//         // console.log('configureTeamList200 =>> ' + JSON.stringify(this.configureTeamList))
//         this.service.toastrSucc(response.responseMessage)
//         $('#add_venue').modal('hide');
//         if (type == "modal") {
//           this.configureTeamArr = [{field:"", importance:"optional"}];
//         }
//         this.getTeamFields();
//       } else {
//         this.service.toastrErr(response.responseMessage)
//       }
//     })
//     //******************* End ******************//
//   }

//   getTeamFields () {
//     //************** Get Dynamic Team fields Api Integration *************//
//     let dynamicFieldsData = {	
//       "userId": this.userid._id,
//      // "competitionId": this.competitionId,
//     } 

//     this.service.postApi(`organizer/competition/getTeamFields`, dynamicFieldsData,1).subscribe(response => {
//       if(response.responseCode == 200) {
//         this.configureTeamList = response.result
//         // this.configureTeamList = (response.result).reverse()
//       }
//     })
//     //******************* End ******************//
//   }
// /************************************************/
// addOtherTeamField(){
//   var dataFill = false;
//   for(var i=0; i<this.configureTeamArr.length; i++){
//       if(this.configureTeamArr[i].field=="" ){
//           this.service.toastrErr('Please enter Team Field.')
//           dataFill = false;
//           break;
//       }else{ 
//           dataFill = true;
//       }
//   }      
//   if(dataFill == true){
//       this.configureTeamArr.push({field:"",importance:"optional"});
//   }        
// }
}
