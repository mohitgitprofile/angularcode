import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../service/service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { apiurls } from '../apiUrls';
import { forms } from '../forms';
declare var $: any;

@Component({
  selector: 'app-price-city-storage',
  templateUrl: './price-city-storage.component.html',
  styleUrls: ['./price-city-storage.component.css']
})
export class PriceCityStorageComponent implements OnInit {
  city: any;
  apiurl: any;
  maxSize: any;
  minsize: any;
  recommendedPrice: any;
  storageType: any;
  editForm: FormGroup;
  SearchForm: FormGroup;
  adminArr: any;
  whichModal: string;

  paginationData: any;
  updateAnswerForm: any;
  constructor(private spinner: NgxSpinnerService,public service: ServiceService,public url: apiurls,public form: forms
    
    ){
      this.SearchForm = this.form.searchForm;
      this.SearchForm.reset();
      window.scrollTo(0, 0);
      this.apiurl = this.url.apiUrls;
     }


 
  ngOnInit() {
   
    this.getAdmincity();
    
    this.editForm = new FormGroup({
      'type':new FormControl(''),
      'admin': new FormControl('')
    })
  }
  


  addAdmincity() {
    this.spinner.show();
    let apireq = {
      city: this.city,
      maxSize:this.maxSize,
      minsize:this.minsize,
      recommendedPrice:this.recommendedPrice,
      storageType:this.storageType

    };
    this.service.postApi(this.apiurl.admincityprice, apireq).subscribe(success => {
      if (success.responseCode === 200) {
        // this.service.success(success.responseMessage);
        this.spinner.hide();
      } else {
        // this.service.error(success.responseMessage);
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      // this.service.error('Something went wrong');
    });
  }
  
  getAdmincity () {
    console.log('Data--->>>',this.apiurl)
    this.spinner.show();
    this.service.getApi(this.apiurl.getAdminCitys).subscribe(success => {
      console.log('succ', success)
      if (success.body.responseCode === 200) {
       
        this.adminArr = success.body.input.Items;
     
        console.log("features array details======>>>>>>>>>",this.adminArr[0])
        console.log('Data ->', success.body);
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    }, error => {
      console.log('err', error)
      this.spinner.hide();
      this.service.error('Something went wrong');
    });
    
  }  


}

