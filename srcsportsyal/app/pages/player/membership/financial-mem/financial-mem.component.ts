import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../providers/mainService.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-financial-mem',
  templateUrl: './financial-mem.component.html',
  styleUrls: ['./financial-mem.component.css']
})
export class FinancialMemComponent implements OnInit {
  userDetail: any;
  compId: any;
  page: number=1;
  financialList: any;
  paginationData: any;

  constructor(public service:MainService , public route:ActivatedRoute) { }

  ngOnInit() {
    this.userDetail = JSON.parse(this.service.getStorage('userDetailYala'))
    this.route.params.subscribe(async params => {
      this.compId = params['compId'];
      console.log("compId-->>> ",this.compId);
    })
    this.getFinancial(1);
  }
// Get Financial List Functionality 
getFinancial(page){
  this.page = page;
  var apiDoc =  {
    "userId": this.userDetail._id,
    "page": this.page,
    "type":'MEMBERSHIP',
    "limit": 4,
    }
    console.log(`DATA B4 SEND-->${JSON.stringify(apiDoc)}`)      
    this.service.postApi(`membership/getUserTransaction`, apiDoc, 1).subscribe(response => {
      if(response.responseCode == 200) {
        console.log('SERVICE LIST --> ', JSON.stringify(response));
        this.financialList = response.result.docs;
        this.paginationData = response.result;
      }
    })
}
}
