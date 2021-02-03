import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../service/service.service';
import { apiurls } from '../apiUrls';
import { FormGroup, FormControl } from '@angular/forms';
import { forms } from '../forms';
declare var $: any;
@Component({
  selector: 'app-banner-management',
  templateUrl: './banner-management.component.html',
  styleUrls: ['./banner-management.component.css']
})
export class BannerManagementComponent implements OnInit {
  apiurl: any;
  bannerName: any;
  bannerImage: any;
  bannerStatus: any;
  bannerArr: any = [];
  bannerId: any;
  whichModal: any;
  searchData: any;
  SearchForm: FormGroup;
  paginationData: any ={};
  editForm: FormGroup;


  constructor(private spinner: NgxSpinnerService,public service: ServiceService,public url: apiurls,public form: forms
    
    ) {
      window.scrollTo(0, 0);
      this.SearchForm = this.form.searchForm;
      this.SearchForm.reset();
      this.apiurl = this.url.apiUrls;
     }

  ngOnInit() {
    this.getBanner();
    this.editForm = new FormGroup({
      'type': new FormControl(''),
      'banner': new FormControl('')
    })
  }
       
  // getstorageType(): any {
  //   throw new Error("Method not implemented.");
  // }

  // addBanner() {
  //   this.spinner.show();
  //   let apireq = {
  //     bannerName: this.bannerName,
  //     bannerImage:this.bannerImage,
  //     bannerStatus:this.bannerStatus
  //   };
  //   this.service.postApi(this.apiurl.addBanner,apireq).subscribe(success => {
  //     if (success.responseCode === 200) {
  //       // this.service.success(success.responseMessage);
  //       this.spinner.hide();
  //     } else {
  //       // this.service.error(success.responseMessage);
  //       this.spinner.hide();
  //     }
  //   }, error => {
  //     this.spinner.hide();
  //     // this.service.error('Something went wrong');
  //   });
  // }
  
  getBanner() {
    console.log('Data--->>>',this.apiurl)
    this.spinner.show();
    this.service.getApi(this.apiurl.getBanner).subscribe(success => {
      if (success.body.responseCode === 200) {
        this.bannerArr = success.body.input.Items;
        this.searchData = success.body.input.Items;
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


  deleteBanner() {
    this.spinner.show();
    console.log('this.spaceId', this.bannerId);
    let apireq = {
      bannerId: this.bannerId,
    };
    this.service.postApi(this.apiurl.deleteBanner, apireq).subscribe(success => {
      console.log('success ===>>>', success);
      if (success.responseCode === 200) {
        this.getBanner();
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




  openDeleteModal (id) {
    this.bannerId = id;
    this.whichModal ='delete';
    $('#enableDisableDeleteModal').modal({backdrop: 'static', keyboard: false});
  }


  openEditModal(id) {
    this.bannerId = id;
    var detail = this.bannerArr.filter(x => (x.bannerId == this.bannerId));
    this.editForm.patchValue({
      'type': detail[0].bannerName,
      'banner': detail[0].bannerName
    })
    this.bannerImage = detail[0].bannerImage
    $('#editModal').modal('show');
    console.log(detail);

  }

  changeImage(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.bannerImage = event.target[`result`];
      }
    }
  }

  updateBanner() {
    if (this.editForm.invalid) {
      return;
    }
    this.spinner.show();
    console.log('dataklsjcfkljd ==>>', this.editForm.value);
    let apireq = {
      bannerId: this.bannerId,
      bannerImage: this.bannerImage,
      bannerName: this.editForm.value.banner
    };
    this.service.postApi(this.apiurl.editBanner, apireq).subscribe(success => {
      console.log(success);
      if (success.statusCode === 200) {
        $('#editModal').modal('hide');
        this.getBanner();
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      this.service.error('Something went wrong');
    });
  }



  changeStatus(id, action) {
    this.bannerId = id;
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



  searchListData() {
    console.log(this.searchData, this.SearchForm.value.search);
    this.bannerArr = this.searchData
    if (!!this.SearchForm.value.search) {
      console.log('hello');
      this.bannerArr = this.searchData.filter((item) => {
        for(let i=0; i<this.SearchForm.value.search.length; i++) {
          if(item.bannerName.toLowerCase().charAt(i) == this.SearchForm.value.search.toLowerCase().charAt(i)) {
            if(i == this.SearchForm.value.search.length - 1)
              return item;
          }
          else
            return;
        }
        // return item.spaceType.toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1
        // return ((this.filterValue(item.Attributes, 'email').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1) || (this.filterValue(item.Attributes, 'custom:name').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1) || (this.filterValue(item.Attributes, 'custom:fullNumber').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1));
      });
      this.paginationData['total'] = this.bannerArr.length;
    }
    console.log(this.bannerArr);



  }
  // searchData(searchData: any, search: any): any {
  //   throw new Error("Method not implemented.");
  // }





}
