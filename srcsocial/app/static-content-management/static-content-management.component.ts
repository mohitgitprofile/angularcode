import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-static-content-management',
  templateUrl: './static-content-management.component.html',
  styleUrls: ['./static-content-management.component.css']
})
export class StaticContentManagementComponent implements OnInit {

  StaticContentList: any=[] ;
  //   {name : 'Privacy Policy'},
  //   {name : 'Contact Us'},
  //   {name : 'Term & Condition'},
  //   {name : 'About Us'}
  // ];
  permission: any = [];
  newContentArray: any=[];
  constructor(private service: ServiceService, public router:Router, private spinner: NgxSpinnerService) {
    // this.permission = !!JSON.parse(localStorage.getItem('permission')) ? (JSON.parse(localStorage.getItem('permission')).length ? JSON.parse(localStorage.getItem('permission')) : [] ) : [];
  }

  ngOnInit() {
    this.Getlist();
  }

  Getlist(){
    
    this.service.getApii('static/staticPageList', 1).subscribe(success => {
      console.log("success",success);
      if(success.response_code == 200) {
        this.StaticContentList = success.result;
    this.newContentArray = this.StaticContentList.splice(2,1);
       console.log("sdfgasd",this.StaticContentList)
      }
      else {
        this.service.error('something went wrong')
      }
    })
  }

  gotoEditstatic(data){
    console.log("dj", data);
    
    this.router.navigate(['/edit-static-content'],{queryParams:{value:JSON.stringify(data)}})
  }
}
