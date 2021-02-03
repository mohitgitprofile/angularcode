import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { apiurls } from '../apiUrls';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-view-static-content',
  templateUrl: './view-static-content.component.html',
  styleUrls: ['./view-static-content.component.css']
})
export class ViewStaticContentComponent implements OnInit {
  param: any;
  apiurl: any;
  data: any = [];

  constructor(
    private spinner: NgxSpinnerService,
    public activatedRoute: ActivatedRoute,
    public urls: apiurls,
    public service: ServiceService
  ) {
      this.apiurl = this.urls.apiUrls;
   }

  ngOnInit() {
    this.getContentType();
  }

  getContentType() {
    this.activatedRoute.params.subscribe(params => {
      this.param = params;
      this.getStaticContent(params);
    });
  }

  getStaticContent (params) {
    this.spinner.show();
    this.service.getApi(this.apiurl.staticContent).subscribe(success => {
      if (success.body.responseCode === 200) {
        this.data = success.body.input.filter(res => {
          return res.staticId === params.contentId;
        });
        console.log('this.data==>>', this.data);
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      this.service.error('Something went wrong');
    });
  }

}
