import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { validationMessage } from '../validationMessage';
import { forms } from '../forms';
import { ServiceService } from '../service/service.service';
import { apiurls } from '../apiUrls';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-static-content-edit',
  templateUrl: './static-content-edit.component.html',
  styleUrls: ['./static-content-edit.component.css']
})
export class StaticContentEditComponent implements OnInit {

  staticForm: FormGroup;
  validationMessage: any;
  apiurl: any;
  param: any;

  constructor(
    private spinner: NgxSpinnerService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public validation: validationMessage,
    public form: forms,
    public service: ServiceService,
    public urls: apiurls) {
      window.scrollTo(0, 0);
      this.validationMessage = this.validation.message;
      this.staticForm = this.form.staticForm;
      this.apiurl = this.urls.apiUrls;
    }

  ngOnInit() {
    this.getContentType();
  }

  getContentType() {
    this.activatedRoute.params.subscribe(params => {
      this.param = params;
      this.setTitle(params);
      this.getStaticContent(params);
    });
  }

  setTitle(params) {
    if (params.contentType === 'PRIVACY') {
      this.staticForm.patchValue({
        title : 'Privacy Policy'
      });
    } else if (params.contentType === 'TERMS') {
      this.staticForm.patchValue({
        title : 'Terms and Condition'
      });
    }
  }

  getStaticContent (params) {
    this.spinner.show();
    this.service.getApi(this.apiurl.staticContent).subscribe(success => {
      if (success.body.responseCode === 200) {
        var data = success.body.input.filter(res => {
          return res.staticId === params.contentType;
        });
        this.staticForm.patchValue({
          title : data[0].Title,
          content : data[0].description
        });
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      this.service.error('Something went wrong');
    });
  }

  submit(data) {
    console.log(JSON.stringify(data));
    if (this.staticForm.invalid) {
      return;
    }
    this.spinner.show();
    let apireq = {
      staticId :this.param.contentType,
      descriptions :this.staticForm.value.content
    };
    this.service.postApi(this.apiurl.editStaticContent, apireq).subscribe(success => {
        console.log(success);
        if (success.responseCode === 200) {
          this.spinner.hide();
          this.router.navigate(['/header/staticContentManagement']);
        } else {
          this.spinner.hide();
        }
    }, error => {
      this.spinner.hide();
      this.service.error('Something went wrong');
    });
  }




}
