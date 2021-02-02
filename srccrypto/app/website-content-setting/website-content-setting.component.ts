import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-website-content-setting',
  templateUrl: './website-content-setting.component.html',
  styleUrls: ['./website-content-setting.component.css']
})
export class WebsiteContentSettingComponent implements OnInit {
  quotes:string='';
  message:string=''
  id: any;
  web: any=[];
  userId: any;
  webContentId: any;
  constructor(public service: ServiceService,public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(x=>{
    
      this.id= x['id'];
    })
   this.getAllWebsiteContent();
  }

  // Get All Website Content
  getAllWebsiteContent(){
    this.service.showSpinner();
    this.service.get('static-content-service/admin/static-content/get-webcontent-list').subscribe(res=>{
     
      this.service.hideSpinner();
      if(res['status'] == 200){
       this.quotes = res['data'][0].quote;
       this.message = res['data'][0].message;
       this.webContentId = res['data'][0].websiteContentId;
      }else {
        this.service.toasterErr(res['message']);
      }
    }, err=>{
    
      this.service.hideSpinner();
      if(err['status']=='401'){
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      }else{
      this.service.toasterErr('Something Went Wrong');
   }
    })
  }
  
  // Save Website Content Funtion
  saveWebsite(){
   
var apiReq = {
  "message": this.message,
  "quote": this.quotes,
  "webContentId": this.webContentId
}
            this.service.showSpinner();
   this.service.post('static-content-service/admin/static-content/update-webcontent',apiReq).subscribe(res=>{
   
     this.service.hideSpinner();
     if(res['status']=200){
       this.service.toasterSucc('Content Updated Successfully');
       this.getAllWebsiteContent();
     }else{
      this.service.toasterErr(res['message']);
     }
   }, err=>{
   
    this.service.hideSpinner();
    if(err['status']=='401'){
      this.service.onLogout();
      this.service.toasterErr('Unauthorized Access');
    }else{
    this.service.toasterErr('Something Went Wrong');
 }
   }) 
  }

}

