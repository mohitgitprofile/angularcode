import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
declare var $:any
@Component({
  selector: 'app-daily-limit',
  templateUrl: './daily-limit.component.html',
  styleUrls: ['./daily-limit.component.css']
})
export class DailyLimitComponent implements OnInit {
  coinList: any=[];
  coinName: any;
  selectedCoin: any;

  constructor(public service: ServiceService, public router: Router) { }

  ngOnInit() {
    this.getAllCoins()
  }

  // Get All The Coin Functionality
getAllCoins(){
  this.service.showSpinner();
  this.service.get('wallet/wallet/get-all-user-balance-and-coinlist').subscribe(res=>{

  this.service.hideSpinner();
  if(res['status']== 200){
  var coinList = res['data'].coinList;
  for(var x = 0;x< coinList.length;x++){
  coinList[x]['walletBalance'] = res['data'].userBalance[x].walletBalance;
  coinList[x]['blockedBalance'] = res['data'].userBalance[x].blockedBalance;
  }
  this.coinList = coinList;

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

  // Update Coin Withdraw Fee Functionality
  updateCoinWithdrawFee(withdrawalAmount,coinName){
    // admin/fee-management/set-withdrawal-fee
    var url = 'wallet/admin/fee-management/set-withdrawal-fee?coinName='+coinName+'&withdrawalFee='+withdrawalAmount;
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
      this.service.hideSpinner();
      if(res['status']== 200){
        this.getAllCoins();  
        this.service.toasterSucc('Withdraw Fee Updated Succesfully')   
      }else {
        this.service.toasterErr(res['message'])
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
