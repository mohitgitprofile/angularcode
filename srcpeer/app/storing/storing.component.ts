import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../service/service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { apiurls } from '../apiUrls';
declare var $: any;

@Component({
  selector: 'storing',
  templateUrl: './storing.component.html',
  styleUrls: ['./storing.component.css']
})
export class storingPlanComponent implements OnInit {

  apiurl: any;
  whichModal: any;
  spaceImage:any;
  isSelected:any;
  copystorageList: any;
  paginationData: any;
  updateAnswerForm: any;
  editForm: FormGroup;
  storingItem: any;
  itemId: any;
  storingArr: any;
  constructor(private spinner: NgxSpinnerService,public service: ServiceService,public url: apiurls,
    
    ) {
      window.scrollTo(0, 0);
      this.apiurl = this.url.apiUrls;
     }

  ngOnInit() {
    this.getStoringPlan();
    this.editForm = new FormGroup({
      'type':new FormControl(''),
      'storingItem': new FormControl('')
    })
  }
  getstorageType(): any {
    throw new Error("Method not implemented.");
  }


  addStoringPlan() {
    this.spinner.show();
    let apireq = {
     
      itemId:this.itemId,
      storingItem:this.storingItem,
   

    };
    this.service.postApi(this.apiurl.addStoringPlan, apireq).subscribe(success => {
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
  
  getStoringPlan () {
    console.log('Data--->>>',this.apiurl)
    this.spinner.show();
    this.service.getApi(this.apiurl.getStoringPlan).subscribe(success => {
      if (success.body.responseCode === 200) {
        this.storingArr = success.body.input.Items;
        console.log("features array details======>>>>>>>>>",this.storingArr[0])
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
    this.itemId = id;
    this.whichModal ='delete';
    $('#enableDisableDeleteModal').modal({backdrop: 'static', keyboard: false});
  }



  deleteStoringPlan () {
    this.spinner.show();
    console.log('this.itemId', this.itemId);
    let apireq = {
      itemId:this.itemId
    };
    this.service.postApi(this.apiurl.deleteStoringPlan,apireq).subscribe(success => {
      console.log('success ===>>>', success);
      if (success.responseCode === 200) {
        this.getStoringPlan();
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


openEditModal(id) {  
  this.itemId = id;
  var detail =this.storingArr.filter(x=>(x.itemId == this.itemId));
  this.editForm.patchValue({
    'type':detail[0].storingItem,
    'storingItem':detail[0].storingItem
  })
  $('#editModal').modal('show');
  console.log(detail);
 
}

// changeImage(event) {
//   if (event.target.files && event.target.files[0]) {
//     var reader = new FileReader();

//     reader.readAsDataURL(event.target.files[0]); // read file as data url

//     reader.onload = (event) => { // called once readAsDataURL is completed
//       this.featureImage = event.target[`result`];
//     }
//   }
// }

updateStoringItemType() {
  if (this.editForm.invalid) {
    return;
  }
  this.spinner.show();
  console.log('dataklsjcfkljd ==>>', this.editForm.value);
  let apireq = {
    itemId :this.itemId,
    storingItem : this.editForm.value.storingItem,
   
  };
  this.service.postApi(this.apiurl.editStoringPlan, apireq).subscribe(success => {
    console.log(success);
    if (success.statusCode === 200) {
      $('#editModal').modal('hide');
      this.getStoringPlan();
      this.spinner.hide();
    } else {
      this.spinner.hide();
    }
  }, error => {
    this.spinner.hide();
    this.service.error('Something went wrong');
  });
}



// changeStatus(id,action){
//   this.featuresId = id;
//   if(action == 'activate'){
//     this.whichModal='enable';
//   $('#enableDisableDeleteModal').modal({backdrop:'static' , keyboard:true})
//   }else {
//     this.whichModal = 'disable';
//     $('#enableDisableDeleteModal').modal({backdrop:'static' , keyboard:true})
//   }
// }
 


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






