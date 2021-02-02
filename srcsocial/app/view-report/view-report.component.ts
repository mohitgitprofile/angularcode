import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})
export class ViewReportComponent implements OnInit {
  id: any;
  viewData: any;

  constructor(
  public router:Router,
  public service:ServiceService,
  public spinner: NgxSpinnerService,
  public active:ActivatedRoute
  ) { 
    this.active.queryParams.subscribe((params)=>{
      this.id=params.id
    })
  }

  ngOnInit() {
    this.viewReportList()
  }

  viewReportList(){
    let data={
      reportId:this.id
    }
    this.service.postApii('admin/listOfReport', data, 1).subscribe((success)=>{
      console.log("ej", success);
      if(success.response_code==200){
        
        // this.service.success(success.response_message)
        this.viewData=success.result[0];
      }
      
    },(error)=>{
      this.service.error("something went wrong")
    })
  }

}
