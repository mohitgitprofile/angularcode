import { Component, OnInit } from '@angular/core';
import { apiurls } from '../apiUrls';
import { ServiceService } from '../service/service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup } from '@angular/forms';
import { forms } from '../forms';
import { validationMessage } from '../validationMessage';

declare var $: any;

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  apiurl: any;
  faqQuestions: any;
  updateAnswerForm: FormGroup;
  questionId: any;
  validationMessage: any;
  whichModal: any;

  constructor(
    private spinner: NgxSpinnerService,
    public url: apiurls,
    public service: ServiceService,
    public form: forms,
    public validation: validationMessage
  ) {
    window.scrollTo(0, 0);
    this.apiurl = this.url.apiUrls;
    this.validationMessage = validation.message;
  }

  ngOnInit() {
    this.updateAnswerForm = this.form.updateAnswerForm;
    this.updateAnswerForm.reset();
    this.getFAQs();
  }

  getFAQs () {
    this.spinner.show();
    this.service.getApi(this.apiurl.faq).subscribe(success => {
      if (success.body.responseCode === 200) {
        this.faqQuestions = success.body.input.Items;
        console.log(this.faqQuestions);
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      this.service.error('Something went wrong');
    });
  }

  openEditModal(id) {
    this.whichModal = 'editFaq';
    this.questionId = id;
    console.log(this.questionId);
    $('#viewAnswer').modal({backdrop: 'static', keyboard: false});
    this.updateAnswerForm.patchValue({
      question : this.questionId.question,
      answer : this.questionId.answer
    });
  }

  updateAnswerModal() {
    if (this.updateAnswerForm.invalid) {
      return;
    }
    this.spinner.show();
    console.log('dataklsjcfkljd ==>>', this.updateAnswerForm.value);
    let apireq = {
      queryId : this.questionId.queryId,
      answer : this.updateAnswerForm.value.answer,
      question : this.updateAnswerForm.value.question
    };
    this.service.postApi(this.apiurl.editFaq, apireq).subscribe(success => {
      console.log(success);
      if (success.statusCode === 200) {
        $('#viewAnswer').modal('hide');
        this.getFAQs();
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      this.service.error('Something went wrong');
    });
  }

  openDeleteModal (id) {
    this.questionId = id;
    $('#deleteModal').modal({backdrop: 'static', keyboard: false});
  }

  deleteFaq () {
    this.spinner.show();
    console.log('this.questionId', this.questionId);
    let apireq = {
      queryId: this.questionId.queryId,
      question: this.questionId.question
    };
    this.service.postApi(this.apiurl.deleteFaq, apireq).subscribe(success => {
      console.log('success ===>>>', success);
      if (success.responseCode === 200) {
        this.getFAQs();
        $('#deleteModal').modal('hide');
        this.service.success(success.responseMessage);
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    }, error => {
      this.service.error('Something went wrong');
      this.spinner.hide();
    });
  }

  addFaqModal(whichModal) {
    setTimeout(() => {
      this.updateAnswerForm.reset();
    }, 20);
    this.whichModal = whichModal;
    $('#viewAnswer').modal({backdrop: 'static', keyboard: false});
  }

  addFaq() {
    if (this.updateAnswerForm.invalid) {
      return;
    }
    this.spinner.show();
    let apireq = {
      question: this.updateAnswerForm.value.question,
      answer: this.updateAnswerForm.value.answer
    };
    this.service.postApi(this.apiurl.addFaq, apireq).subscribe(success => {
      if (success.responseCode === 200) {
        this.getFAQs();
        $('#viewAnswer').modal('hide');
        this.service.success(success.responseMessage);
        this.spinner.hide();
      } else {
        this.service.error(success.responseMessage);
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      this.service.error('Something went wrong');
    });
  }

  toggle(index) {
    $('#aa' + index).toggle(500);
  }

}
