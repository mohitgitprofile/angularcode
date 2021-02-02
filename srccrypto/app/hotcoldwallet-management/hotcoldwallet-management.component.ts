import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $: any
@Component({
    selector: 'app-hotcoldwallet-management',
    templateUrl: './hotcoldwallet-management.component.html',
    styleUrls: ['./hotcoldwallet-management.component.css']
})
export class HotcoldwalletManagementComponent implements OnInit {
    currTab: any;

    walletCheck: any = []
    hotCoin: any;
    addresObj: any = { address: '' }
    coldCoin: any;
    storgeID: any;
    coinListArr: any = []
    dataArr: any = []
    hotcoinname: any;
    hotcoinaddr: any;
    hotbalance: any;
    transferForm: FormGroup
    hotTagId: any;
    coinlist: any = [];
    finalHotWalletArray: any=[];
    finalHotWalletTime: any;
    getAlltransactionsHistoryList: any=[];
    date: any;
    dateTime: any;
    time: any;

    constructor(private router: Router, public service: ServiceService) { }

    ngOnInit() {
        this.defaults();
        $("#emailid").on("keypress", function (e) {
            if (e.which === 32 && !this.value.length)
                e.preventDefault();
        });
        this.checkTransferFormValidations();
        this.getCoinWalletList();
        this.getAlltransactionsHistory();

    }
    getAlltransactionsHistory() {
        this.service.get('wallet/admin/transaction-history/get-all-transaction-history?page=0&pageSize=50&txnType=HOT_TO_COLD_TRANSFER').subscribe((res:any)=>{
            console.log("djkfhgi897dsyfgjbdhsfg89sdfgjkb",res)
            if(res.status == 200) {
                this.getAlltransactionsHistoryList = res.data.resultlist;
            }
        })
    }
    getOtherList() {
        this.service.showSpinner();
        this.coinListArr.forEach(element => {
            this.service.get('wallet/admin/hot-cold-storage/get-storage-details-with-latestTime?coinName='+(element)).subscribe((res: any) => {
                console.log("hjfgj78jgkhhkg", element)
                if(res.status == 200) {
                    this.finalHotWalletArray.push(res);
                    
                    this.service.hideSpinner();
                }
                else {
                    this.service.hideSpinner();
                }
                console.log("jhdfbgv9ds8fgjsdhbfg78sdifyghjksd", this.finalHotWalletArray)
            },(error)=>{
                this.service.hideSpinner();
            })
        });
        // this.getCoiList();
    }
    getCoiList() {
        this.service.showSpinner();
        // 'wallet/admin/transaction-history/get-all-transaction-history?coinName=' + (data) + '&page=' + (0) + '&pageSize=' + (10)
        this.coinListArr.forEach(element => {
            this.service.get('wallet/admin/hot-cold-storage/get-storage-details-coin-hot?coin='+(element)+'&storageType=HOT').subscribe((res: any) => {
                console.log("hjfgj78jgkhhkg", res)
                if(res.status == 200) {
                    this.finalHotWalletArray.push(res);
                    this.service.hideSpinner();
                }
                else {
                    this.service.hideSpinner();
                }
                console.log("jhdfbgv9ds8fgjsfghdfgdhbfg78sdifyghjksd", this.finalHotWalletArray)
            },(error)=>{
                this.service.hideSpinner();
            })
        });
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
                // console.log("jhdfbgv9ds8fgjsdhbfg78sdifyghjksd", this.coinListArr)
                this.getOtherList();
                // this.service.hideSpinner();
            }
            else {
                this.service.hideSpinner();
            }
        },(error)=>{
            this.service.hideSpinner();
        })
    }
    /** to load default data */
    defaults() {
        this.currTab = 'HOT';
      
    }

    /** to switch between tabs */
    selectTab(tab) {
        this.currTab = tab;
        if(tab == 'HOT'){
            this.coinListArr=[];
            this.getCoinWalletList()
            this.finalHotWalletArray=[]
            this.getOtherList()
        }else{
            this.getAlltransactionsHistory()
        }
        // this.getCoinWalletList();
    }
    updateAddressModal(coin) {
        this.coldCoin = coin

        $("#updateAddress1").modal({ backdrop: 'static', keyboard: false })
        this.addresObj.address = ""

    }


    createwalletCold(coin) {

        let data = {

            "coinName": coin,
            "storageType": this.currTab

        }

        //this.service.spinnerShow();
        this.service.post('wallet/admin/hot-cold-storage/create-storage-wallet', data).subscribe((res) => {
            this.service.showSpinner();
            if (res['status'] == 200) {
                this.walletCheck = res['data']

                if (this.currTab == 'COLD') {


                }
                this.service.toasterSucc(res['message'])
                this.service.hideSpinner();
            } else {
                this.service.toasterErr(res['message']);
                this.service.hideSpinner();
            }
        }, (err) => {
            this.service.hideSpinner();
        })
    }


    updateAddress(coin) {
        let data = {
            "coinName": coin,
            "coldAddress": 'COLD'
        }
        this.service.showSpinner();
        this.service.post('wallet/admin/hot-cold-storage/update-cold-storage-address', data).subscribe((res) => {
            this.service.hideSpinner();
            if (res['status'] == 200) {
                this.service.toasterSucc(res['message'])
                this.getCoinList();
            }
            else {
                this.service.toasterErr(res['message']);
                this.service.hideSpinner();
            }
        }, (err) => {
            this.service.hideSpinner();
        })
    }

    submitAddress() {
        if (this.addresObj.address == '') {
            this.service.toasterErr("Please Enter Address");
            return;
        }
        let data = {
            "coinName": this.coldCoin,
            "coldAddress": this.addresObj.address,
        }
        this.service.showSpinner();
        this.service.post('wallet/admin/hot-cold-storage/update-cold-storage-address', data).subscribe((res) => {
            this.service.hideSpinner();
            if (res['status'] == 200) {
                this.service.toasterSucc(res['message'])
                this.addresObj.address = ""
                this.getData()
            }
            else {
                this.service.toasterErr(res['message']);
                this.service.hideSpinner();
            }
        }, (err) => {
            this.service.hideSpinner();
        })
    }


    generateAddress(coin) {
        this.hotCoin = coin
        let data = {
            "accName": "harold",
            "coinName": this.hotCoin,
            "storageType": this.currTab
        }
        this.service.showSpinner();
        this.service.post('wallet/admin/hot-cold-storage/get-new-storage-address', data).subscribe((res) => {
            this.service.hideSpinner();
            if (res['status'] == 200) {
                this.service.toasterSucc(res['message'])
                this.getCoinList();
            }
            else {
                this.service.toasterErr(res['message']);
                this.service.hideSpinner();
            }
        }, (err) => {
            this.service.hideSpinner();
        })
    }

    updateHotBalance(coin) {
        let data = {
            "coinName": coin,
            "storageType": this.currTab
        }
        this.service.showSpinner();
        this.service.post('wallet/admin/hot-cold-storage/update-storage-wallet-balance', data).subscribe((res) => {
            this.service.hideSpinner();
            if (res['status'] == 200) {
                this.service.toasterSucc(res['message'])
            }
            else {
                this.service.toasterErr(res['message']);
                this.service.hideSpinner();
            }
        }, (err) => {
            this.service.hideSpinner();
        })
    }

    transferBalance(coin, address, hotbaln, tagid) {
        this.service.showSpinner();
        this.hotcoinname = coin;
        console.log("hotcoinname",this.hotcoinname);
        this.hotcoinaddr = address;
        this.hotbalance = hotbaln;
        this.hotTagId = tagid;
        this.checkTransferFormValidations();
        //console.log("coin name:", coin,address,hotbaln)
        setTimeout(() => {
            $('#transferModal').modal('show');
            this.service.hideSpinner();
        }, 2000);
        
    }

    checkTransferFormValidations() {
        this.transferForm = new FormGroup({
            'coldAddress': new FormControl(''),
            'transferrAmount': new FormControl(''),
            'transferAmount': new FormControl(''),
            'tag' : new FormControl('')
        })
    }


    transferHotToCold() {
        if(this.hotcoinname === 'XRP') {
            let data = {
                "amount": Number(this.transferForm.value.transferrAmount),
                "coinName": this.hotcoinname,
                "toAddress": this.transferForm.value.coldAddress,
                "tag" : this.transferForm.value.tag
            }
            //  console.log("transfer data:", data)
        this.service.showSpinner();
        // /wallet/admin/hot-cold-storage/manual-transfer-hot-to-cold
        this.service.post('wallet/admin/hot-cold-storage/manual-transfer-hot-to-cold', data).subscribe((res) => {
            this.service.hideSpinner();
            if (res['status'] == 200) {
                this.service.toasterSucc(res['message'])
                // $('#transferModal').modal('hide')
            }

            else {
                this.service.toasterErr(res['message']);
                this.service.hideSpinner();
            }
        }, (err) => {
            this.service.hideSpinner();
        })
        }
        else if (this.hotcoinname === 'XLM') {
            let data = {
                "amount": Number(this.transferForm.value.transferrAmount),
                "coinName": this.hotcoinname,
                "toAddress": this.transferForm.value.coldAddress,
                "tag" : this.transferForm.value.tag
            }
            //  console.log("transfer data:", data)
        this.service.showSpinner();
        // /wallet/admin/hot-cold-storage/manual-transfer-hot-to-cold
        this.service.post('wallet/admin/hot-cold-storage/manual-transfer-hot-to-cold', data).subscribe((res) => {
            this.service.hideSpinner();
            if (res['status'] == 200) {
                this.service.toasterSucc(res['message'])
                // $('#transferModal').modal('hide')
            }

            else {
                this.service.toasterErr(res['message']);
                this.service.hideSpinner();
            }
        }, (err) => {
            this.service.hideSpinner();
        })
        }
        else {
            let data = {
                "amount": Number(this.transferForm.value.transferrAmount),
                "coinName": this.hotcoinname,
                "toAddress": this.transferForm.value.coldAddress,
            }
            //  console.log("transfer data:", data)
        this.service.showSpinner();
        // /wallet/admin/hot-cold-storage/manual-transfer-hot-to-cold
        this.service.post('wallet/admin/hot-cold-storage/manual-transfer-hot-to-cold', data).subscribe((res) => {
            this.service.hideSpinner();
            if (res['status'] == 200) {
                this.service.toasterSucc(res['message'])
                // $('#transferModal').modal('hide')
            }

            else {
                this.service.toasterErr(res['message']);
                this.service.hideSpinner();
            }
        }, (err) => {
            this.service.hideSpinner();
        })
        }
        
    }


    getCoinList() {
        this.coinListArr = []
        this.dataArr = []
        this.service.showSpinner();
        this.service.get('wallet/coin/get-coin-list').subscribe((res) => {
            this.service.hideSpinner();
            if (res['status'] == 200) {
                this.coinListArr = res['data']

                this.coinListArr.forEach(obj => {
                    let pushobj = {
                        coinShortName: obj.coinShortName,
                        address: '',
                        hotWalletBalance: '',
                        storageId: '',
                        create_wallet: true,
                        tagid: '',
                    }
                    this.dataArr.push(pushobj)
                    // console.log(this.dataArr)
                })
                this.getData();

            } else {
                this.service.toasterErr(res['message']);
                this.service.hideSpinner();
            }
        }, (err) => {
            this.service.hideSpinner();
        })
    }

    getData() {

        this.service.showSpinner();
        this.service.get('wallet/admin/hot-cold-storage/get-storage-details?storageType=' + this.currTab).subscribe((succ) => {
            this.service.hideSpinner();
            if (succ['status'] == 200) {
                let tmpArr = succ['data'];


                for (let i = 0; i < this.dataArr.length; i++) {
                    let coinShortName = this.dataArr[i].coinShortName

                    let index_tmpArr = tmpArr.findIndex(x => x.coinType == coinShortName)
                    if (index_tmpArr != -1) {
                        this.dataArr[i].address = tmpArr[index_tmpArr].address
                        this.dataArr[i].hotWalletBalance = tmpArr[index_tmpArr].hotWalletBalance
                        this.dataArr[i].storageId = tmpArr[index_tmpArr].storageId
                        this.dataArr[i].create_wallet = false

                    }
                }

            }
        }, error => {
            this.service.hideSpinner();

        });
    }
}
