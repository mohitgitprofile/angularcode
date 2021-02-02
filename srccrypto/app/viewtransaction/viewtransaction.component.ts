import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-viewtransaction',
  templateUrl: './viewtransaction.component.html',
  styleUrls: ['./viewtransaction.component.css']
})
export class ViewtransactionComponent implements OnInit {
  walletDetailArry: any;
  userId: any;

  sub: any;
  constructor(private router : Router, public service:ServiceService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
     this.userId = (params['id']); // (+) converts string 'id' to a number
  
      localStorage.setItem('userId',this.userId)
      });
    this.viewWalletDetail()
  }

   
  viewWalletDetail() {
    this.service.showSpinner();
    this.service.get('wallet/admin/transaction-history/get-transaction-details?txnId='+this.userId).subscribe((res) => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.walletDetailArry = res['data']
        
      }
      else {
        this.service.toasterErr(res['message']);
       
      }
    }, (err) => {
      this.service.hideSpinner();
    })
  }
  userwalletdetail() {
    this.router.navigate(['header/userwalletdetail/'+localStorage.getItem('userId')])
  }

  back() {
    this.router.navigate(['payment-and-transaction/'])
  }
 
}
