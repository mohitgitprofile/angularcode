import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-static-content',
  templateUrl: './view-static-content.component.html',
  styleUrls: ['./view-static-content.component.css']
})
export class ViewStaticContentComponent implements OnInit {

  paramData: any;
  data: any;
  editUrl: any;
  id: any;
  staticId: any;
  title: this;
  description: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private service: ServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getParamData();
    console.log("df", this.paramData);
    
  }

  getParamData() {
    this.activatedRoute.params.subscribe(success => {

      this.paramData = success.title;
      this.id=success.id
      console.log("f",this.paramData);
      
      let url;
      if(this.paramData=='Faqs'){
        this.router.navigate(['/faqs'])
      }
      else if(this.paramData!='') {
        url = 'static/viewStaticPage';
      }

        
      // } else {
      //   if (this.paramData.type === 'Contact Us') {
      //     url = '/get-contactus';
      //     this.editUrl = '/edit-contactus';
      //   } else {
      //     if (this.paramData.type === 'Term & Condition') {
      //       url = '/term-condition';
      //       this.editUrl = '/edit-termcondition';
      //     } else {
      //       if (this.paramData === 'About Us') {
      //         url = '/view-about';
      //         this.editUrl = '/aboutus';
      //       }
      //     }
      //   }
      // }
      this.getData(url);
    });
  }

  getData(url) {
    const apireq = {
      staticId : this.id
    };
    this.spinner.show();
    this.service.postApi(url, apireq).subscribe((success: any) => {
      console.log("ffgfg",success);
      
      if (success.response_code == 200) {
        this.data = success.result;
        this.spinner.hide();
      }
      
    }, error => {
      this.spinner.hide();

    });
  }
  editParamdata(data){
    // let editUrl = '/static/editStaticPage';
    // this.staticId = data._id;
    // this.title=data.title;
    // this.description=data.description;
    // this.editGetData(editUrl),
    this.router.navigate(['/edit-static-content'],{queryParams:{value:JSON.stringify(data)}})
  }

  // editGetData(editUrl) {
  //   const apireq = {
  //     staticId : this.staticId,
  //     title:this.title,
  //     description:this.description
  //   };
  //   this.spinner.show();
  //   this.service.postApii(editUrl, apireq,1).subscribe((success: any) => {
  //     console.log("ffgfg",success);
      
  //     if (success.response_code == 200) {
  //       this.data = success.result;

  //     }
  //     this.spinner.hide();
  //   }, error => {
  //     this.spinner.hide();

  //   });
  // }

}
