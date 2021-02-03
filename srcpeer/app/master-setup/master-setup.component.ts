import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { ServiceService } from '../service/service.service';
import { apiurls } from '../apiUrls';
import { FormGroup, FormControl } from '@angular/forms';
import { forms } from '../forms';

declare var $: any;


@Component({
  selector: 'app-master-setup',
  templateUrl: './master-setup.component.html',
  styleUrls: ['./master-setup.component.css']
})
export class MasterSetupComponent implements OnInit {
  apiurl: any;
  whichModal: any;
  spaceTypeArr: any = [];
  spaceImage: any;
  isSelected: any;
  copystorageList: any;
  paginationData: any = {};
  spaceType: any;
  spaceId: any;
  updateAnswerForm: any;
  editForm: FormGroup;
  storageImage: void;
  searchData: any;
  SearchForm: FormGroup;
  status: string[];
  formula: any;
  csvData: any[];
  newArr: any[];
  constructor(private spinner: NgxSpinnerService, public service: ServiceService, public url: apiurls, public form: forms

  ) {
    window.scrollTo(0, 0);
    this.SearchForm = this.form.searchForm;
    this.SearchForm.reset();
    this.apiurl = this.url.apiUrls;
  }

  ngOnInit() {
    this.getstorageType();
    this.editForm = new FormGroup({
      'type': new FormControl(''),
      'storage': new FormControl('')
    })
  }


  addStorage() {
    this.spinner.show();
    let apireq = {
      spaceType: this.spaceType,
      spaceImage: this.spaceImage,
      isSelected: this.isSelected
    };
    this.service.postApi(this.apiurl.addStorage, apireq).subscribe(success => {
      if (success.responseCode === 200) {
        // this.service.success(success.responseMessage);
        this.spinner.hide();
      } else {
        // this.service.error(success.responseMessage);
        this.spinner.hide();
      }
    }, () => {
        this.spinner.hide();
      });
  }

getstorageType() {
    console.log('Data--->>>', this.apiurl)
    this.spinner.show();
    this.service.getApi(this.apiurl.getStorage).subscribe(success => {
      if (success.body.responseCode === 200) {
        this.spaceTypeArr = success.body.input.Items;
        this.searchData = success.body.input.Items;
        console.log('Data ->', success.body);
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    }, () => {
        this.spinner.hide();
        this.service.error('Something went wrong');
      });


  }
  openDeleteModal(id) {
    this.spaceId = id;
    this.whichModal = 'delete';
    $('#enableDisableDeleteModal').modal({ backdrop: 'static', keyboard: false });
  }


  // downloadCSV() {
  //   this.status = ["approved", "rejected", "pending"];
  //   var data = [  
  //     {
  //      spaceType:"lkjbdd",
  //      spaceImage:"jdbkdj",
  //      status:"jdknd"
  //     },
  //     {
  //       spaceType:"lkjbdd",
  //       spaceImage:"jdbkdj",
  //       status:"jdknd"
  //      },
  //      {
  //       spaceType:"lkjbdd",
  //       spaceImage:"jdbkdj",
  //       status:"jdknd"
  //      },
  //      {
  //       spaceType:"lkjbdd",
  //       spaceImage:"jdbkdj",
  //       status:"jdknd"
  //      }
  //   ];

  //   var options = {
  //     title: 'User Details',
  //     fieldSeparator: ',',
  //     quoteStrings: '"',
  //     decimalseparator: '.',
  //     showLabels: true,
  //     showTitle: true,
  //     useBom: true,
  //     headers: ['spaceType', 'spaceImage', 'Status']
  //   };

  //   new Angular5Csv(data, 'My Report');
  // }

  async downloadCsv() {
    this.newArr = [];
    this.csvData = [];
    this.spaceTypeArr.forEach((element, i) => {
      this.csvData.push({
        spaceImage: this.spaceTypeArr[i].spaceImage,
        spaceType: this.spaceTypeArr[i].spaceType,
        status: (this.spaceTypeArr[i].isSelected)?('Activated'):('Deactivated')
      })
    });
    await this.download();
  }
    

  download() { 
    var options = {
      headers: [ 'Space Image', ' Space Type', 'Status']
    };
    new ngxCsv(this.csvData, 'My Report', options);
  }


  searchListData() {
    console.log(this.searchData, this.SearchForm.value.search);
    this.spaceTypeArr = this.searchData
    if (!!this.SearchForm.value.search) {
      console.log('hello');
      this.spaceTypeArr = this.searchData.filter((item) => {
        for(let i=0; i<this.SearchForm.value.search.length; i++) {
          if(item.spaceType.toLowerCase().charAt(i) == this.SearchForm.value.search.toLowerCase().charAt(i)) {
            if(i == this.SearchForm.value.search.length - 1)
              return item;
          }
          else
            return;
        }
        // return item.spaceType.toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1
        // return ((this.filterValue(item.Attributes, 'email').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1) || (this.filterValue(item.Attributes, 'custom:name').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1) || (this.filterValue(item.Attributes, 'custom:fullNumber').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1));
      });
      this.paginationData['total'] = this.spaceTypeArr.length;
    }
    console.log(this.spaceTypeArr);



  }





  deleteStorage() {
    this.spinner.show();
    console.log('this.spaceId', this.spaceId);
    let apireq = {
      spaceId: this.spaceId,
    };
    this.service.postApi(this.apiurl.deleteStorage, apireq).subscribe(success => {
      console.log('success ===>>>', success);
      if (success.responseCode === 200) {
        this.getstorageType();
        $('#enableDisableDeleteModal').modal('hide');
        this.service.success(success.responseMessage);
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    }, () => {
        this.service.error('Something went wrong');
        this.spinner.hide();
      });
  }


  openEditModal(id) {
    this.spaceId = id;
    var detail = this.spaceTypeArr.filter(x => (x.spaceId == this.spaceId));
    this.editForm.patchValue({
      'type': detail[0].spaceType,
      'storage': detail[0].spaceType
    })
    this.storageImage = detail[0].spaceImage
    $('#editModal').modal('show');
    console.log(detail);

  }

  changeImage(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.storageImage = event.target[`result`];
      }
    }
  }

  updateStorageType() {
    if (this.editForm.invalid) {
      return;
    }
    this.spinner.show();
    console.log('dataklsjcfkljd ==>>', this.editForm.value);
    let apireq = {
      spaceId: this.spaceId,
      spaceImage: this.storageImage,
      spaceType: this.editForm.value.storage
    };
    this.service.postApi(this.apiurl.editStorage, apireq).subscribe(success => {
      console.log(success);
      if (success.statusCode === 200) {
        $('#editModal').modal('hide');
        this.getstorageType();
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    }, () => {
        this.spinner.hide();
        this.service.error('Something went wrong');
      });
  }


  // Change Status of Storage Type
  changeStatus(id, action) {
    this.spaceId = id;
    if (action == 'activate') {
      this.whichModal = 'enable';
      $('#enableDisableDeleteModal').modal({ backdrop: 'static', keyboard: true })
    } else {
      this.whichModal = 'disable';
      $('#enableDisableDeleteModal').modal({ backdrop: 'static', keyboard: true })
    }
  }



  anableDisable(action) {
    if (action == 'enable') {

    } else {

    }
  }
}




