import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-view-user-management-exchange-of-feedback',
  templateUrl: './view-user-management-exchange-of-feedback.component.html',
  styleUrls: ['./view-user-management-exchange-of-feedback.component.css']
})
export class ViewUserManagementExchangeOfFeedbackComponent implements OnInit {
  userId: any;
  bindData: any;

  constructor(public router:Router, public query: ActivatedRoute, public service : ServiceService) {
    this.query.queryParams.subscribe((res:any)=>{
      this.userId = res.data;
      console.log("hjyfgsdjhgsds",res)
    })
   }

  ngOnInit() {
    this.feedback();
  }
  feedback() {
    this.service.get('account/admin/get-user-feedback-Detail?feedbackId='+(this.userId)).subscribe((res:any)=>{
      console.log("hjyfgsdjhgsds",res)
      this.bindData = res.data;
    })
  }

}
