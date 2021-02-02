import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  id: any;
  about: any;
  dataa: any=[];
  constructor(public service:ServiceService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(x=>{
     
      this.id= x['id'];
    })
    this.getListCode();
  }

  // Get List Code by admin
  getListCode(){
    this.service.showSpinner();
    // http://182.72.203.244:3062/static/get-static-page-data-by-page-key?=About%20Us
    // static/get-static-page-data-by-page-key?pageKey=1
    this.service.get('static/get-static-page-data?pageKey=ABOUT US').subscribe(res=>{
   
      this.service.hideSpinner();
      if(res['status']== 200){
        this.dataa = res['data'];
        // this.about = data.filter(x=>(x.staticContentId == this.id))
        console.log("gdfshdfsghdfgher56urgfhj",this.about)
     
      }
    }, err=>{
     
      this.service.hideSpinner();
      if(err['status']=='401'){
        // this.service.toasterErr('Unauthorized Access');
        this.service.onLogout();
      }else{
      // this.service.toasterErr('Something Went Wrong');
   }
   })
  }

  // Save Abou Us Functionality
  saveAboutUS(){
   var apiReq = {
    "pageKey": "About Us",
    "pageData": this.dataa.pageData
  }
  this.service.showSpinner();
  this.service.post('static/update-static-content-data',apiReq).subscribe(res=>{
   
    this.service.hideSpinner();
    if(res['status']== 200){
      this.getListCode();
     this.service.toasterSucc('About Us Updated Successfully')
    }else{
      this.service.toasterErr('About Us Updated Successfully')
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
