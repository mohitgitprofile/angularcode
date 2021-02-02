import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userDetail: any;
  pageNumber: number = 1;
  userID: any;
  userId: any = [];
  currTab: any = 'general';
  currTabb: any = 'BTC';
  staffForm: FormGroup;
  loginDetails: any = [];
  email: any;
  tradingForm: FormGroup;
  tradingList: any = [];
  tradingListlength: any;
  viewTrading: boolean = false;
  viewTradingg: boolean = false;
  viewEth: boolean = false;
  viewXrp: boolean = false;
  viewLtc: boolean = false;
  walletDetailsList: any = [];
  walletDetailsListLength: any;
  coinList: any = [];
  constructor(private router: Router, public service: ServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.staffForm = new FormGroup({
      status: new FormControl(''),
      role: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
      search: new FormControl('')
    });
    this.tradingForm = new FormGroup({
      tradingstatus: new FormControl(''),
      tradingCurrency: new FormControl(''),
      tradingfromDate: new FormControl(''),
      tradingtoDate: new FormControl('')
    })

    let obj = this.route.queryParams.subscribe(params => {
      console.log("fhsgfsf", params);

      this.userId = (params['userId']); // (+) converts string 'id' to a number
      this.email = (params['email']);

      localStorage.setItem('userId', this.userId)
    });
    this.viewDetail();
    this.getProfile();
    this.getTradingHistory();
    this.walletDetails();
    // this.reverseArr();

  }

  selectTab(tab) {
    this.currTab = tab;
  }
  selectTabb(tab) {
    this.currTabb = tab;
    if (this.currTabb == 'ETH') {
      this.walletDetailss('ETH');
    }
    else if (this.currTabb == 'XRP') {
      this.walletDetailss('XRP');
    }
    else if (this.currTabb == 'LTC') {
      this.walletDetailss('LTC');
    }
    else if (this.currTabb == 'BTC') {
      this.walletDetailss('BTC');
    }
  }


  walletDetails() {
    this.service.showSpinner();
    this.service.get('wallet/admin/transaction-history/get-all-transaction-history?coinName=' + (this.currTabb) + '&page=' + (0) + '&pageSize=' + (10) + '&fkUserId=' + (this.userId)).subscribe((res: any) => {
      console.log("hyfgsjhy8768isgjhsg", res)
      if (res.status == 200) {
        this.walletDetailsList = res.data.resultlist;
        this.walletDetailsListLength = res.data.totalCount;
        console.log( this.walletDetailsListLength)
        this.service.hideSpinner();
      }
      else {
        this.service.hideSpinner();
      }
    }, (error) => {
      this.service.hideSpinner();
    })
  }

  getProfile() {
    this.service.showSpinner();
    this.service.get('account/get-user?email=' + (this.email)).subscribe((res) => {
      console.log("hgfsjdhcfgf", res)
      this.loginDetails = res['data']
      console.log("hgfsjdhcfgf", this.loginDetails)
      this.service.hideSpinner();
    })
  }
  viewCoinDetails(transactionId) {
    this.service.showSpinner();
    this.getCoinDetailsByuserId(transactionId);
    this.viewTradingg = true;
    setTimeout(() => {
      this.service.hideSpinner();
    }, 2000);
  }

  viewCoinBTCDetails(transactionId) {
    this.service.showSpinner();
    this.getCoinDetailsByuserId(transactionId);
    this.viewEth = true;
    setTimeout(() => {
      this.service.hideSpinner();
    }, 2000);
  }

  viewXrpCoinDetails(transactionId) {
    this.service.showSpinner();
    this.getCoinDetailsByuserId(transactionId);
    this.viewXrp = true;
    setTimeout(() => {
      this.service.hideSpinner();
    }, 2000);
  }

  viewLtcCoinDetails(transactionId) {
    this.service.showSpinner();
    this.getCoinDetailsByuserId(transactionId);
    this.viewLtc = true;
    setTimeout(() => {
      this.service.hideSpinner();
    }, 2000);
  }

  getCoinDetailsByuserId(transactionId) {
    // http://182.72.203.244:3062/wallet/admin/transaction-history/get-transaction-details?txnId=1
    this.service.get('wallet/admin/transaction-history/get-transaction-details?txnId=' + (transactionId)).subscribe((res: any) => {
      console.log("hjfcdsi7dfcjdfgdfhgvs", res)
      if (res.status == 200) {
        this.coinList = res.data;
        // this.tradingListlength = res.data.length;
      }
    })
  }

  viewTradingDetails(userId, transactionId) {
    this.service.showSpinner();
    this.getTradingHistoryByuserId(userId, transactionId);
    this.viewTrading = true;
    setTimeout(() => {
      this.service.hideSpinner();
    }, 2000)
  }
  getTradingHistoryByuserId(userId, transactionId) {
    let data = {
      "userId": Number("35"),
      "transactionId": transactionId
    }
    this.service.post('order-service/get-trade-history', data).subscribe((res: any) => {
      console.log("hjfcdsi7dfcjdfgdfhgvs", res)
      if (res.status == 200) {
        this.tradingList = res.data[0];
        // this.tradingListlength = res.data.length;
      }
    })
  }
  backk() {
    this.viewTrading = false;
    this.viewDetail();
    this.getProfile();
    this.getTradingHistory();
    this.walletDetails();
  }
  backkk() {
    this.viewTradingg = false;
    this.viewDetail();
    this.getProfile();
    this.getTradingHistory();
    this.walletDetails();
  }
  backfromEth() {
    this.viewEth = false;
    // this.viewXrp = false;
    // this.viewLtc = false;
    this.viewDetail();
    this.getProfile();
    this.getTradingHistory();
    this.walletDetails();
  }

  backfromXrp() {
    this.viewXrp = false;
    // this.viewLtc = false;
    this.viewDetail();
    this.getProfile();
    this.getTradingHistory();
    this.walletDetails();
  }

  backfromLtc() {
    this.viewLtc = false;
    this.viewDetail();
    this.getProfile();
    this.getTradingHistory();
    this.walletDetails();
  }



  viewDetail() {

    var url = 'account/admin/user-management/user-details?userId=' + this.userId;
    this.service.showSpinner();
    this.service.get(url).subscribe(res => {

      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.userDetail = res['data']
        this.service.hideSpinner();

      } else {
        this.service.toasterErr(res['message']);
        this.service.hideSpinner();
      }
    }, err => {

      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }
  back() {
    this.router.navigate(['user-management/'])
  }

  /** to switch between tabs */

  walletDetailss(data) {
    this.service.showSpinner();
    this.service.get('wallet/admin/transaction-history/get-all-transaction-history?coinName=' + (data) + '&page=' + (0) + '&pageSize=' + (10)+ '&fkUserId=' + (this.userId)).subscribe((res: any) => {
      console.log("hyfgsjhy8768isgjhsg", res)
      if (res.status == 200) {
        this.walletDetailsList = res.data.resultlist;
        this.walletDetailsListLength = res.data.totalCount;
        console.log( this.walletDetailsListLength)
        this.service.hideSpinner();
      }
      else {
        this.service.hideSpinner();
      }
    }, (error) => {
      this.service.hideSpinner();
    })
  }

  getTradingHistory() {
    let data = {
      "baseCoin": "BTC",
      "exeCoin": "ETH",
      "side": "SELL",
      "userId": 35
    }
    this.service.post('order-service/get-trade-history', data).subscribe((res: any) => {
      console.log("hjfcdsi7dfcjhgvs", res)
      if (res.status == 200) {
        this.tradingList = res.data;
        this.tradingListlength = res.data.length;
      }
    })
  }

  reverseArr() {
    let arr = [1, 2, 3, 4, 5, 6, 7];
    console.log(arr)
    let newArr = [];
    let i;
    for (arr.length - 1; i >= 0; i--) {
      newArr.push(arr[i])
      console.log("newArr", newArr)
    }

  }


}
