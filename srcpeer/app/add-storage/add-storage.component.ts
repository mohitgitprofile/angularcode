import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { validationMessage } from '../validationMessage';
import { forms } from '../forms';
import { ServiceService } from '../service/service.service';
import { apiurls } from '../apiUrls';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-storage',
  templateUrl: './add-storage.component.html',
  styleUrls: ['./add-storage.component.css']
})
export class AddStorageComponent implements OnInit {


  addStorageForm: FormGroup;
  validationMessage: any;
  apiurl: any;
  param: any;
  image: any;

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
    this.addStorageForm = this.form.addStorageForm;
    this.apiurl = this.urls.apiUrls;
  }

  ngOnInit() {
  }


  selectImages(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.image = event.target.result;
      }
    }
  }

  submit(data) {
    console.log(JSON.stringify(data));
    if (this.addStorageForm.invalid) {
      return;
    }
    this.spinner.show();
    let apireq = {
      spaceType: this.addStorageForm.value.storageType,
      spaceImage: this.image
    };
    this.service.postApi(this.apiurl.addStorage, apireq).subscribe(success => {
      console.log(success);
      if (success.responseCode === 200) {
        this.spinner.hide();
        this.router.navigate(['/header/master-setup']);
      } else {
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      this.service.error('Something went wrong');
    });
  }

}
