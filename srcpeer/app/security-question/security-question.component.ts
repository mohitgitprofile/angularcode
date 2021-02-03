import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { validationMessage } from '../validationMessage';
import { forms } from '../forms';
import { ServiceService } from '../service/service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { apiurls } from '../apiUrls';
declare var $: any;
@Component({
  selector: 'app-security-question',
  templateUrl: './security-question.component.html',
  styleUrls: ['./security-question.component.css']
})
export class SecurityQuestionComponent implements OnInit {

  securityQuestionForm: FormGroup;
  validationMessage: any;
  question: any;
  email: any;
  apiUrl: any;

  constructor(
    private spinner: NgxSpinnerService,
    public service: ServiceService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public validation: validationMessage,
    public form: forms,
    public urls: apiurls) {
      window.scrollTo(0, 0);
     }

  ngOnInit() {
    this.getEmail();
    $('#exampleModal').modal('hide');
    this.validationMessage = this.validation.message;
    this.securityQuestionForm = this.form.securityQuestionForm;
    this.securityQuestionForm.reset();
    this.apiUrl = this.urls.apiUrls;
    this.getQuestion();
  }

  getEmail() {
    this.activatedRoute.params.subscribe(params => {
      this.email = params.email;
    });
  }

  getQuestion() {
    this.spinner.show();
    this.service.getApi(this.apiUrl.getSecurityQuesstion).subscribe(success => {
      console.log('success ===>>>', success);
      if (success.responseCode === 200) {
        this.question = success.input;
        this.spinner.hide();
      } else {
        this.service.error(success.responseMessage);
        this.spinner.hide();
      }
    }, error => {
      this.service.error('Something went wrong');
      this.spinner.hide();
    });
  }

  submit (data) {
    if (this.securityQuestionForm.invalid) {
      return;
    }
    this.spinner.show();
    let apireq = {
      'questionId': this.question.questionId,
      'answer': Number(data.answer)
    };
    this.service.postApi(this.apiUrl.verifyAnswer, apireq).subscribe(success => {
      console.log('success ===>>>', success);
      if (success.statusCode === 200) {
        this.spinner.hide();
        localStorage.removeItem('login');
        localStorage.setItem('email', this.email);
        this.service.success('verified successfully!');
        this.router.navigate(['/header/dashboard']);
      } else {
        this.service.error(success.body.message);
        this.spinner.hide();
      }
    }, error => {
      this.service.error('Something went wrong');
      this.spinner.hide();
    });

  }

  back() {
    localStorage.removeItem('login');
  }

}
