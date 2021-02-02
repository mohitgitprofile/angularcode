import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IoTThingsGraph } from 'aws-sdk/clients/all';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-faqs',
  templateUrl: './edit-faqs.component.html',
  styleUrls: ['./edit-faqs.component.css']
})
export class EditFaqsComponent implements OnInit {
  id: any;
  editData: any;
  question: any;
  answer: any;
  faqForm:FormGroup
  constructor(
    private service: ServiceService, 
    private router: Router, 
    private spinner: NgxSpinnerService,
    public active:ActivatedRoute
  ) 
  { this.active.queryParams.subscribe((params)=>{
    this.id=params.id
  })
  }

  ngOnInit() {
    this.editfaqs();
    this.form()
  }

  form(){
    this.faqForm= new FormGroup({
      questions: new FormControl(''),
      answers: new FormControl('')
    })
  }

  editfaqs(){
    console.log("fk",5656566556);
    
    let data={
      faqId:this.id,
      // question:this.faqForm.value.questions,
      // answer:this.faqForm.value.answers
    }
    this.service.postApii('faq/editFaq', data,  1).subscribe(success => {
      console.log("success",success);
      if(success.response_code == 200) {
        // this.service.success(success.response_message)
        this.editData = success.result
        this.question=success.result.question
        this.answer=success.result.answer
        this.faqForm.patchValue({
          questions:this.question,
          answers:this.answer
        })
        // this.router.navigate(['/faqs'])
       console.log("sdfgasd",this.editData)
      }
      else {
        this.service.error('something went wrong')
      }
    })
   }
  updateFaq(){
    let data={
      faqId:this.id,
      question:this.faqForm.value.questions,
      answer:this.faqForm.value.answers
    }
    console.log('lfrrgl', data);
    
    this.service.postApii('faq/editFaq', data, 1).subscribe((success)=>{
      if(success.response_code==200){
        this.router.navigate(['/faqs'])
      }
    },(error)=>{
      this.service.error("something went wrong")
    })
  }

}
