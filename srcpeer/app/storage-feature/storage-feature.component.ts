import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../service/service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { apiurls } from '../apiUrls';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { forms } from '../forms';
declare var $: any;
@Component({
  selector: 'app-storage-feature',
  templateUrl: './storage-feature.component.html',
  styleUrls: ['./storage-feature.component.css']
})
export class StorageFeatureComponent implements OnInit {
  apiurl: any;
  whichModal: any;
  featuresArr: any = [];
  spaceImage:any;
  isSelected:any;
  copystorageList: any;
  paginationData: any ={};
  updateAnswerForm: any;
  features: any;
  featureImage: any;
  featureStatus: any;
  featuresId: any;
  editForm: FormGroup;
  searchData: any;
  search: any;
  SearchForm: FormGroup;
  newArr: any[];
  csvData: any[];


 

  constructor(private spinner: NgxSpinnerService,public service: ServiceService,public url: apiurls,public form: forms
    
    ) {
      this.SearchForm = this.form.searchForm;
      this.SearchForm.reset();
      window.scrollTo(0, 0);
      this.apiurl = this.url.apiUrls;
     }

  ngOnInit() {
   
    this.getstoragefeatures();
    
    this.editForm = new FormGroup({
      'type':new FormControl(''),
      'feature': new FormControl('')
    })
  }
  getstorageType(): any {
    throw new Error("Method not implemented.");
  }


  addStorageFeature() {
    this.spinner.show();
    let apireq = {
      features: this.features,
      featuresId:this.featuresId,
      featureImage:this.featureImage,
      featureStatus:this.featureStatus,
      isSelected:this.isSelected

    };
    this.service.postApi(this.apiurl.addStorageFeatures, apireq).subscribe(success => {
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
  
  getstoragefeatures () {
    console.log('Data--->>>',this.apiurl)
    this.spinner.show();
    this.service.getApi(this.apiurl.getParticularFeatures).subscribe(success => {
      console.log('succ', success)
      if (success.body.responseCode === 200) {
        this.featuresArr = success.body.input;
        this.searchData = success.body.input;
        console.log("features array details======>>>>>>>>>",this.featuresArr[0])
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
  openDeleteModal (id) {
    this.featuresId = id;
    this.whichModal ='delete';
    $('#enableDisableDeleteModal').modal({backdrop: 'static', keyboard: false});
  }



  deleteStorageFeatures () {
    this.spinner.show();
    console.log('this.featuresId', this.featuresId);
    let apireq = {
      featuresId:this.featuresId
    };
    this.service.postApi(this.apiurl.deleteStorageFeatures,apireq).subscribe(success => {
      console.log('success ===>>>', success);
      if (success.responseCode === 200) {
        this.getstoragefeatures();
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
  getParticularFeatures(): any {
    throw new Error("Method not implemented.");
  }


  // searchListData() {
  //   console.log(this.searchData, this.SearchForm.value.search);
  //   this.featuresArr = this.searchData
  //   if (!!this.SearchForm.value.search) {
  //     console.log('hello');
  //     this.featuresArr = this.searchData.filter((item) => {
  //       console.log(item);
  //       return item.features.toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1
  //       // return ((this.filterValue(item.Attributes, 'email').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1) || (this.filterValue(item.Attributes, 'custom:name').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1) || (this.filterValue(item.Attributes, 'custom:fullNumber').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1));
  //     });
  //     this.paginationData['total'] = this.featuresArr.length;
  //   }
  //   console.log(this.featuresArr);

  // }



  searchListData() {
    console.log(this.searchData, this.SearchForm.value.search);
    this.featuresArr = this.searchData
    if (!!this.SearchForm.value.search) {
      console.log('hello');
      this.featuresArr = this.searchData.filter((item) => {
        for(let i=0; i<this.SearchForm.value.search.length; i++) {
          if(item.features.toLowerCase().charAt(i) == this.SearchForm.value.search.toLowerCase().charAt(i)) {
            if(i == this.SearchForm.value.search.length - 1)
              return item;
          }
          else
            return;
        }
        // return item.spaceType.toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1
        // return ((this.filterValue(item.Attributes, 'email').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1) || (this.filterValue(item.Attributes, 'custom:name').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1) || (this.filterValue(item.Attributes, 'custom:fullNumber').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1));
      });
      this.paginationData['total'] = this.featuresArr.length;
    }
    console.log(this.featuresArr);



  }


  async downloadCsv() {
    this.newArr = [];
    this.csvData = [];
    this.featuresArr.forEach((element, i) => {
      this.csvData.push({
        featureImage: this.featuresArr[i].featureImage,
        features: this.featuresArr[i].features,
        status: (this.featuresArr[i].isSelected)?('Activated'):('Deactivated')
      })
    });
    await this.download();
  }
    

  download() { 
    var options = {
      headers: [ 'Feature Image', ' Features', 'Status']
    };
    new ngxCsv(this.csvData, 'My Report', options);
  }

 

openEditModal(id) {  
  this.featuresId = id;
  var detail =this.featuresArr.filter(x=>(x.featuresId == this.featuresId));
  this.editForm.patchValue({
    'type':detail[0].features,
    'feature':detail[0].features
  })
  this.featureImage = detail[0].featureImage
  $('#editModal').modal('show');
  console.log(detail);
 
}

changeImage(event) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      this.featureImage = event.target[`result`];
    }
  }
}

updateStorageFeatureType() {
  if (this.editForm.invalid) {
    return;
  }
  this.spinner.show();
  console.log('dataklsjcfkljd ==>>', this.editForm.value);
  let apireq = {
    featuresId :this.featuresId,
    featureImage : this.featureImage,
    features :this.editForm.value.feature
  };
  this.service.postApi(this.apiurl.editStorageFeatures, apireq).subscribe(success => {
    console.log(success);
    if (success.statusCode === 200) {
      $('#editModal').modal('hide');
      this.getstoragefeatures();
      this.spinner.hide();
    } else {
      this.spinner.hide();
    }
  }, error => {
    this.spinner.hide();
    this.service.error('Something went wrong');
  });
}



changeStatus(id,action){
  this.featuresId = id;
  if(action == 'activate'){
    this.whichModal='enable';
  $('#enableDisableDeleteModal').modal({backdrop:'static' , keyboard:true})
  }else {
    this.whichModal = 'disable';
    $('#enableDisableDeleteModal').modal({backdrop:'static' , keyboard:true})
  }
}
 


// anableDisable(action){
//   if(action == 'enable'){

//   }else {

//   }
// }

anableDisable(enableorDisable) {
  if (enableorDisable === 'disable') {
    // this.disableUser();
  } else {
    if (enableorDisable === 'enable') {
      this.enableUser();
    } else {
      this.deleteSubadmin();
    }
  }
}
  enableUser(): any {
    throw new Error("Method not implemented.");
  }
  deleteSubadmin(): any {
    throw new Error("Method not implemented.");
  }

//   disableUser() {
//   console.log('disable func ===>>>', this.particularUserData );
//   this.spinner.show();
//   var params = {
//     UserPoolId: 'us-east-1_DdVuKjB9D', /* required */
//     Username: this.particularUserData.Attributes.filter(item => {
//       return item.Name === 'email';
//     })[0].Value /* required */
//   };
//   console.log('params===>>>', params)
//   var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
//   cognitoidentityserviceprovider.adminDisableUser(params, (err, response) => {
//     if (err) {
//       this.spinner.hide();
//       console.log('error ===>>', err);
//     } else {
//       this.getstoragefeature();
//       this.spinner.hide();
//       $('#enableDisableDeleteModal').modal('hide');
//       console.log('data ===>>', response);           // successful response
//     }
//   });
// }

}





