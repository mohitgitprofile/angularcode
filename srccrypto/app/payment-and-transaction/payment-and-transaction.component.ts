import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-payment-and-transaction',
  templateUrl: './payment-and-transaction.component.html',
  styleUrls: ['./payment-and-transaction.component.css']
})
export class PaymentAndTransactionComponent implements OnInit {
  walletArry: any;
  total: any;
  p: number = 1;
  viewtansactionid: any;
  wallletarry: any = []
  twoDate: any = ''
  currencycoin: any = ''
  calender: any = { todate: '', formdate: '' }
  allcoin = "";
  type = "";
  minAge: Date;
  withdrwal: any = ''
  coindataArry: any = []
  fromDate: any = ''
  coinListArr: any = []
  constructor(private router : Router, public service:ServiceService) { }

  ngOnInit() {
    var today = new Date();
    var minAge = 0;
    this.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    this.getUserListwallet(this.p)
    this.getCoinList()
  }

  formdate() {

    this.fromDate = new Date(this.calender.formdate)
    this.fromDate = this.fromDate.getTime()
   
}
todate() {
    this.twoDate = new Date(this.calender.todate)
    this.twoDate = this.twoDate.getTime()
}
coinfunction(coin) {
    this.currencycoin = coin
   

}

onChange(val) {
    this.withdrwal = val
}
search() {
    this.getUserListwallet(this.p);

}

getUserListwallet(p) {
  
  this.service.showSpinner();
  
  this.service.get('wallet/admin/transaction-history/get-all-transaction-history?pageSize=' + '10' + '&page=' +(this.p - 1) + '&coinName=' + this.currencycoin + '&txnType=' + this.withdrwal + '&fromDate=' + this.fromDate + '&toDate=' + this.twoDate).subscribe((res) => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
          this.walletArry = res['data'].resultlist
          this.total = res['data']['totalCount']; 
      } 
      else {
          this.service.toasterErr(res['message']);
          this.service.hideSpinner();
      }
  }, (err) => {
      this.service.hideSpinner();
  })
}


getCoinList() {
  this.service.showSpinner();
  this.service.get('wallet/coin/get-coin-list').subscribe((res) => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
          this.coinListArr = res['data']
      }
      else {
            this.service.toasterErr(res['message']);
      }
  }, (err) => {
      this.service.hideSpinner();
  })
}

viewwalletmangment(val) {
  this.router.navigate(['viewtransaction/' + val])
}

pagination(page) {
  this.p = page;
  this.getUserListwallet(this.p);
}
/** Function for reset filter */
reset() {
  this.currencycoin = "";
  this.withdrwal = "";
  this.twoDate = '';
  this.fromDate = '';
  this.calender.todate = '';
  this.calender.formdate = '';
  this.allcoin = ""
  this.type = ""
  this.getUserListwallet(this.p)
}
 //export
 exportAsXLSX(){
  let dataArr = [];
  this.walletArry.forEach((element,ind) => {
  dataArr.push({
  "S no":ind+1,   
  "User ID":element.userId?element.userId:'',
  "Name":element.userName?element.userName:'',
  "Email":element.userEmail?element.userEmail:'N/A',
  "Coin":element.coinType?element.coinType:"N/A",
  "Type":element.txnType?element.txnType:"",
  "Date":element.txnTime?element.txnTime:'',
  "Transaction ID":element.txnId?element.txnId:'',
  "Transaction #":element.txnHash?element.txnHash:'',
  "Amount":element.amount?element.amount:'',
  })
  })
  this.service.exportAsExcelFile(dataArr,'Admin User list');
  }
}
