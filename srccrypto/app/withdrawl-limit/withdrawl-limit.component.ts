import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-withdrawl-limit',
  templateUrl: './withdrawl-limit.component.html',
  styleUrls: ['./withdrawl-limit.component.css']
})
export class WithdrawlLimitComponent implements OnInit {
  kyclimitdata: any=[];
  kyclimitprice: any;
  pushobj: {
   
    name: any; fee: any;
  };
  id: any;
  

  constructor(private router: Router, public service:ServiceService) { }

  ngOnInit() {
    this.getall();
  }


  getall(){
    this.service.showSpinner();
    this.service.get('wallet/admin/limit-management/get-all').subscribe((res) => {
        this.service.hideSpinner();
        if (res['status'] == 205) {
        this.kyclimitdata= res['data']
        this.id= res['data'][0].limitDataId;
       
  
        } else {
            
        }
    }, (err) => {
        this.service.hideSpinner();
    })
  }

  withdrawalUpdateFunc(amount){
    let data={
        "limitAmount": Number(amount),
        "limitId": this.id
    }
this.service.showSpinner();
    this.service.post('wallet/admin/limit-management/update-limit',data).subscribe((res) => {
        this.service.hideSpinner();
        if (res['status'] == 200) {
      
       this.service.toasterSucc('Withdrawal limit updated successfully')
  
        } else {
          
        }
    }, (err) => {
        this.service.hideSpinner();
    })
  }
}
