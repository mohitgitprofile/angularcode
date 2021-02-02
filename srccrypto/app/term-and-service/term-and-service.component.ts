import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-term-and-service',
  templateUrl: './term-and-service.component.html',
  styleUrls: ['./term-and-service.component.css']
})
export class TermAndServiceComponent implements OnInit {
  terms:any=[];
  id: any;
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
    this.service.get('static/get-static-page-data?pageKey=TERMS AND CONDITION').subscribe(res=>{
    
      this.service.hideSpinner();
      if(res['status']== 200){
        var data = res['data'];
        this.dataa = res['data'];
        // this.terms = data.filter(x=>(x.staticContentId == this.id))
       
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
 saveTerms(){
  var apiReq = {
    "pageKey": "Terms And Condition",
   "pageData": this.dataa.pageData
 }
//  var apiReq = {
//   "pageKey": "Privacy Policy",
//   "pageData": this.dataa.pageData
// }
// this.service.showSpinner();
// this.service.post('static/update-static-content-data',apiReq).subscribe(res=>{
 this.service.showSpinner();
 this.service.post('static/update-static-content-data',apiReq).subscribe(res=>{
  
   this.service.hideSpinner();
   if(res['status']== 200){
     this.getListCode();
    this.service.toasterSucc('Terms & Condition Updated Successfully')
   }else{
     this.service.toasterErr('Terms & Condition Updated Successfully')
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
