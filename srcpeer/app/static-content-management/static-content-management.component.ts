import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { apiurls } from '../apiUrls';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-static-content-management',
  templateUrl: './static-content-management.component.html',
  styleUrls: ['./static-content-management.component.css']
})
export class StaticContentManagementComponent implements OnInit {

  staticData: any = [];
  apiurl: any;

  constructor(
    private spinner: NgxSpinnerService,
    public service: ServiceService,
    public url: apiurls) {
    window.scrollTo(0, 0);
    this.apiurl = this.url.apiUrls;
   }

  ngOnInit() {
    this.getStaticContentList();
  }

  getStaticContentList() {
    this.spinner.show();
    this.service.getApi(this.apiurl.staticContent).subscribe(success => {
      console.log('success ===>>', success);
      if (success.body.responseCode === 200) {
        this.staticData = success.body.input;
        //  this.staticData.push({Title: 'FAQ', type: 'FAQ'});
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      console.log(error);
      this.service.error('Something went wrong');
    });
  }
}

