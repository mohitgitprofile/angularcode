import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {
  id: any;
  privacy: any;
  dataa: any=[];
  constructor(public service:ServiceService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(x=>{
    
      this.id= x['id'];
    })
    this.getListCode();
  }

  // Get List Code
  getListCode(){
    this.service.showSpinner();
    this.service.get('static/get-static-page-data?pageKey=PRIVACY POLICY').subscribe(res=>{
    
      this.service.hideSpinner();
      if(res['status']== 200){
        var data = res['data'];
        this.dataa = res['data'];
        // this.privacy = data.filter(x=>(x.staticContentId == this.id))
        console.log("hjyfsjy67is7fjsf",this.privacy)
      
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

  // Save Abou Us Functionality
  savePrivacy(){
    var apiReq = {
     "pageKey": "Privacy Policy",
     "pageData": this.dataa.pageData
   }
   this.service.showSpinner();
   this.service.post('static/update-static-content-data',apiReq).subscribe(res=>{
   
     this.service.hideSpinner();
     if(res['status']== 200){
       this.getListCode();
      this.service.toasterSucc('Privacy Policy Updated Successfully')
     }else{
       this.service.toasterErr('Privacy Policy Updated Successfully')
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
