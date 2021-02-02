import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
declare var $:any
@Component({
  selector: 'app-statics-content',
  templateUrl: './statics-content.component.html',
  styleUrls: ['./statics-content.component.css']
})
export class StaticsContentComponent implements OnInit {
  staticList: any=[];

  constructor(public service:ServiceService) { }

  ngOnInit() {
    this.getListCode();
    this.sidemenu();
  }

   // Get List Code
   getListCode(){
    this.service.showSpinner();
    this.service.get('static/get-all-static-content-data').subscribe(res=>{
   
      this.service.hideSpinner();
      if(res['status']== 200){
       this.staticList = res['data'];
      
      }
    }, err=>{
   
      this.service.hideSpinner();
      if(err['status']=='401'){
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      }else{
      this.service.toasterErr('Page Not Found');
   }
    })
  }

  sidemenu() {
    $(".btn-toggle,.close_panel").click(function() {
      $("body").toggleClass("toggle-wrapper");
  });
  }
}
