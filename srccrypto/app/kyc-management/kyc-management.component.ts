import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-kyc-management',
  templateUrl: './kyc-management.component.html',
  styleUrls: ['./kyc-management.component.css']
})
export class KycManagementComponent implements OnInit {
searchText:string=''
  pageNumber: number =1;
  status: string;
  kycList: any=[];
  kycData: any={};
  userKycId: any;
  kycDetail: any;
  constructor(public service : ServiceService,public router:Router) { }

  ngOnInit() {
    this.getListOfKyc('no-filter');
  }
  gotoview(id){
   
    this.router.navigate(['/kyc-action/id'],{
    queryParams:{id:id}})
    }
  // getStatus Function
  getStatus(event){
    this.status = event.target.value;
    if(this.status != '')
    {this.getListOfKyc('status')}
    else
   { this.getListOfKyc('no-filter');}
  }

  // getListOFKYC Function
  getListOfKyc(val){
    
    if(val == 'status'){
    this.searchText = ''
    var url = 'account/admin/kyc-management/filter-kyc-users-list?kycStatus='+this.status+'&page='+(this.pageNumber - 1)+'&pageSize=10';
  }
    else if(val == 'text')
    {var url = 'account/admin/kyc-management/filter-kyc-users-list?&page='+(this.pageNumber - 1)+'&pageSize=10&search='+this.searchText;}
    else{
      this.searchText = ''
    var url = 'account/admin/kyc-management/filter-kyc-users-list?&page='+(this.pageNumber - 1)+'&pageSize=10';
  }

    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
    
      this.service.hideSpinner();
      if(res['status']== 200){
        this.kycDetail = res['data'].totalCount
        this.kycList = res['data']['list'];
      }else {
        this.service.toasterErr(res['message']);
      }
    }, err=>{
   
      this.service.hideSpinner();
      if(err['status']=='401'){
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      }else{
      this.service.toasterErr('Something Went Wrong');
   }
    })
  }


  // Change Page Number
  changePageNumber(page){
    this.pageNumber = page;
    this.getListOfKyc('');
  }

  // Get Particular KYC Detail
  getParticularKycDetail(userId,kycId){
    this.userKycId = kycId;
    var url = 'account/admin/kyc-management/get-kyc-details?userId='+userId;
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
   
      this.service.hideSpinner();
      if(res['status'] ==  200){
        this.kycData = res['data']['document'];
     
        $('#view').modal('show');
      }
      else {
        this.service.toasterErr(res['message'])
      }
    }, err=>{
    
      this.service.hideSpinner();
      if(err['status']=='401'){
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      }else{
      this.service.toasterErr('Something Went Wrong');
   }
    })
  }

  // Document Action  Functionality

  documentActionFunc(action,documentNumber,documentId){
    var apiReq = {
      "documentId": documentId,
      "kycId": this.userKycId,
      "reason":action == 'ACCEPT' ? "Valid Document" : "Invalid Document",
      "status":action
    }
    this.service.showSpinner();
    this.service.post('account/admin/kyc-management/doc-status',apiReq).subscribe(res=>{
    
      this.service.hideSpinner();
    },err=>{
  
      this.service.hideSpinner();
    })
  }

}
