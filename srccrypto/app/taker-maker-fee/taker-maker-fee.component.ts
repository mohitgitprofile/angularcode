import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-taker-maker-fee',
  templateUrl: './taker-maker-fee.component.html',
  styleUrls: ['./taker-maker-fee.component.css']
})
export class TakerMakerFeeComponent implements OnInit {
  privilegePrice: any;
  twoDate: any;
  currencycoin: any = "BTC"
  allcoin = "BTC";
  Hggcoin: any;
  show: boolean = false;
  time: any;
  profitobj: any = {}
  walletCheckFee: any = []
  type = "WITHDRAW";
  optionFee: any = 'WITHDRAW';
  currTab: any='Tacker';
  numRegxForDot = (/^\d{0,6}(\.\d{1,6})?$/);

  btcdata: any = {}
  calender: any = { todate: '', formdate: '' }
  minAge: Date;
  
  feecoinArry: any = []
  mininArry: any = []
  btcFeeVali: any;
  fromDate: any;
  constructor(private router: Router, public service:ServiceService ) { }

  

  ngOnInit() {
    this.defaults();
        var today = new Date();
        var minAge = 0;
        this.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
  }

  defaults() {
    this.currTab = 'Fee';
    this.getCoinList()

}
todate() {
  this.twoDate = new Date(this.calender.todate)
  this.twoDate = this.twoDate.getTime()
 
}

formdate() {

    this.fromDate = new Date(this.calender.formdate)
    this.fromDate = this.fromDate.getTime()
   
}
   /** to switch between tabs */
   selectTab(tab) {
    this.currTab = tab;
    if (this.currTab == 'Fee') {

        this.getCoinList();
    }
  
    else if (this.currTab == "Tacker") {
        this.getCoinList()
    }

}

coinfunction(coin) {
  this.currencycoin = coin
  

}


demo(val) {
  this.optionFee = val
  this.show = false;
}

/**to get coin list */
getCoinList() {

  this.service.showSpinner();
  this.service.get('wallet/coin/get-coin-list').subscribe((res) => {
      this.service.hideSpinner();
      if (res['status'] == 200) {


          this.feecoinArry = res['data']

          this.Hggcoin = res['data'][5].privilegePrice
         

          this.feecoinArry.forEach(obj => {
              let pushobj = {
                  coinShortName: obj.coinShortName,
                  withdrawlfee: obj.withdrawlFee,


              }
          })

      } else {
          this.service.toasterErr(res['message']);
          this.service.hideSpinner();
      }
  }, (err) => {
      this.service.hideSpinner();
  })
}

updatefeeapi(coinShortName, withdraw) {
 
  if (!this.numRegxForDot.test(withdraw)) {
      this.service.toasterErr("Enter valid input. ");
  } else if (withdraw > 100) {
      this.service.toasterErr("Coin fee can't be greater than 100%");
  
      return;
  } else {
      this.service.showSpinner();
      this.service.get('wallet/admin/fee-management/set-withdrawal-fee?coinName=' + coinShortName + '&withdrawalFee=' + withdraw).subscribe((res) => {
          this.service.hideSpinner();
          if (res['status'] == 200) {
              this.feecoinArry = res['data']
              this.service.toasterSucc(res['message']);
              this.getCoinList()
          } else {
              this.service.toasterErr('rghfg');
              this.service.hideSpinner();
          }
      }, (err) => {
          this.service.hideSpinner();
      })
  }

 }
updateTacker(coin, tacker, macker) {
  if (!this.numRegxForDot.test(tacker)) {
      this.service.toasterErr("Enter valid input.");
  } else if (!this.numRegxForDot.test(macker)) {
      this.service.toasterErr("Enter valid input.");
      return;
  }
  else {
      let data = {
          "coinName": coin,
          "makerFee": macker,
          "takerFee": tacker
      }
      this.service.showSpinner();
      this.service.post('wallet/admin/fee-management/set-taker-maker-fee', data).subscribe((res) => {
          this.service.hideSpinner();
          if (res['status'] == 200) {
              this.service.toasterSucc(res['message']);
          } else {
              this.service.toasterErr(res['message']);
              this.service.hideSpinner();
          }
      }, (err) => {
          this.service.hideSpinner();
      })
  }
  
  }

}
