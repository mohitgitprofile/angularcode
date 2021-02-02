import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-walletdetails',
  templateUrl: './walletdetails.component.html',
  styleUrls: ['./walletdetails.component.css']
})
export class WalletdetailsComponent implements OnInit {
  balance: any;
  sdm: any;
  arrt: any;
  arr1: any=[];
  data: any=[];
  userDetail: any=[];

  constructor(private router:Router, public service:ServiceService , private route:ActivatedRoute) { }
  walletDetail: any=[];
  userID:any;
  userId:any =[];

  ngOnInit() {

    let obj = this.route.params.subscribe(params => {
      this.userId = (params['id']); // (+) converts string 'id' to a number
     
       localStorage.setItem('userId',this.userId)
       });
       this.getWalletDetails();
  }

  getWalletDetails(){
    let dataarr=[]
    var url = 'wallet/wallet/get-all-user-balance-and-coinlist-withName?userId='+ this.userId;
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
   
      this.service.hideSpinner();
      if(res['status']==200){
       this.walletDetail = res['data'].userBalance
       this.userDetail = res['data'].userDetails.name
       
       
      }else {
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
}
