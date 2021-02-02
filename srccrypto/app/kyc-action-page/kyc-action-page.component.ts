import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
declare var $ : any;
@Component({
  selector: 'app-kyc-action-page',
  templateUrl: './kyc-action-page.component.html',
  styleUrls: ['./kyc-action-page.component.css']
})
export class KycActionPageComponent implements OnInit {
  userKycId: any;
  kycData: any={};
  kycDocList: any=[];
  rejectionReason:string='';
  documentId: any;
  username: any;
  userId: any;
  documentIdd: any;
  kycIdd: any;
  kycStatus:string;
  ButtonDisable: any;
  data: any;
  constructor(public routes: ActivatedRoute, public service :ServiceService,private router : Router) { }

  ngOnInit() {
    this.routes.queryParams.subscribe(x=>{
    
      this.userKycId = x.id;
      this.getParticularKycDetail(this.userKycId)
    })
    
  }
   
  // Get Particular KYC Detail
  getParticularKycDetail(userId){
    var url = 'account/admin/kyc-management/get-kyc-details?userId='+userId;
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
    
      this.service.hideSpinner();
      if(res['status'] == 200){
        this.kycData = res['data'];
        this.kycDocList = this.kycData['document'][0];
        this.data=res['data'];
        this.documentIdd = this.kycData['document'][0]['documentId'];
        this.kycIdd = res['data']['kycId'];
        this.ButtonDisable=res['data']['kycStatus']
        this.kycStatus=res['data']['document'];
      }
     
      else{
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

  // Approve Document Function 
  openApproveModal(docId){
  this.documentId = docId;
  $('#approveModal').modal('show')
  }
   
  approveDocFunc(){
    var apiReq = {
      "documentId": this.documentId,
      "kycId": this.kycData['kycId'],
      "reason":"Valid Document",
      "status":"ACCEPTED"
    }
    this.service.showSpinner();
    this.service.post('account/admin/kyc-management/doc-status',apiReq).subscribe(res=>{
   
      this.service.hideSpinner();
      if(res['status'] == 200){
        $('#approveModal').modal('hide')
      this.getParticularKycDetail(this.userKycId)
      this.service.toasterSucc('Successfully Approved')
    }else{
      this.service.toasterErr(res['message']);
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

  // Reject Document Function
  openRejectModal(docId){
    this.documentId = docId;
    $('#rejectModal').modal('show')
 
  }
  //User Details
  userdetail(userId){

    this.router.navigate(['document-details/'+ userId])
  }

  rejectDocFunc(){
    var apiReq = {
      "documentId": this.documentId,
      "kycId": this.kycData['kycId'],
      "reason":this.rejectionReason,
      "status":'REJECTED'
    }
    this.service.showSpinner();
    this.service.post('account/admin/kyc-management/doc-status',apiReq).subscribe(res=>{
   
      this.service.hideSpinner();
      if(res['status'] == 200){
        $('#rejectModal').modal('hide')
      this.getParticularKycDetail(this.userKycId);
      this.service.toasterSucc('Successfully Rejected')
    }else{
      this.service.toasterErr(res['message']);
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

  back() {
    this.router.navigate(['/kyc-management'])
  }

  approveKyc(){
    this.service.showSpinner();
    let data = {
      "documentId": this.documentIdd,
      "kycId": this.kycIdd,
      "reason": "string",
      "status": "ACCEPTED"
    }
    this.service.post('account/admin/kyc-management/doc-status',data).subscribe((res:any)=>{
      console.log("hjuygidsu67tdsuk",res)
      if(res.status == 200) {
        console.log("jkdhsgdfgvs87dfdksjfhg",res);
       if (this.kycStatus=='ACCEPTED') {
          this.service.toasterSucc("Already Approved")
        }
        else{
          this.service.toasterSucc("Successfully Approved")
        }
        this.service.hideSpinner();
      }
      else {
        this.service.hideSpinner();
      }
    },(error)=>{
      this.service.hideSpinner();
    })
  }
  openModal(){
    $('#reject').modal('show')
  }
  rejectKyc() {
    // $('#reject').modal('show')
    this.service.showSpinner();
    let data = {
      "documentId": this.documentIdd,
      "kycId": this.kycIdd,
      "reason":this.rejectionReason,
      "status": "REJECTED"
    }
    this.service.post('account/admin/kyc-management/doc-status',data).subscribe((res:any)=>{
      console.log("hjuygidsu67tdsuk",res)
      if(res.status == 200) {
        console.log("jkdhsgdfgvs87dfdksjfhg",res);
        this.service.toasterSucc("Successfully Rejected")
        this.service.hideSpinner();
      }
      else {
        this.service.hideSpinner();
      }
    },(error)=>{
      this.service.hideSpinner();
    })
  }
}
