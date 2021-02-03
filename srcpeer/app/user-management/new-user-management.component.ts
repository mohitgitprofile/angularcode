import { Component, OnInit } from '@angular/core';
import { forms } from '../forms';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { FormGroup } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { apiurls } from '../apiUrls';
declare var $: any;

var AWS = require('aws-sdk');

@Component({
  selector: 'app-new-user-management',
  templateUrl: './new-user-management.component.html',
  styleUrls: ['./new-user-management.component.css']
})
export class NewUserManagementComponent implements OnInit {

  SearchForm: FormGroup;
  copyUserList: any = [];
  userList: any = [];
  particularUserData: any={};
  whichmodal: string;
  paginationData: any = {
    total:'',limit:10,page:1
  };
  newArr: any;
  sortOnNameKey: number;
  sortOnCreatedAtKey: any;

  constructor(
    public spinner: NgxSpinnerService,
    public form: forms,
    public service: ServiceService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.SearchForm = this.form.searchForm;
    this.SearchForm.reset();
    console.log('hello i am here')
    this.getUserList();
    this.deleteUser();
    this.disableUser();
    this.enableUser();
  }
  enableDisableOrDeleteOpenModal (data, whichModal) {
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


  getUserList() {
    this.spinner.show();

    this.service.getUserList('us-east-1_DdVuKjB9D').then((success: any) => {
      this.userList = success.Users;
      console.log('before===>>', this.userList);
      this.copyUserList = this.userList;
      // this.copySubAdminList.sort((a, b) => (a.UserCreateDate > b.UserCreateDate) ? -1 : ((b.UserCreateDate > a.UserCreateDate) ? 1 : 0));
      this.paginationData.total = this.copyUserList.length;
      console.log(this.paginationData.total)
      // console.log(this.copySubAdminList);
      this.spinner.hide();
    }).catch(error => {
      this.spinner.hide();
    });
  }

  // for pagination
  userListPagination(event) {
    this.copyUserList = []
    this.copyUserList = [...this.userList]
    if(event == 1) {
      this.copyUserList.splice(this.paginationData.limit,this.copyUserList.length -1)
    }else {
      let count = (event -1) * 10 
      this.copyUserList.splice(0,count)
    }
    this.paginationData.page = event
  } 
  
  search() {
    this.copyUserList = this.userList;
    if (!!this.SearchForm.value.search) {
      console.log('search value ',this.SearchForm.value.search)
      this.copyUserList = this.copyUserList.filter((item) => {
        return ((this.filterValue(item.Attributes, 'email').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1) || (this.filterValue(item.Attributes, 'name').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1) || (this.filterValue(item.Attributes, 'phone_number').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1));
      });
      console.log(this.copyUserList)
      this.paginationData.total = this.copyUserList.length;
    }

    if (!!this.SearchForm.value.fromDate) {
      this.copyUserList = this.copyUserList.filter((product) => {
        var date = new Date(product.UserCreateDate).getTime();
        return (date >= new Date(this.SearchForm.value.fromDate).getTime());
      });
    }
    if (!!this.SearchForm.value.toDate) {
      this.copyUserList = this.copyUserList.filter((product) => {
        var date = new Date(product.UserCreateDate).getTime();
        return (date <= new Date(this.SearchForm.value.toDate).getTime() + 86400000);
      });
    }
  }



  // searchListData() {
  //   console.log(this.SearchForm, this.SearchForm.value.search);
  //   this.copyUserList = this.SearchForm
  //   if (!!this.SearchForm.value.search) {
  //     console.log('hello');
  //     this.copyUserList = this.SearchForm.filter((item) => {
  //       for(let i=0; i<this.SearchForm.value.search.length; i++) {
  //         if(item.spaceType.toLowerCase().charAt(i) == this.SearchForm.value.search.toLowerCase().charAt(i)) {
  //           if(i == this.SearchForm.value.search.length - 1)
  //             return item;
  //         }
  //         else
  //           return;
  //       }
  //       // return item.spaceType.toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1
  //       // return ((this.filterValue(item.Attributes, 'email').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1) || (this.filterValue(item.Attributes, 'custom:name').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1) || (this.filterValue(item.Attributes, 'custom:fullNumber').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1));
  //     });
  //     this.paginationData['total'] = this.copyUserList.length;
  //   }
  //   console.log(this.copyUserList);



  // }


  

  filterValue(value, args) {
    var filteredValue = value.filter(item => {
      return item.Name === args;
    });
    if (filteredValue.length) {
      return filteredValue[0].Value;
    } else {
      return '';
    }
  }

  async downloadCsv() {
    console.log('hello');
    this.newArr = [];
    console.log('this.userList', this.userList);
    this.userList.forEach((element, i) => {
      let name = this.userList[i].Attributes.filter(item => {
        // console.log(item)
        return item.Name === 'custom:name';
      })
 
      let email = this.userList[i].Attributes.filter(item => {
        return item.Name === 'email';
      })
      let fullNumber = this.userList[i].Attributes.filter(item => {
        return item.Name === 'phone_number';
      })
      

      // this.newArr[i] = ((name.length != 0)?(name[0].Value):'') + ' ' +((email.length != 0)?(email[0].Value):'') + ' ' + ((fullNumber.length != 0)?(fullNumber[0].Value):'')
      // console.log('vfhh', JSON.stringify(name) + ' ' +JSON.stringify(email) + ' ' + JSON.stringify(fullNumber))
      this.newArr[i] = (name.length ? name[0].Value : '--') + ' ' + (email.length ? email[0].Value : '--') ;
    });
    console.log('newArr ==>>', this.newArr);
    await this.download();
  }

  download() {
    console.log('download', this.newArr)
    // var options = { 
    //   fieldSeparator: ',',
    //   quoteStrings: '"',
    //   decimalseparator: '.',
    //   showLabels: true, 
    //   showTitle: true,
    //   title: 'Your title',
    //   useBom: true,
    //   noDownload: true,     
    //   headers: ['Name, Email, MobileNumber']
    // };



    var options = {
      fieldSeparator: '',
      quoteStrings: '',
      noDownload: false,
      headers: ['Name, Email, MobileNumber']
    };

    new ngxCsv(this.newArr, 'My Report',options);
  }



deleteUser() {
  console.log('delete func ===>>>', this.particularUserData );
  this.spinner.show();
  var params = {
    UserPoolId: 'us-east-1_DdVuKjB9D', /* required */
    Username: this.particularUserData.Attributes.filter(item => {
      return item.Name === 'email';
    })[0].Value /* required */
  };
  var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  cognitoidentityserviceprovider.adminDeleteUser(params, (err, response) => {
    if (err) {
      this.spinner.hide();
      console.log('error ===>>', err);
    } else {
      this.getUserList();
      this.spinner.hide();
    $('#enableDisableDeleteModal').modal('hide');
      console.log('data ===>>', response);           // successful response
    }
  });
}


sortOnName() {
  console.log(this.userList)
  if (this.sortOnNameKey % 2 === 0) {
    this.userList.sort((a, b) => ((this.filterByName(a).length ? this.filterByName(a)[0].Value : '') > (this.filterByName(b).length ? this.filterByName(b)[0].Value : '')) ? 1 : -1);
  } else {
    this.userList.sort((a, b) => ((this.filterByName(b).length ? this.filterByName(b)[0].Value : '') < (this.filterByName(b).length ? this.filterByName(b)[0].Value : '')) ? 1 : -1);
  }
  this.sortOnNameKey++;
}

filterByName(a) {
  return a.Attributes.filter(item => {
    return item.Name === 'custom:name';
  })
}

sortOnCreateedAt() {
  if (this.sortOnCreatedAtKey % 2 === 0) {
    this.userList.sort((a, b) => {
      var m = new Date(a.UserCreateDate).getTime();
      var n = new Date(b.UserCreateDate).getTime();
      return (m - n);
    });
  } else {
    this.userList.sort((a, b) => {
      var m = new Date(a.UserCreateDate).getTime();
      var n = new Date(b.UserCreateDate).getTime();
      return (n - m);
    });
  }
  this.sortOnCreatedAtKey++;
}


anableDisable(enableorDisable) {
  if (enableorDisable === 'disable') {
    this.disableUser();
  } else {
    if (enableorDisable === 'enable') {
      this.enableUser();
    } else {
      this.deleteSubadmin();
    }
  }
}
  deleteSubadmin(): any {
    throw new Error("Method not implemented.");
  }

  disableUser() {
  console.log('disable func ===>>>', this.particularUserData );
  this.spinner.show();
  var params = {
    UserPoolId: 'us-east-1_DdVuKjB9D', /* required */
    Username: this.particularUserData.Attributes.filter(item => {
      return item.Name === 'email';
    })[0].Value /* required */
  };
  console.log('params===>>>', params)
  var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  cognitoidentityserviceprovider.adminDisableUser(params, (err, response) => {
    if (err) {
      this.spinner.hide();
      console.log('error ===>>', err);
    } else {
      this.getUserList();
      this.spinner.hide();
      $('#enableDisableDeleteModal').modal('hide');
      console.log('data ===>>', response);           // successful response
    }
  });
}

enableUser() {
  console.log('enable func ===>>>', this.particularUserData );
  this.spinner.show();
  var params = {
    UserPoolId: 'us-east-1_DdVuKjB9D', /* required */
    Username: this.particularUserData.Attributes.filter(item => {
      return item.Name === 'email';
    })[0].Value /* required */
  };
  var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  cognitoidentityserviceprovider.adminEnableUser(params, (err, response) => {
    if (err) {
      this.spinner.hide();
      console.log('error ===>>', err);
    } else {
      this.getUserList();
      this.spinner.hide();
      $('#enableDisableDeleteModal').modal('hide');
      console.log('data ===>>', response);           // successful response
    }
  });
}
}

