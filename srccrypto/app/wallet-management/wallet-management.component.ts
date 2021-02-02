import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $:any
@Component({
  selector: 'app-wallet-management',
  templateUrl: './wallet-management.component.html',
  styleUrls: ['./wallet-management.component.css']
})
export class WalletManagementComponent implements OnInit {
  selected: string = "btc";
  coinlist: any=[];
  coinListArr: any=[];
  transferForm: FormGroup;
  loopData: any=[];
  lengthTotal: any;
  minDate: any;
  itemsPerPage = 10
  currentPage:number = 1;
  totalItems: any
  constructor(
    private router : Router,
    public service: ServiceService
  ) { }

  ngOnInit() {
    console.log(this.currentPage)
    this.checkTransferFormValidations();
    this.sidemenu();
    this.getCoinWalletList();
    this.getAllTransactionHistory();
  }
  pagination(page) {
    this.currentPage = page
    this. getAllTransactionHistory()
  }
  checkTransferFormValidations() {
    this.transferForm = new FormGroup({
        'currency': new FormControl(''),
        'type': new FormControl(''),
        'fromDate' : new FormControl(''),
        'toDate' : new FormControl('')
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
            // this.getOtherList();
            this.service.hideSpinner();
        }
        else {
            this.service.hideSpinner();
        }
    },(error)=>{
        this.service.hideSpinner();
    })
}
  
  sidemenu() {
    $(".btn-toggle,.close_panel").click(function() {
      $("body").toggleClass("toggle-wrapper");
  });
  }

  // to check tab
  selectTab(path) {
    
    this.selected = path
   
    if (path == 'btc') {
     
    } else if (path == 'eth') {

    } else if (path == 'xrp') {
     
    } else if (path == 'ltc') {

    } 
  }

  getBTC(){
    
  }

  getAllTransactionHistory() {
    console.log(this.currentPage)
    this.service.get(`wallet/admin/transaction-history/get-all-transaction-history?page=${this.currentPage - 1}&pageSize=${this.itemsPerPage}`).subscribe((res:any)=>{
      console.log("djsuffgy78sghdfijkuhgjv",res);
      this.loopData = res.data.resultlist;
      this.lengthTotal = res['data'].totalCount

    })
  }

  searchcoinn() {
    this.service.get('wallet/admin/transaction-history/get-all-transaction-history?coinName='+(this.transferForm.value.currency)+'&page='+(this.currentPage - 1)+'&pageSize='+(this.itemsPerPage)+'&txnType='+(this.transferForm.value.type)).subscribe((res:any)=>{
      console.log("djsuffgy78sghdfijkufgnhgjv",res);
      this.loopData = res.data.resultlist;
      this.lengthTotal = res.data.totalCount;
    })
  }

  searchcoin() {
    this.service.get('wallet/admin/transaction-history/get-all-transaction-history?coinName='+(this.transferForm.value.currency)+'&page='+(this.currentPage - 1)+'&pageSize='+(this.itemsPerPage)).subscribe((res:any)=>{
      console.log("djsuffgy78sghdfijkufgnhgjv",res);
      this.loopData = res.data.resultlist;
      this.lengthTotal = res.data.totalCount;
    })
  }

  searchText() {
    this.minDate = this.transferForm.value.fromDate;
    // wallet/admin/transaction-history/get-all-transaction-history?fromDate=1&page=0&pageSize=10&toDate=1
    this.service.get('wallet/admin/transaction-history/get-all-transaction-history?fromDate='+(Math.round(new Date(this.transferForm.value.fromDate).getTime()))+'&toDate='+(Math.round(new Date(this.transferForm.value.toDate).getTime()))+ '&page='+(this.currentPage - 1)+'&pageSize='+(this.itemsPerPage)).subscribe((res:any)=>{
      console.log("djsuffgy78sghdfijkufgnhgjv",res);
      this.loopData = res.data.resultlist;
      this.lengthTotal = res.data.totalCount;
    })
  }

  reset() {
    this.transferForm.reset();
    this.getCoinWalletList();
    this.getAllTransactionHistory();
  }
}
