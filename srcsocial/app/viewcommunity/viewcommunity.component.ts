import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-viewcommunity',
  templateUrl: './viewcommunity.component.html',
  styleUrls: ['./viewcommunity.component.css']
})
export class ViewcommunityComponent implements OnInit {
  id: any;
  name: any;
  userData: any;
  kycImage: any;
  copyUserList: any;
  route: any;
  paramData: any;
  kycImagee: any;

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
  gotonext()  {
    this.router.navigate(['/community-management'])
  }

  getUserData(){
    this.service.postApii('admin/listOfCommunity', {communityId:this.paramData},1).subscribe(success=>{
      console.log("hgfjhfjh",success);
      
      if(success.response_code == 200) {
        this.copyUserList = success.result[0];
        this.kycImage = this.copyUserList.logo;
        this.kycImagee = this.copyUserList.coverPage;
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
