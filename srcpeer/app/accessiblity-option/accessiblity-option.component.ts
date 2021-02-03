import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../service/service.service';
import { apiurls } from '../apiUrls';
declare var $: any;
@Component({
  selector: 'app-accessiblity-option',
  templateUrl: './accessiblity-option.component.html',
  styleUrls: ['./accessiblity-option.component.css']
})
export class AccessiblityOptionComponent implements OnInit {
  accessiblityArr: any;
  accessStatus: any;
  accessImage: any;
  apiurl: any;
  whichModal: string;
  accessibilityId: any;

  constructor(private spinner: NgxSpinnerService,public service: ServiceService,public url: apiurls,
    
    ) {
      window.scrollTo(0, 0);
      this.apiurl = this.url.apiUrls;
     }
         
    getstorageType(): any {
    throw new Error("Method not implemented.");
  }


   ngOnInit() {
    this.getAccessiblity();
  }
  addAccessiblity() {
    this.spinner.show();
    let apireq = {
      accessTime: this.accessImage,
      accessImage:this.accessImage,
      accessStatus:this.accessStatus
    };
    this.service.postApi(this.apiurl.addAccessiblity, apireq).subscribe(success => {
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
  
  getAccessiblity () {
    console.log('Data--->>>',this.apiurl)
    this.spinner.show();
    this.service.getApi(this.apiurl.getAccessiblity).subscribe(success => {
      if (success.body.responseCode === 200) {
        this.accessiblityArr = success.body.input.Items;
        console.log('Data ->', success.body);
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
    this.accessibilityId = id;
    this.whichModal ='delete';
    $('#enableDisableDeleteModal').modal({backdrop: 'static', keyboard: false});
  }



  deleteAccessiblity () {
    this.spinner.show();
    console.log('this.accessibilityId',this.accessibilityId);
    let apireq = {
    accessibilityId:this.accessibilityId
    };
    this.service.postApi(this.apiurl.deleteAccessiblity,apireq).subscribe(success => {
      console.log('success ===>>>', success);
      if (success.responseCode === 200) {
        this.getAccessiblity();
        $('#enableDisableDeleteModal').modal('hide');
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


}


