import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $:any
@Component({
  selector: 'app-sub-admin-management',
  templateUrl: './sub-admin-management.component.html',
  styleUrls: ['./sub-admin-management.component.css']
})
export class SubAdminManagementComponent implements OnInit {
  pageNumber:number=1;
  beDisable: boolean=true;
  userForm: FormGroup;
  userID: any;
  action: any;
  userList: any=[];
  searchText:string=''
  userDetail: any={};
  space:string= ' ';
  viewId: any;
  unblockId: any;
  blockId: any;
  deleteId: any;
  viewArry: any = [];
  blockid: any;
  unblockid: any;
  delid: any;
  total: any;
  seacrhdata: any;
  minAge: Date;
  calender: any = { todate: '', formdate: '' }
  searchobj: any = { usersearch: "" }
  fromDate: any;
  twodate: any;
  p: number = 1;

  constructor(
    private router : Router, public service:ServiceService
  ) { }

  ngOnInit() {
    this.allSubadminList()
  }
  
  createsub() {
    this.router.navigate(['/create-subadmin'])
}

search() {
  this.allSubadminList()
}
clearSearch() {
  if (this.searchobj.usersearch == '') {
      this.allSubadminList()
  }
}

allSubadminList() {
  this.service.showSpinner();
  this.service.get('account/admin/user-management/filter-user-details?roleStatus=' + 'SUBADMIN' + '&search=' + this.searchobj.usersearch).subscribe((res) => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
          this.userList = res['data'].list
        
      } else {
        
      }
  }, (err) => {
      this.service.hideSpinner();
  })
}




// Delete / Block Function
openModal(action,userId){
  this.userID = userId;
  this.action = action ;
  if(action == 'DELETE'){
   $('#deleteModal').modal('show')

  }else if(action == 'BLOCK') {
    $('#block').modal('show')
  }
  else {
    $('#active').modal('show')
  }
}


// Delete User 
deleteFunction(){
  var url = 'account/admin/user-management/delete-user-detail?userId='+this.userID;
  this.service.showSpinner();
  this.service.get(url).subscribe(res=>{
  
    this.service.hideSpinner();
    if(res['status'] == 200){
          $('#deleteModal').modal('hide')
        this.service.toasterSucc('Sub Admin Deleted Successfully');
           this.allSubadminList();
    }
  },err=>{
  
    this.service.hideSpinner();
    if(err['status']=='401'){
      this.service.onLogout();
      this.service.toasterErr('Unauthorized Access');
    }else{
    this.service.toasterErr('Something Went Wrong');
 }
  })
}

performAction(){
  var url = 'account/admin/user-management/user-status?userId='+this.userID+'&userStatus='+this.action;
  this.service.showSpinner();
  this.service.get(url).subscribe(res=>{
  
    this.service.hideSpinner();
    if(res['status'] == 200){
     if(this.action == 'BLOCK'){
        $('#block').modal('hide');
        this.service.toasterSucc('Sub Admin Blocked Successfully');
      }
      else {
        $('#active').modal('hide');
        this.service.toasterSucc('Sub Admin Activated Successfully');
      }
      this.allSubadminList();
    }
  },err=>{
  
    this.service.hideSpinner();
    if(err['status']=='401'){
      this.service.onLogout();
      this.service.toasterErr('Unauthorized Access');
    }else{
    this.service.toasterErr('Something Went Wrong');
 }
  })
}

 
}
