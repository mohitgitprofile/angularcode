import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ngxCsv } from 'ngx-csv/ngx-csv';

declare var $:any
@Component({
  selector: 'app-report-management',
  templateUrl: './report-management.component.html',
  styleUrls: ['./report-management.component.css']
})
export class ReportManagementComponent implements OnInit {
  searchForm: FormGroup;
  pagination: any = {limit: 10, currPage: 1, total: 0};
  userList: any = [];
  copyUserList: any = [];
  sortOnCreatedAtKey: any = 1;
  sortOnUpdateedAtKey: any = 1;
  sortOnNameKey: any = 1;
  pageNumber : any = 1;
  
  totalUsers: any = 0;
  whichmodal: string;
  particularUserData: any;
  permission: any = [];
  calender: any = { toDate: '', formdate: '' }
  minAge: Date;
  fromDate: any = '';
  twoDate: any = '';
  reportLists: any=[];
  search: any;
  constructor(
    private service: ServiceService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    // this.permission = !!JSON.parse(localStorage.getItem('permission')) ? (JSON.parse(localStorage.getItem('permission')).length ? JSON.parse(localStorage.getItem('permission')) : [] ) : [];
  }

  ngOnInit() {
 
    this.form();
    this.reportList();
  }

  form() {
    this.searchForm = new FormGroup({
      search   : new FormControl('')
    });
  }

  reset() {
    this.searchForm.reset();
    this.reportList();
  }

  reportList(){
    let data={

    }
    this.service.postApii('admin/listOfReport', data,1).subscribe((success)=>{
      console.log("df", success);
      if(success.response_code==200){
      // this.service.success(success.response_message);
      this.reportLists=success.result[0].docs;
      }
    },(error)=>{
      this.service.error("something went wrong")
    })
  }
  searchData(event){
    this.search=event
    this.searchByName()
  }

  searchByName(){
    let data={
      search:this.search
    }
    this.service.postApii('admin/listOfReport', data, 1).subscribe((success)=>{
      console.log("fg", success);
      
      if(success.response_code==200){
        // this.service.success(success.response_message)
        this.reportLists=success.result[0].docs
      }
      else{
        this.reportLists=[];
        this.reportLists=success.result[0].docs;
        // this.service.error(success.response_message)
      }
    })
  }

  ignoreReport(id) {
    this.spinner.show();
    this.service.postApii('admin/ignoreReport', {reportId:id}, 1).subscribe((res:any)=>{
      console.log("jkdfuhg89ds7fgydhjksf",res);
      if(res.response_code == 200) {
        this.reportList();
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    },(error)=>{
      this.spinner.hide();
    })
  }


  // route
  goToViewReport(id){
    this.router.navigate(['/view-report'],{queryParams:{id:id}})
  }

//   formdate() {
//     console.log('this.calender.formdate', this.calender.formdate)
//     this.fromDate = new Date(this.calender.formdate)
//     console.log('this.fromDate ==> 1', this.fromDate)
//     this.fromDate = this.fromDate.getTime()
//    console.log('this.fromDate ==> 2', this.fromDate)
//    let newDate = new Date(this.fromDate)
//    console.log(newDate)
// }

// todate() {
//   this.twoDate = new Date(this.calender.todate)
//   console.log('this.twoDate ==>1', this.twoDate)
//   this.twoDate = this.twoDate.getTime()
//   console.log('this.twoDate ==>2', this.twoDate)
// }

// getUserList() {
//   let data = {
//     search : this.searchForm.value.search,
//   }
//   this.service.postApii('admin/showallCustomers', data,  1).subscribe(success => {
//     console.log("success",success);
//     if(success.response_code == 200) {
//       // this.service.success(success.response_message)
//       this.copyUserList = success.result.docs;
//       this.spinner.hide();
//     }
//     else {
//       this.spinner.hide();
//     }
//   })

// }


  userListPagination(event) {
    this.pagination.currPage = event;
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
      
    } else {
      if (enableorDisable === 'enable') {
        console.log("Inside Enable Block")
        this.enableSubadmin(this.particularUserData);
        $('#enableDisableDeleteModal').modal('hide');
        
      } else {
        console.log("Inside Delete Block")
        this.deleteReport(this.particularUserData);
        $('#enableDisableDeleteModal').modal('hide');
        
      }
    }
    // this.getUserList();
  }

  disableSubadmin(data) {
    this.spinner.show();
    this.service.postApii('admin/deleteAndBlockUser', {userId:data, status: 'BLOCK'},  1).subscribe(success => {
      if(success.response_code == 200) {
        // this.service.success(success.response_message)
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })
  }
  enableSubadmin(data) {
    this.spinner.show();
    this.service.postApii('admin/deleteAndBlockUser', {userId:data, status:'ACTIVE'},  1).subscribe(success => {
      if(success.response_code == 200) {
        // this.service.success(success.response_message)
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })
  }
  deleteReport(data) {
    this.service.postApii('admin/deleteReportAndPost', {reportId:data._id},  1).subscribe(success => {
      if(success.response_code == 200) {
        // this.service.success(success.response_message)
        this.spinner.hide();
        this.reportList()
      }
      else {
        this.spinner.hide();
      }
    })
  }

  
  getEmailOrPhone(objectVal) {
    let v = objectVal.Attributes.filter(item => {
       return item.Name === 'phone_number';
    });
    return v;
  }

  openView(data) {
    this.router.navigate(['/viewuser', data.Username]);
  }


  exportCSV() {
    let dataArr = [];
    dataArr.push({
        sno: "S.No.",
        Reportedby: "Reported By",
        Reportreason: "Report Reason",
        Reporteditem: "Reported Item Type",
        Reportedname: "Reported Item Name",
        Reportedon:"Reported On",
    });
  
    this.reportLists.forEach((element,ind) => {
        dataArr.push({
            sno:ind+1,
            Reportedby:element.reportedBy?element.reportedBy:'--',
            Reportreason:element.reportReason?element.reportReason:'--',
            Reporteditem: element.reportItemType?element.reportItemType:'--',
            Reportedname:element.reportItemName?element.reportItemName:'--',
            Reportedon:element.createdAt?element.createdAt:'--',
        })
    }) 
    new ngxCsv(dataArr, 'Report_management');
  }



}
