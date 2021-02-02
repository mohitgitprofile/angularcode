import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { subscribeOn } from 'rxjs/operators';
import { ngxCsv } from 'ngx-csv/ngx-csv';
declare var $: any;
@Component({
  selector: 'app-community-management',
  templateUrl: './community-management.component.html',
  styleUrls: ['./community-management.component.css']
})
export class CommunityManagementComponent implements OnInit {

  searchForm: FormGroup
  pagination: any = {limit: 10, currPage: 1, total: 0};
  userList: any = [];
  copyUserList: any = [];
  sortOnCreatedAtKey: any = 1;
  sortOnUpdateedAtKey: any = 1;
  sortOnNameKey: any = 1;
  totalUsers: any = 0;
  whichmodal: string;
  particularUserData: any;
  permission: any = [];
  calender: any = { toDate: '', formdate: '' }
  minAge: Date;
  fromDate: any = '';
  twoDate: any = '';
  searchByName: any;

  constructor(
    private service: ServiceService,
    private router: Router,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit() {
    this.form();
    this.getUserList();
  }


  searchValue(value){
    this.searchByName=value
    console.log("hgfhgf",this.searchByName);
    
    this.searchUser();
  }
  searchUser() {
    this.service.postApii('admin/listOfCommunity', {search:this.searchByName},  1).subscribe(success => {
      console.log("success",success);
      if(success.response_code == 200) {
        // this.service.success(success.response_message)
        this.copyUserList = success.result[0].docs;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.copyUserList=[];
        this.copyUserList=success.result[0].docs;
      }
    })
  }


  form() {
    this.searchForm = new FormGroup({
      search   : new FormControl('')
    });
  }

  reset() {
    this.searchForm.reset();
    this.getUserList();
  }
  getUserList(){
    let data = {
      communityId : '',
      search: ''
    }
    this.service.postApii('admin/listOfCommunity', data,1).subscribe(success=>{
      console.log("hgfjhfjh",success);
      
      if(success.response_code == 200) {
        this.copyUserList = success.result[0].docs;
        console.log("jhfhgyfhgfhj",this.copyUserList);
        
      }
      else {
        this.spinner.hide();

      }
    },(error=>{
      this.spinner.hide();
      console.log("hjmfghjfgjkhfkjhfhjkf",error)
    }))
  }
  gotonextPage() {
    this.router.navigate(['/addcommunity']);
  }
  enableDisableOrDeleteOpenModal (data, whichModal) {
    console.log("Data >>>>> ",data)
    if (whichModal === 'enable') {
      this.whichmodal = 'enable';
    } else {
      if (whichModal === 'disable') {
        this.whichmodal = 'disable';
      } else {
        this.whichmodal = 'delete';
      }
    }
    this.particularUserData = data;
    $('#enableDisableDeleteModal').modal({backdrop: 'static', keyboard: false});
  }

  anableDisable(enableorDisable) {
    if (enableorDisable === 'disable') {
      console.log("Inside Disable Block")
      this.disableSubadmin(this.particularUserData);
      $('#enableDisableDeleteModal').modal('hide');
      this.getUserList();
    } else {
      if (enableorDisable === 'enable') {
        console.log("Inside Enable Block")
        this.enableSubadmin(this.particularUserData);
        $('#enableDisableDeleteModal').modal('hide');
        this.getUserList();
      } else {
        console.log("Inside Delete Block")
        this.deleteSubadmin(this.particularUserData);
        $('#enableDisableDeleteModal').modal('hide');
        this.getUserList();
      }
    }
  }

  disableSubadmin(data) {
    console.log("disableSubadmin",data);
    
    let dataa ={
      userId:data,
      status: 'BLOCK'
    }
    this.spinner.show();
    this.service.postApii('admin/deleteAndBlockCommunity', dataa,  1).subscribe(success => {
      if(success.response_code == 200) {
        this.service.success("Successfully blocked.")
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })
  }
  enableSubadmin(data) {
    console.log("enableSubadmin",data);
    let dataa ={
      userId:data,
      status: 'ACTIVE'
    }
    this.spinner.show();
    this.service.postApii('admin/deleteAndBlockCommunity', dataa,  1).subscribe(success => {
      if(success.response_code == 200) {
        this.service.success("Successfully activated.")
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })
  }
  deleteSubadmin(data) {
    this.spinner.show();
    this.service.postApii('admin/deleteAndBlockCommunity', {userId:data},  1).subscribe(success => {
      if(success.response_code == 200) {
        // this.service.success(success.response_message)
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })
  }

  exportCSV() {
    let dataArr = [];
    dataArr.push({
        sno: "S.No.",
        Name: "Name",
        Logo: "Logo",
        Phone: "Type",
        Link: "Link",
    });
  
    this.copyUserList.forEach((element,ind) => {
        dataArr.push({
            sno:ind+1,
            Name:element.communityName?element.communityName:'--',
            Logo:element.coverPage?element.coverPage:'--',
            Type: element.communityType?element.communityType:'--',
            Link: element.link?element.link:'--',
        })
    }) 
    new ngxCsv(dataArr, 'Community_management');
}


}
