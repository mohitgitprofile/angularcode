import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-viewevent',
  templateUrl: './viewevent.component.html',
  styleUrls: ['./viewevent.component.css']
})
export class VieweventComponent implements OnInit {
  paramData: any;
  copyUserList: any;
  kycImage: any;

  constructor( 
    private service: ServiceService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public active:ActivatedRoute) { 
      // this.active.queryParams.subscribe((params)=>{
      //   this.id=params.id,
      //   this.name=params.Name
      // })
    }

  ngOnInit() {
    this.active.params.subscribe((id) => {
      this.paramData = id.id;
      console.log("jghfghft",this.paramData);
      this.getUserData();
    }, (err) => {
      console.log("Error in getting data : ", err);
    });
  }

  getUserData(){
    this.service.postApii('admin/listOfEvent', {eventId:this.paramData},1).subscribe(success=>{
      console.log("hgfjhfjh",success);
      
      if(success.response_code == 200) {
        this.copyUserList = success.result[0];
        this.kycImage = this.copyUserList.logo;
        console.log("jhfhgyfhgfhj",this.copyUserList);
        
      }
      else {
        this.spinner.hide();
      }
    },(error=>{
      this.spinner.hide();
      console.log("hjmfghjfgjkhfkjhfhjkf",error)
    }))
  }

}
