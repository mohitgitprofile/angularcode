import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.css']
})
export class EditeventComponent implements OnInit {

  editSubadminForm: FormGroup
  paramData: any;
  userData: any;
  kycImage: any;
  dateofb: any;
  todaye: any;
  dataloop: any;
  loopdata: any=[];
  todayee: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: ServiceService,
    private spinner: NgxSpinnerService) { 
      this.todayee = new Date().toISOString().split("T")[0];
      console.log("hfhjgfghdfghjf",this.todayee);

    }

  ngOnInit() {
    this.service.getApi('admin/listOfPublistCategory').subscribe(success=>{
      console.log("hgfhgf",success)
      this.dataloop = success.result[0];
      this.dataloop.forEach(element => {
        this.loopdata.push(element.categoryName);
      });
      console.log("fdgghdfghdfgh",this.loopdata)
    })
    this.form();
    this.route.params.subscribe((id) => {
      this.paramData = id.id;
      console.log("dfgdfg", this.paramData);
      this.getUserData();
    })
  }
  form() {
    this.editSubadminForm = new FormGroup({
      name             : new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(30)]),
      category       : new FormControl('', [Validators.required]),
      eventType      : new FormControl('', [Validators.required]),
      dateofEvent      : new FormControl('', [Validators.required]),
    });
  }
  getUserData() {
    this.spinner.show();
    console.log("jhgfjgjhgfhjk", this.paramData);
    this.service.postApii('admin/listOfEvent', { eventId: this.paramData }, 1).subscribe(success => {
      if (success.response_code == 200) {
        console.log("userdata", success)
        this.userData = success.result[0];
        this.kycImage = this.userData.profilePic;
        this.dateofb = this.userData.createdAt;
        console.log("dfsfsdfsd",this.dateofb);
        this.todaye = this.dateofb.split("T")[0]
        console.log("gdfhjgfhjgfhjgf",this.todaye)
        this.editSubadminForm.patchValue({
          name: this.userData.eventName,
          category: this.userData.categoryId._id,
          eventType: this.userData.eventType,
          dateofEvent: this.userData.dateOfEvent
        })
        console.log("userdata", this.userData)
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })
  }

  updateSubadmin() {
    this.spinner.show();
    let data = {
      eventId: this.paramData,
      eventType: this.editSubadminForm.value.eventType,
      eventName: this.editSubadminForm.value.name,
      dateOfEvent: this.editSubadminForm.value.dateofEvent
    }
    this.service.postApii('admin/editEvent', data, 1).subscribe(success => {
      if (success.response_code == 200) {
        console.log("success", success)
        this.router.navigate(['/event-management'])
        this.spinner.hide();
      }
      else {
        console.log("else", success);
        this.spinner.hide();
      }
    }, (error) => {
      console.log("error", error)
      this.spinner.hide();
    })
  }

}
