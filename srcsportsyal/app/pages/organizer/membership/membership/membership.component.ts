import { Component, OnInit } from '@angular/core';
import { FormGroup } from '../../../..';
import { FormControl, Validators } from '@angular/forms';
import { MainService } from '../../../../providers/mainService.service';
import { GlobalConstant } from '../../../../global/global.constant';
declare var $:any;
@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {
  addmemberForm: FormGroup;
  memberphoto: any=['assets/images/basket.png'];
  base64: string;
  counter: number=0;
  terms: boolean=false;
  userid: any = {};
  clublist: any=[];
  clubid: any;
  filter: any = { currPage: 1, limit: GlobalConstant.paginationLimit };
  applyForm: FormGroup;
  searchForm: FormGroup;
  memberdata: any={};
  memberList: any=[];
  pageLimit: any;
  pageTotal: any;
  membershipid: any;
  eachmemeberData: any={membershipName : '',clubName:'',status:'',imageURL:''};
  editmemberphoto: any=[];
  editmemberimage: string;
  editmemberForm: FormGroup;
  constructor(public service:MainService) {
    window.scrollTo(0, 0)
  }

  ngOnInit() {
    this.userid = JSON.parse(localStorage.getItem('userDetailYala') );
    console.log("User--> ",this.userid)
    console.log("User Id--> ",this.userid._id);
    this.addmemberFormfunction();
    this.clublistApi();
    this.membersListApi('',this.filter.currPage);
  }
addmemberFormfunction(){
  this.addmemberForm = new FormGroup ({ 
    image:new FormControl('',Validators.required),
    membername: new FormControl('', [Validators.required ,Validators.pattern(/^[a-zA-Z\s]*$/)]),
     clubs: new FormControl('',Validators.required),
     status: new FormControl('', [Validators.required]),
     accept:new FormControl('',)
  });
  this.applyForm = new FormGroup({
    clubname : new FormControl('',Validators.required)
  });
  this.searchForm = new FormGroup({
    searchname: new FormControl('',[Validators.pattern(/^[a-zA-Z\s]*$/)])
  })
  /*********** Edit Membership Form ******************/
  this.editmemberForm = new FormGroup ({ 
    image:new FormControl('',Validators.required),
    membername: new FormControl('', [Validators.required ,Validators.pattern(/^[a-zA-Z\s]*$/)]),
     clubs: new FormControl('',Validators.required),
     status: new FormControl('', [Validators.required]),
     accept:new FormControl('',Validators.required)
  });
}
/*********************** Image Conversion/***********************/
onUploadChange(evt: any) {
  this.memberphoto = [] 
  // this.service.spinnerShow();
  const file = evt.target.files[0];
  
  if (file) {
    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
    // this.service.spinnerHide();
  }
}

handleReaderLoaded(e) {
  this.memberphoto.push('data:image/png;base64,' + btoa(e.target.result)); 
  this.base64 = 'data:image/png;base64,' + btoa(e.target.result) ;
}
/*********************** Image Conversion/***********************/
/*********************** Image Conversion/***********************/
editimage(evt: any) {
  this.editmemberphoto = [] 
  // this.service.spinnerShow();
  const file = evt.target.files[0];
  
  if (file) {
    const reader = new FileReader();
    reader.onload = this.editreadfer.bind(this);
    reader.readAsBinaryString(file);
    // this.service.spinnerHide();
  }
}
editreadfer(e) {
  this.editmemberphoto.push('data:image/png;base64,' + btoa(e.target.result)); 
  this.editmemberimage = 'data:image/png;base64,' + btoa(e.target.result) ;
}
/*********************** Image Conversion/***********************/
/****************** Add Form Value ****************/
addmemberFunc(value){
  var addmember = value;
  console.log("Form Value ==> ",value);
  let addmemberData = {
    "organizerId":this.userid._id,
    "clubId":this.clubid,
    "membershipName":addmember.membername,
    "clubName":addmember.clubs,
    "status":addmember.status,
    "allowPublicToFollow":this.terms?this.terms:'false',
    "imageURL":this.base64
  }
  console.log("AddmemberData---> ",JSON.stringify(addmemberData));
  this.service.postApi(`membership/addMembership`, addmemberData, 1).subscribe(response => {
    if(response.responseCode == 201) {
     console.log("Message---> ",response.responseMessage);
     this.memberphoto =['assets/images/basket.png'];
     this.addmemberForm.reset();
     this.membersListApi('',this.filter.currPage);
     $('#create_club').modal('hide');
     this.addmemberForm.reset();
    } else if(response.responseCode == 402) {
      console.log("Message---> ",response.responseMessage);
    }
  })
}
/************** Check box ************/
checkbox(){
  console.log("checkbox--> ",this.terms);
  if((this.counter == 0)|| (this.counter % 2 == 0))
  this.terms = true;
  else
  this.terms = false;
  this.counter++;
  console.log("Counter--> ",this.counter);
}
/*********** Club List *****************/
clublistApi(){
  var url = `data/selectClub?userId=`+this.userid._id;
   this.service.getApi(url,1).subscribe(response => {
    if(response.responseCode == 200) {
     console.log(JSON.stringify(response));
     this.clublist = response.result;
     console.log("Club list--> ",this.clublist);
    } else if(response.responseCode == 402) {
      
    }
  });
}
/************ club id calculation **********/
public onChange(event): void { 
   var newVal = event.target.value;
   console.log("clubname--> ",newVal);
  for(var i = 0; i<this.clublist.length;i++){
    if( newVal == this.clublist[i].clubName){
        this.clubid = this.clublist[i]._id;
       console.log("ClubId==> ",this.clubid);     
    }
  }
}
/**************** Membership List *************/
membersListApi(val,page){
  this.filter.currPage = page;
  var data = val;
  console.log("Form Value",JSON.stringify(val));
 var member =  {
    "page":this.filter.currPage,
    "limit":this.filter.limit,
    "clubName":data.clubname?data.clubname:"",
    "membershipStatus":"",
    "search":data.searchname?data.searchname:""
  }
 console.log("Member List---> ",JSON.stringify(member)); 
 var url = `membership/getListOfMembership?organizerId=`+this.userid._id;
 this.service.postApi(url,member,1).subscribe(response => {
  if(response.responseCode == 200) {
   this.memberdata = response.result;
   this.memberList = this.memberdata.docs;
   this.pageLimit = this.memberdata.limit ;
   this.pageTotal = this.memberdata.total
   console.log("memberdata---> ",this.memberdata);
   console.log("Member List---> ",this.memberList);
  } else if(response.responseCode == 402) {
    console.log(JSON.stringify(response));
  }
});
}
/***************** Edit Membership ***************/
edit(id){
  this.membershipid = id;
  console.log("Member Id---> ",this.membershipid);
  var url = `membership/getAMembership?organizerId=`+this.userid._id+`&membershipId=`+this.membershipid;
  this.service.getApi(url,1).subscribe(response => {
    console.log(JSON.stringify(response));
   if(response.responseCode == 200) 
   {
     this.eachmemeberData = response.result;
     this.editmemberphoto = [this.eachmemeberData.imageURL] ;
     //this.onChange(this.eachmemeberData.clubName);
     console.log("Data--> ",JSON.stringify(this.eachmemeberData.membershipName));
     $('#edit_club').modal('show');
   } 
   else if(response.responseCode == 402) 
   {
    
   }
 });
}
editmemberFunc(formvalue){
  console.log("Form Value---> ",JSON.stringify(formvalue));
  var editdata = formvalue;
  var edited = {
    "organizerId":this.userid._id,
  "membershipName":editdata.membername?editdata.membername:this.eachmemeberData.memberName,
  "membershipId":this.membershipid,
  "clubName":editdata.clubs?editdata.clubs:this.eachmemeberData.clubName,
  "clubId":this.clubid,
  "status":editdata.status?editdata.status:this.eachmemeberData.status,
  "allowPublicToFollow":editdata.accept?editdata.accept:"false",
  "imageURL":this.editmemberimage?this.editmemberimage:this.editmemberphoto
   }
  console.log("Edit Member Data---> ",JSON.stringify(edited));
  this.service.postApi(`membership/editMembership`,edited,1).subscribe(response => {
    if(response.responseCode == 200) {
      $('#edit_club').modal('hide');
      this.editmemberForm.reset();
      this.membersListApi('',this.filter.currPage);
    }  
    else if(response.responseCode == 402) {
      console.log(JSON.stringify(response));
    }
  });
}
/*********** Delete Membership ***************/
delete(id){
  this.membershipid = id;
  console.log("Member Id---> ",this.membershipid);
  $('#delete').modal('show');
}
deletememberApi(){
  var url =`membership/deleteMembership?membershipId=`+this.membershipid;
  this.service.getApi(url,1).subscribe(response => {
    console.log(JSON.stringify(response));
   if(response.responseCode == 204) 
   {
     $('#delete').modal('hide');
     this.membersListApi('',this.filter.currPage);
   } 
   else if(response.responseCode == 402) 
   {
    
   }
 });  
}
}
