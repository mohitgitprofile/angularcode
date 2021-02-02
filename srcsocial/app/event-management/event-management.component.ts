import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ngxCsv } from 'ngx-csv/ngx-csv';
declare var $: any;
@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent implements OnInit {

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
  searchByName: any;
  constructor(
    private service: ServiceService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    this.form();
    this.getUserList();
  }

  searchValue(value){
    this.searchByName=value
    console.log("hgfhgf",this.searchByName);
    
    this.searchUser();
  }
  searchUser() {
    this.service.postApii('admin/listOfEvent', {search:this.searchByName},  1).subscribe(success => {
      console.log("success",success);
      if(success.response_code == 200) {
        // this.service.success(success.response_message)
        this.copyUserList = success.result[0].docs;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.copyUserList=[];
        this.copyUserList=success.result[0].docs;
      }
    })
  }

  gotonextPage(){
    this.router.navigate(['/addevent']);
  }

  form() {
    this.searchForm = new FormGroup({
      search   : new FormControl('')
    });
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

reset() {
  this.searchForm.reset();
  this.getUserList();
}

getUserList() {
  let data = {
    search : this.searchForm.value.search,
  }
  this.service.postApii('admin/listOfEvent', data,  1).subscribe(success => {
    console.log("success",success);
    if(success.response_code == 200) {
      // this.service.success(success.response_message)
      this.copyUserList = success.result[0].docs;
      this.spinner.hide();
    }
    else {
      this.spinner.hide();
    }
  })

}


exportCSV() {
  let dataArr = [];
  dataArr.push({
      sno: "S.No.",
      Name: "Name",
      Category: "Category",
      Type: "Type",
      Date: "Date",
  });

  this.copyUserList.forEach((element,ind) => {
      dataArr.push({
          sno:ind+1,
          Name:element.eventName?element.eventName:'--',
          Category:element.categoryId?element.categoryId:'--',
          Type: element.eventType?element.eventType:'--',
          Date: element.createdAt?element.createdAt:'--',
      })
  }) 
  new ngxCsv(dataArr, 'Event_management');
}






// getUserList() {
//   let data = {
//    search: this.searchForm.value.search,
//   }
//   this.service.postApii('admin/showallCustomers', data,  1).subscribe(success => {
//     console.log("success",success);
//     if(success.response_code == 200) {
//       this.copyUserList = success.result.docs;
//       console.log("copyUserList",this.copyUserList)
//     }
//     else {
//       console.log("else")
//     }
//   })
// }
  // getUserList() {
  //   this.spinner.show();
  //   this.service.getUserList().then((success: any) => {
  //     this.userList = success.Users.filter(item => {
  //       return (this.getType(item.Attributes).length ? this.getType(item.Attributes)[0].Value : '') === 'user';
  //     });
  //     console.log(this.userList)
  //     this.totalUsers = this.userList.length?this.userList.length:0;
  //     this.copyUserList = this.userList;
  //     this.sortOnCreateedAt();
  //     this.pagination.total = this.copyUserList.length;
  //     this.spinner.hide();
  //   }).catch(error => {
  //     this.copyUserList = [];
  //     this.pagination.total = 0;
  //     this.spinner.hide();
  //     console.log('error ===>>>', error);
  //   });
  // }

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

  cancel() {
    this.searchForm.reset();
    this.copyUserList = this.userList;
    this.pagination.total = this.copyUserList.length;
  }

  sortOnEmail() {
    if (this.sortOnNameKey % 2 === 0) {
      this.copyUserList.sort((a, b) => (this.filterData(a.Attributes, 'custom:emailAddress').length ? (this.filterData(a.Attributes, 'custom:emailAddress')[0].Value) : '') > (this.filterData(b.Attributes, 'custom:emailAddress').length ? (this.filterData(b.Attributes, 'custom:emailAddress')[0].Value) : '') ? 1 : -1);
    } else {
      this.copyUserList.sort((a, b) => (this.filterData(a.Attributes, 'custom:emailAddress').length ? (this.filterData(a.Attributes, 'custom:emailAddress')[0].Value) : '') < (this.filterData(b.Attributes, 'custom:emailAddress').length ? (this.filterData(b.Attributes, 'custom:emailAddress')[0].Value) : '') ? 1 : -1);
    }
    this.sortOnNameKey++;
  }

  sortOnName() {
    if (this.sortOnNameKey % 2 === 0) {
      this.copyUserList.sort((a, b) => (this.filterData(a.Attributes, 'custom:name').length ? (this.filterData(a.Attributes, 'custom:name')[0].Value) : '') > (this.filterData(b.Attributes, 'custom:name').length ? (this.filterData(b.Attributes, 'custom:name')[0].Value) : '') ? 1 : -1);
    } else {
      this.copyUserList.sort((a, b) => (this.filterData(a.Attributes, 'custom:name').length ? (this.filterData(a.Attributes, 'custom:name')[0].Value) : '') < (this.filterData(b.Attributes, 'custom:name').length ? (this.filterData(b.Attributes, 'custom:name')[0].Value) : '') ? 1 : -1);
    }
    this.sortOnNameKey++;
  }

  filterData(value, args) {
    let data = value.filter(item => {
      return item.Name === args;
    });
    return data;
  }

  sortOnCreateedAt() {
    if (this.sortOnCreatedAtKey % 2 === 0) {
      this.copyUserList.sort((a, b) => {
        var m = new Date(a.UserCreateDate).getTime();
        var n = new Date(b.UserCreateDate).getTime();
        return (m - n);
      });
    } else {
      this.copyUserList.sort((a, b) => {
        var m = new Date(a.UserCreateDate).getTime();
        var n = new Date(b.UserCreateDate).getTime();
        return (n - m);
      });
    }
    this.sortOnCreatedAtKey++;
  }

  sortOnUpdateedAt() {
    if (this.sortOnUpdateedAtKey % 2 === 0) {
      this.copyUserList.sort((a, b) => {
        var m = new Date(a.UserLastModifiedDate).getTime();
        var n = new Date(b.UserLastModifiedDate).getTime();
        return (m - n);
      });
    } else {
      this.copyUserList.sort((a, b) => {
        var m = new Date(a.UserLastModifiedDate).getTime();
        var n = new Date(b.UserLastModifiedDate).getTime();
        return (n - m);
      });
    }
    this.sortOnUpdateedAtKey++;
  }

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
      this.disableSubadmin(this.particularUserData);
      $('#enableDisableDeleteModal').modal('hide');
      this.getUserList();
    } else {
      if (enableorDisable === 'enable') {
        console.log("Inside Enable Block")
        this.enableSubadmin(this.particularUserData);
        $('#enableDisableDeleteModal').modal('hide');
        this.getUserList();
      } else {
        console.log("Inside Delete Block")
        this.deleteSubadmin(this.particularUserData);
        $('#enableDisableDeleteModal').modal('hide');
        this.getUserList();
      }
    }
  }

  disableSubadmin(data) {
    console.log("disableSubadmin",data);
    
    let dataa ={
      userId:data,
      status: 'BLOCK'
    }
    this.spinner.show();
    this.service.postApii('admin/deleteEvent', dataa,  1).subscribe(success => {
      if(success.response_code == 200) {
        this.service.success("Successfully blocked.")
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })
  }
  enableSubadmin(data) {
    console.log("enableSubadmin",data);
    let dataa ={
      userId:data,
      status: 'ACTIVE'
    }
    this.spinner.show();
    this.service.postApii('admin/deleteEvent', dataa,  1).subscribe(success => {
      if(success.response_code == 200) {
        this.service.success("Successfully activated.")
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })
  }
  deleteSubadmin(data) {
    this.spinner.show();
    this.service.postApii('admin/deleteEvent', {eventId:data._id},  1).subscribe(success => {
      if(success.response_code == 200) {
        // this.service.success(success.response_message)
        this.spinner.hide();
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

}
