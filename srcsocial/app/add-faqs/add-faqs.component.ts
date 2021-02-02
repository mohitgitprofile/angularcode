import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-faqs',
  templateUrl: './add-faqs.component.html',
  styleUrls: ['./add-faqs.component.css']
})
export class AddFaqsComponent implements OnInit {
  faqForm:FormGroup
  addFaqs: any;
  constructor(private service: ServiceService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.form()
  }
  form(){
    this.faqForm= new FormGroup({
      question: new FormControl('',[Validators.required]),
      answer: new FormControl('',[Validators.required])
    })
  }

  addFaq(){
    let data={
      question:this.faqForm.value.question,
      answer  :this.faqForm.value.answer
      
    }
    // this.spinner.show();
    this.service.postApii('faq/addFaq', data,1).subscribe((success)=>{
      if(success.response_code==200){
        this.addFaqs=success.result;
        // this.spinner.hide();
        this.router.navigate(['/faqs'])
      }
    },(error)=>{
      this.service.error("something went wrong")
    })
  }

}
