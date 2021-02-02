import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

declare var $:any
@Component({
  selector: 'app-market-management',
  templateUrl: './market-management.component.html',
  styleUrls: ['./market-management.component.css']
})
export class MarketManagementComponent implements OnInit {
  tab: any;
  pageNumber:number = 1
  basicTradingList: any=[];
  basicTradingDetail: any={};
  constructor(
    private router : Router, public route : ActivatedRoute, public service:ServiceService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(x=>{
      console.log('Params--->>',x);
      this.tab = x['action'];
    })
    this.getBasicTradingList(this.tab);
    this.sidemenu();
  }
  sidemenu() {
    $(".btn-toggle,.close_panel").click(function() {
      $("body").toggleClass("toggle-wrapper");
  });
  }

  // Tab Navigation
  tabNav(tab){
    this.pageNumber = 1 ;
    this.getBasicTradingList(tab);
    this.router.navigate(['/market-management',tab])
  }

  // Change Page Functionality
  changePageFunc(page){
   this.pageNumber = page;
   this.getBasicTradingList(this.tab);
  }

  // Get List of  Buy Basic Trading Managment
  getBasicTradingList(tab){
    this.tab = tab;
    this.basicTradingList = [];
    this.basicTradingDetail = {};
    var url ;
    
    if(this.tab == 'buy'){
   url = "wallet/admin-basic-exchange/get-all-exchange-history?orderType=BUY&page="+(this.pageNumber - 1)+"&pageSize=10";
    }else {
      url = "wallet/admin-basic-exchange/get-all-exchange-history?orderType=SELL&page="+(this.pageNumber - 1)+"&pageSize=10";
    }
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
      this.service.hideSpinner();
      if(res['status'] == 200){
        this.basicTradingDetail = res['data'];
      this.basicTradingList = res['data']['resultlist']
      console.log("=====>>>",this.basicTradingDetail )
     
      }else{
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
  //EXPORT
  // exportAsXLSX(){
  //   let dataArr = [];
  //   this.walletArry.forEach((element,ind) => {
  //   // console.log('data', element.business.business_name)
  //   dataArr.push({
  //   "S no":ind+1,   
  //   "User ID":element.userId?element.userId:'',
  //   "Name":element.userName?element.userName:'',
  //   "Email":element.userEmail?element.userEmail:'N/A',
  //   "Coin":element.coinType?element.coinType:"N/A",
  //   "Type":element.txnType?element.txnType:"",
  //   "Date":element.txnTime?element.txnTime:'',
  //   "Transaction ID":element.txnHash?element.txnHash:'',
  //   "Amount":element.amount?element.amount:'',
  //   })
  //   })
  //   console.log("----",dataArr)
  //   this.service.exportAsExcelFile(dataArr,'Admin User list');
  //   }
  // }
  
}
