import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {

  addSubadminForm: FormGroup;
  todaye: string;
  dataloop: any;
  loopdata: any=[];

  constructor(
    private router: Router,
    private service: ServiceService,
    private spinner: NgxSpinnerService

  ) {

    this.todaye = new Date().toISOString().split("T")[0];
    console.log("hfhjgfghdfghjf",this.todaye);

   }

  ngOnInit() {
    this.form();
    this.categorylist();
  }

  categorylist() {
    this.service.getApi('admin/listOfPublistCategory').subscribe(success=>{
      console.log("hgfhgf",success)
      this.dataloop = success.result[0];
      this.dataloop.forEach(element => {
        this.loopdata.push(element.categoryName);
      });
      console.log("fdgghdfghdfgh",this.loopdata)
    })
  }


  form() {
    this.addSubadminForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(60)]),
      doe: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      event: new FormControl('', [Validators.required])
    });
  }


  addEvent() {
    let data = {
      dateOfEvent: this.addSubadminForm.value.doe,
      eventName : this.addSubadminForm.value.name,
      categoryId: this.addSubadminForm.value.category,
      eventType: "Private",
    }
    console.log("jhgkjugkjgkjg",data);
    
    this.service.postApii('admin/addEvent',data,1).subscribe(success=>{
      if(success.response_code == 200){
        this.router.navigate(['/event-management'])
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    },(error=>{
      this.spinner.hide();
      console.log("dfghdfghdfh",error);
      
    }))
  }

}
