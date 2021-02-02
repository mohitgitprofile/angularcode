import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
    selector: 'app-fee-management',
    templateUrl: './fee-management.component.html',
    styleUrls: ['./fee-management.component.css']
})
export class FeeManagementComponent implements OnInit {
    pageNumber: number=1;
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
    currTab: any;
    numRegxForDot = (/^\d{0,6}(\.\d{1,6})?$/);

    btcdata: any = {}
    calender: any = { todate: '', formdate: '' }
    minAge: Date;

    feecoinArry: any = []
    mininArry: any = []
    btcFeeVali: any;
    fromDate: any;
    coinlist: any = [];
    coinListArr: any = [];
    loopdata: any = [];
    manageCoins: boolean = true;
    manageTrading: boolean = true;
    particularData: any=[];
    editedCoinName: any;
    manageCoinForm: FormGroup;
    manageCoinPair: FormGroup;
    particularDatad: any=[];
    coinpairlistarray: any=[];
    baseCoinn: any;
    executableCoinn: any;
    visiblen: boolean;
    constructor(private router: Router, public service: ServiceService) { }



    ngOnInit() {
        this.manageCoinForm = new FormGroup({
            isVisible : new FormControl(''),
            remark : new FormControl(''),
            isWithdrawl : new FormControl(''),
            isDeposite : new FormControl('')
        });
        this.manageCoinPair = new FormGroup({
            pairedCoin : new FormControl(''),
            visible : new FormControl(''),
            baseCoin : new FormControl('')
        })
        this.defaults();
        this.getCoinWalletList();
        this.getcoinPairlist();
        var today = new Date();
        var minAge = 0;
        this.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    }

    getcoinPairlist() {
        this.service.post('wallet/coin/get-coinPair-list', '').subscribe((res:any)=>{
            this.coinpairlistarray = res.data
        })
    }

    getCoinWalletList() {
        this.service.showSpinner();
        this.service.get('wallet/coin/get-coin-list').subscribe((res: any) => {
            console.log("hjgf9876hgujkh", res)
            if (res.status == 200) {
                this.coinlist = res.data;
                console.log("jhgdfsj7sdfjbsjdhf", this.coinlist);

                this.coinlist.forEach(element => {
                    this.coinListArr.push(element.coinShortName);

                });
                console.log("jhdfbgv9ds8fgjsdhbfg78sdifyghjksd", this.coinListArr)
                this.getCoinStatus();
                this.service.hideSpinner();
            }
            else {
                this.service.hideSpinner();
            }
        }, (error) => {
            this.service.hideSpinner();
        })
    }
    // http://182.72.203.244:3062/wallet/admin/set-coin-status?coin=BTC

    updateMnageCoins() {
        // this.service.showSpinner();
        let data = {
            "coinName": this.editedCoinName,
            "confermation": 0,
            "isDeposite": this.manageCoinForm.value.isDeposite,
            "isVisible": this.manageCoinForm.value.isVisible,
            "isWithdrawl": this.manageCoinForm.value.isWithdrawl,
            "remark": this.manageCoinForm.value.remark
          }
          this.service.post('wallet/admin/set-coin-status?coin='+(this.editedCoinName), data).subscribe((res:any)=>{
            console.log("jhgds87jgdes",res)
            if(res.status == 200) {
                // this.loopdata.push(res.data);
                this.particularData = res.data;
                
                this.service.hideSpinner();
                this.service.toasterSucc(res.message)
            }
            console.log("hgfsdi76t5skughjvdxksu786dkxhsjmxg",this.loopdata);
            // else {
            //     this.service.hideSpinner();
            // }
        },(error)=>{
            console.log("ghjf786d",error);
            
            this.service.hideSpinner();
        })

    }
    updateCoinPairs() {
        let data = {
            "baseCoin": this.baseCoinn,
            "executableCoin": this.executableCoinn,
            "visible": this.manageCoinPair.value.visible
          }
          console.log("ysugfdi89sdyfjksdghf8sydifgkjhbg", data)
          this.service.post('wallet/coin/Set-coinPair-visibility', data).subscribe((res:any)=>{
            console.log("jhgds87jgdes",res)
            if(res.status == 200) {
                this.service.hideSpinner();
                this.service.toasterSucc(res.message);
                
                this.router.navigate(['/fee-management'])
                
            }
            else {
                this.service.hideSpinner();
            }
        },(error)=>{
            console.log("ghjf786d",error);
            this.service.hideSpinner();
        })
    }

    editStaff(element){
        this.editedCoinName= element;
        this.manageCoins = false;
        let data = {
            "coinName": "string",
            "confermation": 0,
            "isDeposite": true,
            "isVisible": true,
            "isWithdrawl": true,
            "remark": "string"
          }
          this.service.get('wallet/admin/get-coin-status?coin='+(element)).subscribe((res:any)=>{
            console.log("jhgds87jgdes",res)
            if(res.status == 200) {
                // this.loopdata.push(res.data);
                this.particularData = res.data;
                this.service.hideSpinner();
            }
            console.log("hgfsdi76t5skughjvdxksu786dkxhsjmxg",this.loopdata);
            // else {
            //     this.service.hideSpinner();
            // }
        },(error)=>{
            console.log("ghjf786d",error);
            
            this.service.hideSpinner();
        })
    }

    manageCoinsss() {
        this.manageTrading = true;
        this.getCoinWalletList();
        this.getcoinPairlist();
    }

    editStafff(baseCoin, executableCoin, visible) {
        this.manageTrading = false;
        this.baseCoinn= baseCoin;
        this.executableCoinn = executableCoin;
        this.visiblen = visible
        console.log("visiblen", visible, this.visiblen)
        let data = {
            "baseCoin": this.manageCoinPair.value.baseCoin,
            "executableCoin": this.manageCoinPair.value.executableCoin,
            "visible": this.manageCoinPair.value.visible
          }
        //   this.service.get('wallet/coin/Set-coinPair-visibility'+(data)).subscribe((res:any)=>{
        //     console.log("jhgds87jgdes",res)
        //     if(res.status == 200) {
        //         // this.loopdata.push(res.data);
        //         this.particularData = res.data;
        //         this.service.hideSpinner();
        //     }
        //     console.log("hgfsdi76t5skughjvdxksu786dkxhsjmxg",this.loopdata);
        //     // else {
        //     //     this.service.hideSpinner();
        //     // }
        // },(error)=>{
        //     console.log("ghjf786d",error);
            
        //     this.service.hideSpinner();
        // })
    }

    getCoinStatus() {
        this.service.showSpinner();
        this.coinListArr.forEach(element => {
            this.service.get('wallet/admin/get-coin-status?coin='+(element)).subscribe((res:any)=>{
                console.log("jhgds87jgdes",res)
                if(res.status == 200) {
                    this.loopdata.push(res.data);
                    this.service.hideSpinner();
                }
                console.log("hgfsdi76t5skughjvdxksu786dkxhsjmxg",this.loopdata);
                // else {
                //     this.service.hideSpinner();
                // }
            },(error)=>{
                console.log("ghjf786d",error);
                
                this.service.hideSpinner();
            })
        });
    }

    manageCoinss() {
        this.manageCoins = true;
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
            this.service.toasterErr("Enter valid input.");
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

