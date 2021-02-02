import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit {
  data: any;
  name: any;
  tdate: any;
  amount: any;
  tmode: any;
  tid: any;
  viewTransactionList: any;

  constructor
  (
    private service: ServiceService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public active:ActivatedRoute
  ) {
    this.active.queryParams.subscribe((params)=>{
      this.data=JSON.parse(params.value)
      this.name=this.data.createdAt
      this.tdate=this.data.createdAt
      this.amount=this.data.amount
      this.tmode=this.data.paymentMode
      this.tid=this.data._id
    })
   }

  ngOnInit() {
    this.viewListOfTransaction()
  }

  viewListOfTransaction(){
    let data={
      paymentId:this.tid
    }
    this.service.postApii('admin/listOfTransaction', data, 1).subscribe((success)=>{
      console.log("success",success);
      if(success.response_code==200){
        // this.service.success(success.response_message)
        this.viewTransactionList=success.result[0];
        console.log("ghb",this.viewTransactionList);
        
        this.spinner.hide()
      }
      
    },(error)=>{
      this.service.error('something went wrong')
    })
  }

}
