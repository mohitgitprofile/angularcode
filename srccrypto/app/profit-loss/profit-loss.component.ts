import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
declare var $: any;

declare var kendo: any;

@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.css']
})
export class ProfitLossComponent implements OnInit {

  userList: any = [];
  p = 1;
  profLossData: any = [];
  gTotalTakerFees: any = 0;
  gTotalMakerFees: any = 0;
  gTotalWithDrawFees: any = 0;
  constructor(public router: Router, public server: ServiceService) { }
  ngOnInit() {

    this.getProfLoss();
  }


  card1(){
    kendo.drawing
      .drawDOM("#myCanvas",
        {
          paperSize: "A5",
          margin: { top: "0.8cm", bottom: "1cm" },
          scale: 0.8,
          height: 500,
          
        })
      .then(function (group) {
        kendo.drawing.pdf.saveAs(group, "Exported.pdf")
      });
    
  }

  getProfLoss() {
    this.server.showSpinner();
    this.server.get('wallet/coin/get-coin-list').subscribe((succ) => {
      this.server.hideSpinner();
      if (succ['status'] == 200) {
        succ['data'].forEach(obj => {
          let data = {
            "coinName": obj.coinShortName
          }
          this.server.post('wallet/admin/fee-management/get-fees-profit', data).subscribe((res) => {
            this.profLossData.push({
              takerFee: (res['data'].totalTakerFee).toFixed(8),
              makerFee: (res['data'].totalMakerfee).toFixed(8),
              coinName: obj.coinShortName,
              totalWithDrawFee: (res['data'].totalWithdrawFee).toFixed(8),
            })
            // Grand Total 
            this.gTotalTakerFees = this.gTotalTakerFees + res['data'].totalTakerFee
            this.gTotalMakerFees = this.gTotalMakerFees + res['data'].totalMakerfee
            this.gTotalWithDrawFees = this.gTotalWithDrawFees + res['data'].totalWithdrawFee
          })
        });
      }
    })
  }

// CSV export
  exportCSV() {
    let dataArr = [];
    dataArr.push({
        sno: "S.No.",
        Coin: "Coin",
        TakerFee: "Taker Fee",
        MakerFee: "Maker Fee",
        WithdrawalFee: "Withdrawal Fee",
    });
  
    this.profLossData.forEach((element,ind) => {
        dataArr.push({
            sno:ind+1,
            Coin:element.coinName?element.coinName:'--',
            TakerFee:element.takerFee?element.takerFee:'--',
            MakerFee: element.makerFee?element.makerFee:'--',
            WithdrawalFee:element.totalWithDrawFee?element.totalWithDrawFee:'--',
        })
    }) 
    new ngxCsv(dataArr, 'Profit Loss Data');
}

}
