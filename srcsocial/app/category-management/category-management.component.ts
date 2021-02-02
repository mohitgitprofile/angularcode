import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ngxCsv } from 'ngx-csv/ngx-csv';

declare var $:any;
@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  searchForm: FormGroup;
  pagination: any = {limit: 10, currPage: 1, total: 0};
  userList: any = [];
  copyUserList: any = [];
  sortOnCreatedAtKey: any = 1;
  sortOnUpdateedAtKey: any = 1;
  sortOnNameKey: any = 1;
  totalUsers: any = 0;
  whichmodal: string;
  particularUserData: any;
  permission: any = [];
  calender: any = { toDate: '', formdate: '' }
  minAge: Date;
  fromDate: any = '';
  twoDate: any = '';
  categoryList: any=[];
  search: any;
  categoryId: any=[];
  publishstatus: any;
  pubstatus: any;
  constructor(
    private service: ServiceService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    // this.permission = !!JSON.parse(localStorage.getItem('permission')) ? (JSON.parse(localStorage.getItem('permission')).length ? JSON.parse(localStorage.getItem('permission')) : [] ) : [];
  }

  ngOnInit() {
    this.form();
    this.listOfCategory()

    // this.getUserList();
  }

  form() {
    this.searchForm = new FormGroup({
      search   : new FormControl('')
    });
  }

  reset() {
    this.searchForm.reset();
    this.listOfCategory();
  }

  listOfCategory(){
    this.spinner.show();
    let data={

    }
    this.service.postApii('admin/listOfCategory', data,  1).subscribe(success => {
      console.log("success",success);
      if(success.response_code == 200) {
        // this.service.success(success.response_message)
        this.categoryList = success.result[0].docs;
        this.spinner.hide();
       console.log("sdfgasd",this.categoryList)
      }
      else {
        this.service.error('something went wrong');
        this.spinner.hide();
      }
    })
  
  }

  checkBox(data, publishStatus){
    this.categoryId=data._id
    this.pubstatus= publishStatus;
    this.publishstatus=data.publishStatus
    if(this.publishstatus=='true'){
      this.publish()
    }
    else {
      this.unpublish()
    }
  }

  publish(){
    let dataa={
      categoryId:this.categoryId,
      publishStatus:"false"
    }
    this.service.postApii('admin/publishCategory',dataa,1).subscribe((success)=>{
      if(success.response_code==200){
        // this.service.success("Published successfully")
      }
    })
    }

    unpublish(){ 
    let dataa={
      categoryId:this.categoryId,
      publishStatus:"true"
    }
    this.service.postApii('admin/publishCategory',dataa,1).subscribe((success)=>{
      if(success.response_code==200){
        // this.service.success("Published successfully")
      }
    })
  }

  async publishhh(){
    this.spinner.show();
    await this.listOfCategoryy();
    }

    listOfCategoryy(){
      this.spinner.show();
      let data={
  
      }
      this.service.postApii('admin/listOfCategory', data,  1).subscribe(success => {
        console.log("success",success);
        if(success.response_code == 200) {
          this.service.success("Categories updated successfully.")
          this.categoryList = success.result[0].docs;
          this.spinner.hide();
         console.log("sdfgasd",this.categoryList)
        }
        else {
          this.service.error('something went wrong');
          this.spinner.hide();
        }
      })
    
    }

  searchData(value){
    this.search= value;
  console.log("hgfhgf",this.search);

    this.searchByName()
  }
  searchByName(){
    // this.spinner.show()
    this.service.postApii('admin/listOfCategory', {search:this.search},1).subscribe((success)=>{
      console.log("success");
      
      if(success.response_code==200){
        // this.service.success(success.response_message);
        this.categoryList=success.result[0].docs;
        this.spinner.hide()
      }
      else{
        // this.service.error(success.response_message)
        this.categoryList=[];
        this.categoryList=success.result[0].docs;
      }
    })
  }

  formdate() {
    console.log('this.calender.formdate', this.calender.formdate)
    this.fromDate = new Date(this.calender.formdate)
    console.log('this.fromDate ==> 1', this.fromDate)
    this.fromDate = this.fromDate.getTime()
   console.log('this.fromDate ==> 2', this.fromDate)
   let newDate = new Date(this.fromDate)
   console.log(newDate)
}
todate() {
  this.twoDate = new Date(this.calender.todate)
  console.log('this.twoDate ==>1', this.twoDate)
  this.twoDate = this.twoDate.getTime()
  console.log('this.twoDate ==>2', this.twoDate)
}

// getUserList() {
//   let data = {
//     search : this.searchForm.value.search,
//   }
//   this.service.postApii('admin/showallCustomers', data,  1).subscribe(success => {
//     console.log("success",success);
//     if(success.response_code == 200) {
//       this.service.success(success.response_message)
//       this.copyUserList = success.result.docs;
//       this.spinner.hide();
//     }
//     else {
//       this.spinner.hide();
//     }
//   })

// }
// route 

goTOAddCategory(){
 this.router.navigate(['/add-category'])
}

goToEdit(id, name){
this.router.navigate(['/edit-category'],{queryParams:{id:id, Name:name}})
}

goToView(id, name){
this.router.navigate(['/view-category'],{queryParams:{id:id, Name:name}})

}



  getType(attributes) {
    return attributes.filter(item1 => {
      return item1.Name === 'custom:userType';
    });
  }

  userListPagination(event) {
    this.pagination.currPage = event;
  }

  // search() {
  //   this.copyUserList = this.userList;
  //   if (!!this.searchForm.value.search) {
  //     this.copyUserList = this.copyUserList.filter((item) => {
  //       return (((this.filterData(item.Attributes, 'custom:name').length ? this.filterData(item.Attributes, 'custom:name')[0].Value : '').toLowerCase().indexOf(this.searchForm.value.search.toLowerCase()) > -1) || ((this.filterData(item.Attributes, 'custom:emailAddress').length ? this.filterData(item.Attributes, 'custom:emailAddress')[0].Value : '').toLowerCase().indexOf(this.searchForm.value.search.toLowerCase()) > -1));
  //     });
  //     this.pagination.total = this.copyUserList.length;
  //   }

  //   if (!!this.searchForm.value.fromDate) {
  //     this.copyUserList = this.copyUserList.filter((product) => {
  //       var date = new Date(product.UserCreateDate).getTime();
  //       return (date >= new Date(this.searchForm.value.fromDate).getTime());
  //     });
  //   }
  //   if (!!this.searchForm.value.toDate) {
  //     this.copyUserList = this.copyUserList.filter((product) => {
  //       var date = new Date(product.UserCreateDate).getTime();
  //       return (date <= new Date(this.searchForm.value.toDate).getTime() + 86400000);
  //     });
  //   }
  // }

  // cancel() {
  //   this.searchForm.reset();
  //   this.copyUserList = this.userList;
  //   this.pagination.total = this.copyUserList.length;
  // }

  // sortOnEmail() {
  //   if (this.sortOnNameKey % 2 === 0) {
  //     this.copyUserList.sort((a, b) => (this.filterData(a.Attributes, 'custom:emailAddress').length ? (this.filterData(a.Attributes, 'custom:emailAddress')[0].Value) : '') > (this.filterData(b.Attributes, 'custom:emailAddress').length ? (this.filterData(b.Attributes, 'custom:emailAddress')[0].Value) : '') ? 1 : -1);
  //   } else {
  //     this.copyUserList.sort((a, b) => (this.filterData(a.Attributes, 'custom:emailAddress').length ? (this.filterData(a.Attributes, 'custom:emailAddress')[0].Value) : '') < (this.filterData(b.Attributes, 'custom:emailAddress').length ? (this.filterData(b.Attributes, 'custom:emailAddress')[0].Value) : '') ? 1 : -1);
  //   }
  //   this.sortOnNameKey++;
  // }

  // sortOnName() {
  //   if (this.sortOnNameKey % 2 === 0) {
  //     this.copyUserList.sort((a, b) => (this.filterData(a.Attributes, 'custom:name').length ? (this.filterData(a.Attributes, 'custom:name')[0].Value) : '') > (this.filterData(b.Attributes, 'custom:name').length ? (this.filterData(b.Attributes, 'custom:name')[0].Value) : '') ? 1 : -1);
  //   } else {
  //     this.copyUserList.sort((a, b) => (this.filterData(a.Attributes, 'custom:name').length ? (this.filterData(a.Attributes, 'custom:name')[0].Value) : '') < (this.filterData(b.Attributes, 'custom:name').length ? (this.filterData(b.Attributes, 'custom:name')[0].Value) : '') ? 1 : -1);
  //   }
  //   this.sortOnNameKey++;
  // }

  // filterData(value, args) {
  //   let data = value.filter(item => {
  //     return item.Name === args;
  //   });
  //   return data;
  // }

  // sortOnCreateedAt() {
  //   if (this.sortOnCreatedAtKey % 2 === 0) {
  //     this.copyUserList.sort((a, b) => {
  //       var m = new Date(a.UserCreateDate).getTime();
  //       var n = new Date(b.UserCreateDate).getTime();
  //       return (m - n);
  //     });
  //   } else {
  //     this.copyUserList.sort((a, b) => {
  //       var m = new Date(a.UserCreateDate).getTime();
  //       var n = new Date(b.UserCreateDate).getTime();
  //       return (n - m);
  //     });
  //   }
  //   this.sortOnCreatedAtKey++;
  // }

  // sortOnUpdateedAt() {
  //   if (this.sortOnUpdateedAtKey % 2 === 0) {
  //     this.copyUserList.sort((a, b) => {
  //       var m = new Date(a.UserLastModifiedDate).getTime();
  //       var n = new Date(b.UserLastModifiedDate).getTime();
  //       return (m - n);
  //     });
  //   } else {
  //     this.copyUserList.sort((a, b) => {
  //       var m = new Date(a.UserLastModifiedDate).getTime();
  //       var n = new Date(b.UserLastModifiedDate).getTime();
  //       return (n - m);
  //     });
  //   }
  //   this.sortOnUpdateedAtKey++;
  // }

  enableDisableOrDeleteOpenModal (data, whichModal) {
    console.log("Data >>>>> ",data)
    if (whichModal === 'enable') {
      this.whichmodal = 'enable';
    } else {
      if (whichModal === 'disable') {
        this.whichmodal = 'disable';
      } else {
        this.whichmodal = 'delete';
      }
    }
    this.particularUserData = data;
    $('#enableDisableDeleteModal').modal({backdrop: 'static', keyboard: false});
  }

  anableDisable(enableorDisable) {
    if (enableorDisable === 'disable') {
      console.log("Inside Disable Block")
      this.disableCategory(this.particularUserData);
      $('#enableDisableDeleteModal').modal('hide');
      this.listOfCategory();
    } else {
      if (enableorDisable === 'enable') {
        console.log("Inside Enable Block")
        this.enableCategory(this.particularUserData);
        $('#enableDisableDeleteModal').modal('hide');
        this.listOfCategory();
      } else {
        console.log("Inside Delete Block")
        this.deleteCategory(this.particularUserData);
        $('#enableDisableDeleteModal').modal('hide');
        this.listOfCategory();
      }
    }
    // this.getUserList();
  }

  disableCategory(data) {
    let dataa={
      categoryId:data,
      status: 'BLOCK'
    }
    this.spinner.show();
    this.service.postApii('admin/deleteAndBlockCategory', dataa,  1).subscribe(success => {
      if(success.response_code == 200) {
        this.service.success("Successfully deactivated.")
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })
  }
  enableCategory(data) {
    let dataa={
      categoryId:data,
      status: 'ACTIVE'
    }
    this.spinner.show();
    this.service.postApii('admin/deleteAndBlockCategory', dataa,  1).subscribe(success => {
      if(success.response_code == 200) {
        this.service.success("Successfully activated.")
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })
  }

  // disableCategory(data) {
  //   this.spinner.show();
  //   this.service.postApii('admin/deleteAndBlockCategory', {categoryId:data._id},  1).subscribe(success => {
  //     if(success.response_code == 200) {
  //       // this.service.success(success.response_message)
  //       this.spinner.hide();
  //     }
  //     else {
  //       this.spinner.hide();
  //     }
  //   })
  // }
  // enableCategory(data) {
  //   this.spinner.show();
  //   this.service.postApii('admin/deleteAndBlockCategory', {categoryId:data._id},  1).subscribe(success => {
  //     if(success.response_code == 200) {
  //       // this.service.success(success.response_message)
  //       this.spinner.hide();
  //     }
  //     else {
  //       this.spinner.hide();
  //     }
  //   })
  // }
  deleteCategory(data) {
    this.spinner.show();
    console.log("hgdghdgh",this.particularUserData)
    this.service.postApii('admin/deleteAndBlockCategory', {categoryId:this.particularUserData},  1).subscribe(success => {
      if(success.response_code == 200) {
        this.service.success("Successfully deleted.");
        this.spinner.hide();
        $('#enableDisableDeleteModal').modal('hide');
        this.listOfCategory()
      }
      else {
        this.spinner.hide();
      }
    })
  }

  // disableSubadmin(objectVal) {
  //   console.log('disable func ===>>>', objectVal );
  //   this.spinner.show();
  //   if (!this.permission.includes('changeUserStatus')) {
  //     console.log('hello delete');
  //     $('#enableDisableDeleteModal').modal('hide');
  //     this.service.error("You don't have permission to de-activate any user.");
  //     this.spinner.hide();
  //     return;
  //   }
  //   var params = {
  //     UserPoolId: 'us-east-1_fiLGu5JtO', /* required */
  //     Username: this.getEmailOrPhone(objectVal)[0].Value /* required */
  //   };
  //   console.log('params===>>>', params);
  //   var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  //   cognitoidentityserviceprovider.adminDisableUser(params, (err, response) => {
  //     if (err) {
  //       this.spinner.hide();
  //       this.service.error(err.message);
  //       console.log('error ===>>', err);
  //       return false;
  //     } else {
  //       this.getUserList();
  //       this.service.success('Successfully de-activated.');
  //       this.spinner.hide();
  //       $('#enableDisableDeleteModal').modal('hide');
  //       console.log('data ===>>', response);           // successful response
  //       return true;
  //     }
  //   });
  // }

  // enableSubadmin(objectVal) {
  //   console.log('enable func ===>>>',objectVal );
  //   this.spinner.show();
  //   if (!this.permission.includes('changeUserStatus')) {
  //     console.log('hello delete');
  //     $('#enableDisableDeleteModal').modal('hide');
  //     this.service.error("You don't have permission to activate any user.");
  //     this.spinner.hide();
  //     return;
  //   }
  //   var params = {
  //     UserPoolId: 'us-east-1_fiLGu5JtO', /* required */
  //     Username: this.getEmailOrPhone(objectVal)[0].Value /* required */
  //   };
  //   var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  //   cognitoidentityserviceprovider.adminEnableUser(params, (err, response) => {
  //     if (err) {
  //       this.spinner.hide();
  //       this.service.error(err.message);
  //       return false;
  //     } else {
  //       this.getUserList();
  //       this.service.success('Successfully activated.');
  //       this.spinner.hide();
  //       $('#enableDisableDeleteModal').modal('hide');
  //       return true;
  //     }
  //   });
  // }

  // deleteSubadmin(objectVal)  {
  //   this.spinner.show();
  //   if (!this.permission.includes('deleteUser')) {
  //     console.log('hello delete');
  //     $('#enableDisableDeleteModal').modal('hide');
  //     this.service.error("You don't have permission to delete any user.");
  //     this.spinner.hide();
  //     return;
  //   }
  //   var params = {
  //     UserPoolId: 'us-east-1_fiLGu5JtO', /* required */
  //     Username:  this.getEmailOrPhone(objectVal).length ? this.getEmailOrPhone(objectVal)[0].Value : '' /* required */
  //   };
  //   var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  //   cognitoidentityserviceprovider.adminDeleteUser(params, (err, response) => {
  //     if (err) {
  //       this.spinner.hide();
  //       this.service.error(err.message);
  //       return false;
  //     } else {
  //       this.service.success('Successfully deleted.');
  //       this.getUserList();
  //       this.spinner.hide();
  //       $('#enableDisableDeleteModal').modal('hide');
  //       return true;
  //     }
  //   });
  // }

  getEmailOrPhone(objectVal) {
    let v = objectVal.Attributes.filter(item => {
       return item.Name === 'phone_number';
    });
    return v;
  }

  openView(data) {
    this.router.navigate(['/viewuser', data.Username]);
  }




  exportCSV() {
    let dataArr = [];
    dataArr.push({
        sno: "S.No.",
        Name: "Name",
        Added: "Added On",
    });
  
    this.categoryList.forEach((element,ind) => {
        dataArr.push({
            sno:ind+1,
            Name:element.categoryName?element.categoryName:'--',
            Added:element.addedOn?element.addedOn:'--',
        })
    }) 
    new ngxCsv(dataArr, 'Category_management');
  }




  
  }
  
