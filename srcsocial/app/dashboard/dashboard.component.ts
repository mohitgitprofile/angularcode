import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userList: any;
  categoryList: any;
  reportLists: any;
  communityList: any;
  eventList: any;
  transactionList: any;

  constructor(
    private service: ServiceService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    this.getUserList();
    this.geteventList();
    this.reportList();
    this.getcommunitylistList();
    this.listOfCategory();
    this.getTransactionList();
  }

  geteventList() {
    this.service.postApii('admin/listOfEvent', '',  1).subscribe(success => {
      console.log("success",success);
      if(success.response_code == 200) {
        this.eventList = success.result[0].docs.length;
        console.log("dfgdfsgdsfg",this.eventList)
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })
  
  }

  reportList(){
    let data={

    }
    this.service.postApii('admin/listOfReport', data,1).subscribe((success)=>{
      console.log("df", success);
      if(success.response_code==200){
      this.reportLists=success.result[0].docs.length;
      console.log("dfgdfsgdsfg",this.reportLists)
      }
    },(error)=>{
      this.service.error("something went wrong")
    })
  }

  getcommunitylistList(){

    this.service.postApii('admin/listOfCommunity', '',1).subscribe(success=>{
      console.log("hgfjhfjh",success);
      
      if(success.response_code == 200) {
        this.communityList = success.result[0].docs.length;
        console.log("dfgdfsgdsfg",this.communityList)
        
      }
      else {
        this.spinner.hide();
      }
    },(error=>{
      this.spinner.hide();
      console.log("hjmfghjfgjkhfkjhfhjkf",error)
    }))
  }

  getUserList() {
    this.service.postApii('admin/listOfUser', '',  1).subscribe(success => {
      console.log("success",success);
      if(success.response_code == 200) {
        this.userList = success.result[0].docs.length;
        console.log("userlenthhhh",this.userList)
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })
  
  }

  listOfCategory(){
    let data={

    }
    this.service.postApii('admin/listOfCategory', data,  1).subscribe(success => {
      console.log("success",success);
      if(success.response_code == 200) {
        this.categoryList = success.result[0].docs.length;
        console.log("dfgdfsgdsfg",this.categoryList)
      }
      else {
        this.service.error('something went wrong')
      }
    })
  
  }
  getTransactionList(){
    this.spinner.show()
    let data={

    }
    this.service.postApii('admin/listOfTransaction', data, 1).subscribe((success)=>{
      console.log("success");
      if(success.response_code==200){
        this.transactionList=success.result[0].docs[0].amount;
        console.log("dfgdfsgdsfg",this.transactionList)
        this.spinner.hide()
      }
      
    },(error)=>{
      this.service.error('something went wrong')
    })

  }

}
