import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.css']
})
export class ViewAdminComponent implements OnInit {
  userId: any;
  adminDetails: any;

  constructor(public router: Router, public param: ActivatedRoute, public service: ServiceService) { 
    this.param.params.subscribe((res)=>{
      this.userId = res.id;
      console.log("userId", res)
    })
  }

  ngOnInit() {
    this.getProfile();
  }
  back() {
    this.router.navigate(['/admin-management'])
  }
  getProfile() {
    this.service.showSpinner();
    let dataa = {
      "primaryIdCommonPerRequest": this.userId
    }
    this.service.post('account/admin/user-management/get-staff-user-profile', dataa).subscribe((res)=>{
      console.log("hgfsjdhcfgf",res)
      this.adminDetails = res['data']['staffDetails']
      console.log("hgfsjdhcfgf",this.adminDetails)
      setTimeout(()=>{
        this.service.hideSpinner();
      },2000)
      
    })
  }

}
