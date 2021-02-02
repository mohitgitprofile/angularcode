import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalConstant } from '../../../../global/global.constant';
import { MainService } from '../../../../providers/mainService.service';
declare var $:any;
@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {
  applyForm: FormGroup;
  filter: any = { currPage: 1, limit: GlobalConstant.paginationLimit };
  searchForm: FormGroup;
  userid: any;
  memberList: any=[];
  approvaldata: any = [];
  followList:any=[];
  pageLimit: any;
  pageTotal: any;
  approved: { "playerId": any; "membershipId": any; "organizerId": any; "followStatus": any; };
  formnumber: any;
  approveData: { "organizerId": any; "membershipName": any; "search": string; "page": any; "limit": number; };
  constructor(public service: MainService) { }

  ngOnInit() {
    this.userid = JSON.parse(localStorage.getItem('userDetailYala') );
    console.log("User--> ",this.userid)
    console.log("User Id--> ",this.userid._id);
    this.formvalidation();
    this.membershipListApi();
    this.approvalListApi("",this.filter.currPage,1);
  }
formvalidation(){
  this.applyForm = new FormGroup({
    approval : new FormControl('',Validators.required)
  });
  this.searchForm = new FormGroup({
    search: new FormControl('',)
  })
}
/*********** Get MemberShip List Api *********/
membershipListApi(){
  var url = `membership/selectMembership?organizerId=`+this.userid._id;
  this.service.getApi(url,1).subscribe(response => {
   if(response.responseCode == 200) {
   // console.log(JSON.stringify(response));
    this.memberList = response.result;
    //console.log("Memember list--> ",this.memberList);
   } else if(response.responseCode == 402) {
     
   }
 });
}
/********** Approval List Api ***************/
approvalListApi(formval,page,id){
  this.formnumber = id;
  this.filter.currPage= page ;
  this.followList =[];
console.log("Formval ---> ",JSON.stringify(formval)+"  Page --> ",page);
if(this.formnumber == 1){
  this.approveData = {	
    "organizerId":this.userid._id,	
    "membershipName":formval.approval?formval.approval:"",
    "search":"",		
      "page":this.filter.currPage,						
      "limit":4,					
  }
}
else{
  this.approveData = {	
    "organizerId":this.userid._id,	
    "membershipName":"",
    "search":formval.search,		
      "page":this.filter.currPage,						
      "limit":4,					
  }
}

console.log("Form Value --> ",JSON.stringify(this.approveData));
this.service.postApi(`membership/getApprovalList`,this.approveData,1).subscribe(response => {
  // console.log(JSON.stringify(response));
 if(response.responseCode == 200) {
  var paginationData = response.result;
  this.pageLimit = paginationData.limit;
  this.pageTotal = paginationData.total;
  this.approvaldata = response.result.docs;
 for(var i=0;i<this.approvaldata.length;i++){
   for(var j=0;j<this.approvaldata[i].playerFollowStatus.length;j++){
     this.followList.push(
       { 'membershipid':this.approvaldata[i]._id,
         'orgainzerid':this.approvaldata[i].organizerId[0],
         'playerid':this.approvaldata[i].playerFollowStatus[j].playerId,
         'followStatus':this.approvaldata[i].playerFollowStatus[j].followStatus                  
    })
   }
 }
//  console.log("List Player Follow Array--> ",this.followList);
 } else if(response.responseCode == 402) {
   console.log(JSON.stringify(response));
 }
});
}
/************** Approve Api ***************/
approve(playerid,membershipid,organizerid){
    console.log("PlayerID----> ",playerid+"  Status---> ",status);
    console.log("membershipid----> ",membershipid+"  organizerid---> ",organizerid);
this.approved = {
      "playerId":playerid,
      "membershipId":membershipid,
      "organizerId":organizerid,
      "followStatus":"APPROVED"
    }
    console.log("Approve Data--> ",JSON.stringify(this.approved));
    $('#approve').modal('show');
  }
  approveApi(){
 var approvedoc = this.approved;
 console.log("Approve Doc--> ",JSON.stringify(approvedoc));
 this.service.postApi(`membership/approveMembership`,approvedoc,1).subscribe(response => {
  console.log(JSON.stringify(response));
 if(response.responseCode == 200) {
  $('#approve').modal('hide');
  this.approvalListApi("",this.filter.currPage,1);
 }
  else if(response.responseCode == 402) {
   console.log(JSON.stringify(response));
 }
});
  }
  /************ Delete Approval Api ****************/
  delete(playerid,membershipid,organizerid,status){
    console.log("PlayerID----> ",playerid+"  Status---> ",status);
    console.log("membershipid----> ",membershipid+"  organizerid---> ",organizerid);
this.approved = {
      "playerId":playerid,
      "membershipId":membershipid,
      "organizerId":organizerid,
      "followStatus":status
    }
    console.log("Approve Data--> ",JSON.stringify(this.approved));
    $('#delete').modal('show');
  }
  deleteApi(){
    console.log("Delete");
    var url = `membership/unFollowMembership?playerId=`+this.approved.playerId+`&membershipId=`+this.approved.membershipId;
    this.service.getApi(url,1).subscribe(response => {
      if(response.responseCode == 200) {
      console.log("Delete Successfully");
      $('#delete').modal('hide');
      this.approvalListApi("",this.filter.currPage,1);
      } else if(response.responseCode == 402) {
        console.log("Delete UnSuccessfully")
      }
    });
  }
}
