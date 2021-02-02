import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { filter } from 'minimatch';

declare var $:any
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userListLength: any;
  kycpendingListlength: any;
  activeUserLength: any;
  blockedUserLength:any;
  pendingUserLength:any
  coinList: any=[];
  countByKycStatus: any;
  totalUserCount: any;

  constructor(
    private service : ServiceService,
    private router : Router,
    private toastr: ToastrManager,
    private spinner: NgxSpinnerService,
    private http : HttpClient,
  ) { 
 
  }

  ngOnInit() {
  this.sidemenu();
  this.getUserList();
  this.getAllCoins();
  // this.getListOfKyc();
  // this.getAllCoins()
  // this.getCountDetails();
  }
  // http://182.72.203.244:3062/account/admin/dashboard/dashboardApi

  getCountDetails() {
    this.service.get('account/admin/dashboard/dashboardApi').subscribe((res)=>{
      console.log("hjgvjkhyfgkuyg",res)
    })
  }

  // Get List of User
  getUserList(){   
    var url = "account/admin/dashboard/dashboardApi";
       this.service.showSpinner();
       this.service.get(url).subscribe(res=>{
   
      this.service.hideSpinner();
      if(res['status'] ==  200){
        var userList = res['data'][0];
       this.activeUserLength = userList.activeUserCount;
       this.blockedUserLength = userList.blockUserCount;
       this.countByKycStatus = userList.countByKycStatus;
       this.pendingUserLength = userList.pendingUserCount;
       this.totalUserCount = userList.totalUserCount;
       this.userListLength = this.activeUserLength + this.blockedUserLength + this.pendingUserLength;
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

  // getListOFKYC Function
  getListOfKyc(){
   
    var url = 'account/admin/dashboard/pendingKycCount';
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
     
      this.service.hideSpinner();
      if(res['status']== 200){        
        this.kycpendingListlength = res['data'];
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
   // Get All The Coin Functionality
getAllCoins(){
  this.service.showSpinner();
  this.service.get('/wallet/admin/dashboard/get-deposit-and-coin-count').subscribe(res=>{
  
  this.service.hideSpinner();
  if(res['status']== 200){
    this.coinList = res['data'];  
  }
  },err=>{
 
  this.service.hideSpinner();
  if(err['status']=='401'){
  localStorage.clear();
  this.router.navigate(['/login']);
  this.service.toasterErr('Unauthorized');
  }else {
  this.service.toasterErr('Something Went Wrong');
  }
  })
  }

  
  
  sidemenu() {
    $(".btn-toggle,.close_panel").click(function() {
      $("body").toggleClass("toggle-wrapper");
  });
  }

  
}
