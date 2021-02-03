import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../service/service.service';
import { apiurls } from '../apiUrls';
import { FormGroup, FormControl } from '@angular/forms';
import { forms } from '../forms';
declare var $: any;
@Component({
  selector: 'app-fee-management',
  templateUrl: './fee-management.component.html',
  styleUrls: ['./fee-management.component.css']
})
export class FeeManagementComponent implements OnInit {

  apiurl: any;
  whichModal: any;
 
  copystorageList: any;
  paginationData: any = {};
  spaceType: any;
  spaceId: any;
  updateAnswerForm: any;
  editForm: FormGroup;
  storageImage: void;
  feeArr: any;
  searchData: any;
  serviceFee: any;
  cancellationFees: any;
  uuid: any;
 
  constructor(private spinner: NgxSpinnerService,public service: ServiceService,public url: apiurls,public form: forms
    
    ) {
      window.scrollTo(0, 0);
      this.apiurl = this.url.apiUrls;
     }

  ngOnInit() {
    this.getFee();
    this.editForm = new FormGroup({
      'type':new FormControl(''),
      'fee': new FormControl('')
    })
  }

  getFee () {
    this.spinner.show();
    this.service.getApi(this.apiurl.getFeeManagement).subscribe(success => {
      this.spinner.hide();
      if (success.body.responseCode === 200) {
        this.feeArr = success.body.input.Items;
        this.searchData = success.body.input.Items;
        this.serviceFee = this.searchData[0].serviceFee;
        this.cancellationFees = this.searchData[0].cancellationFees;
        this.uuid = this.searchData[0].uuid;
      }
    }, error => {
      this.spinner.hide();
      this.service.error('Something went wrong');
    });
  } 

  addPercentageSign() {
    
  }

  updateStorageType() {
    this.spinner.show();
    console.log('dataklsjcfkljd ==>>', this.editForm.value);
    let apireq = {
      uuid : this.uuid,
      serviceFee : this.serviceFee,
      cancellationFees : this.cancellationFees
    };
    this.service.postApi(this.apiurl.editFeeManagement, apireq).subscribe(success => {
      console.log(success);
      if (success.statusCode === 200) {
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

