import { Component, OnInit } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { ServiceService } from '../service/service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup } from '@angular/forms';
import { forms } from '../forms';
import { AmplifyService } from 'aws-amplify-angular';
import { stringify } from '@angular/core/src/render3/util';

declare var $: any;

var AWS = require('aws-sdk');
@Component({
  selector: 'app-subadmin',
  templateUrl: './subadmin.component.html',
  styleUrls: ['./subadmin.component.css']
})
export class SubadminComponent implements OnInit {

  subAdminList: any = [];
  paginationData: any = { limit: 10, page: 1, total: 0 };
  newArr: any = [];
  copySubAdminList: any = [];
  SearchForm: FormGroup;
  particularSunbadminData: any;
  whichmodal: any;
  sortOnNameKey: any = 0;
  sortOnCreatedAtKey: any = 0;
  copyUserList: any[];
  csvData: any = [];

  constructor(
    private amplifyService: AmplifyService,
    private spinner: NgxSpinnerService,
    public service: ServiceService,
    public form: forms) {
    window.scrollTo(0, 0);
    this.SearchForm = this.form.searchForm;
    this.SearchForm.reset();
    this.amplifyService.authStateChange$
      .subscribe(authState => {
        console.log('authState ===>>>', authState);
      });
  }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.spinner.show();

    this.service.getUserList('us-east-1_lM5ZrYKiT').then((success: any) => {
      this.subAdminList = success.Users;
      console.log('before===>>', this.subAdminList);
      this.subAdminList = this.subAdminList.filter(item => {
        return item.Attributes[0].Value !== 'admin';
      });
      this.copySubAdminList = this.subAdminList;
      this.copySubAdminList.sort((a, b) => (a.UserCreateDate > b.UserCreateDate) ? -1 : ((b.UserCreateDate > a.UserCreateDate) ? 1 : 0));
      this.paginationData.total = this.copySubAdminList.length;
      console.log(this.copySubAdminList);
      this.spinner.hide();
    }).catch(error => {
      this.spinner.hide();
    });
  }

  subAdminListPagination(event) {
    this.paginationData.page = event;
  }

  reset() {
    this.SearchForm.reset();
    this.copySubAdminList = this.subAdminList;
  }

  search() {
    this.copySubAdminList = this.subAdminList;
    if (!!this.SearchForm.value.search) {
      this.copySubAdminList = this.copySubAdminList.filter((item) => {
        return ((this.filterValue(item.Attributes, 'email').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1) || (this.filterValue(item.Attributes, 'custom:name').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1) || (this.filterValue(item.Attributes, 'custom:fullNumber').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1));
      });
      this.paginationData.total = this.copySubAdminList.length;
    }

    if (!!this.SearchForm.value.fromDate) {
      this.copySubAdminList = this.copySubAdminList.filter((product) => {
        var date = new Date(product.UserCreateDate).getTime();
        return (date >= new Date(this.SearchForm.value.fromDate).getTime());
      });
    }
    if (!!this.SearchForm.value.toDate) {
      this.copySubAdminList = this.copySubAdminList.filter((product) => {
        var date = new Date(product.UserCreateDate).getTime();
        return (date <= new Date(this.SearchForm.value.toDate).getTime() + 86400000);
      });
    }
  }

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
    this.csvData = [];
    console.log('this.subadminList', this.subAdminList);
    this.subAdminList.forEach((element, i) => {
      let name = this.subAdminList[i].Attributes.filter(item => {
        // console.log(item)
        return item.Name === 'custom:name';
      })
 
      let email = this.subAdminList[i].Attributes.filter(item => {
        return item.Name === 'email';
      })
      let fullNumber = this.subAdminList[i].Attributes.filter(item => {
        return item.Name === 'custom:fullNumber';
      })
      let createdDate = this.subAdminList[i].Attributes.filter(item => {
        return item.UserCreateDate === 'dd/MM/yyyy HH:mm:ss a'
      })      
      let updatedDate = this.subAdminList[i].Attributes.filter(item => {
        return item.UserLastModifiedDate
      })

      // this.newArr[i] = ((name.length != 0)?(name[0].Value):'') + ' ' +((email.length != 0)?(email[0].Value):'') + ' ' + ((fullNumber.length != 0)?(fullNumber[0].Value):'')
      // console.log('vfhh', JSON.stringify(name) + ' ' +JSON.stringify(email) + ' ' + JSON.stringify(fullNumber))
      // this.newArr[i] = (name.length ? name[0].Value : '--') + ' ' + (email.length ? email[0].Value : '--') + ' ' + (fullNumber.length ? (fullNumber[0].Value + 'hhd') : '--')+(createdDate.toString() ? (createdDate).toString() : '--')+( (updatedDate).toString() ? (updatedDate).toString() : '--');
      this.csvData.push({
        name: name.length ? name[0].Value : '--',
        email: email.length ? email[0].Value : '--',
        fullNumber: fullNumber.length ? fullNumber[0].Value : '--',
        createdDate :(element. UserCreateDate).toString() ? this.dateFormate(element. UserCreateDate) : '--',
        updatedDate : (element.UserLastModifiedDate).toString() ? this.dateFormate(element.UserLastModifiedDate) : '--'
      })
    });
    console.log('newArr ==>>', this.csvData);
    await this.download();
  }


  dateFormate(val){
    var x = String(val) 
    var daa = x.split(" ") 
    var month = val.getMonth()+1
    var date = val.getDate()+"/"+(month)+"/"+val.getFullYear()
    var format = (val.getHours() > 12)?"PM":"AM"
    return (date+" "+daa[4]+" "+format) 
    }
    

  download() { 
    console.log('download', this.csvData)
    var options = {
      headers: ['Name', 'Email', 'Mobile Number','Created At', 'Updated At']
    };

    // new ngxCsv(this.newArr, 'My Report',options);

    var data = [
      {
        name: "Test 1",
        age: 13,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' "
      },
      {
        name: 'Test 2',
        age: 11,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' "
      },
      {
        name: 'Test 4',
        age: 10,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' "
      },
    ];
     
    new ngxCsv(this.csvData, 'My Report', options);
  }

  enableDisableOrDeleteOpenModal(data, whichModal) {
    if (whichModal === 'enable') {
      this.whichmodal = 'enable';
    } else {
      if (whichModal === 'disable') {
        this.whichmodal = 'disable';
      } else {
        this.whichmodal = 'delete';
      }
    }
    this.particularSunbadminData = data;
    $('#enableDisableDeleteModal').modal({ backdrop: 'static', keyboard: false });
  }

  anableDisable(enableorDisable) {
    if (enableorDisable === 'disable') {
      this.disableSubadmin();
    } else {
      if (enableorDisable === 'enable') {
        this.enableSubadmin();
      } else {
        this.deleteSubadmin();
      }
    }
  }

  disableSubadmin() {
    console.log('disable func ===>>>', this.particularSunbadminData);
    this.spinner.show();
    var params = {
      UserPoolId: 'us-east-1_lM5ZrYKiT', /* required */
      Username: this.particularSunbadminData.Attributes.filter(item => {
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

  enableSubadmin() {
    console.log('enable func ===>>>', this.particularSunbadminData);
    this.spinner.show();
    var params = {
      UserPoolId: 'us-east-1_lM5ZrYKiT', /* required */
      Username: this.particularSunbadminData.Attributes.filter(item => {
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

  deleteSubadmin() {
    console.log('delete func ===>>>', this.particularSunbadminData);
    this.spinner.show();
    var params = {
      UserPoolId: 'us-east-1_lM5ZrYKiT', /* required */
      Username: this.particularSunbadminData.Attributes.filter(item => {
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

  // for pagination
  subAdminListPagintion(event) {
    this.copySubAdminList = []
    this.copySubAdminList = [...this.subAdminList]
    if (event == 1) {
      this.copySubAdminList.splice(this.paginationData.limit, this.copySubAdminList.length - 1)
    } else {
      let count = (event - 1) * 10
      this.copySubAdminList.splice(0, count)
    }
    this.paginationData.page = event
  }

  sortOnName() {
    console.log(this.copySubAdminList)
    if (this.sortOnNameKey % 2 === 0) {
      this.copySubAdminList.sort((a, b) => ((this.filterByName(a).length ? this.filterByName(a)[0].Value : '') > (this.filterByName(b).length ? this.filterByName(b)[0].Value : '')) ? 1 : -1);
    } else {
      this.copySubAdminList.sort((a, b) => ((this.filterByName(b).length ? this.filterByName(b)[0].Value : '') < (this.filterByName(b).length ? this.filterByName(b)[0].Value : '')) ? 1 : -1);
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
      this.copySubAdminList.sort((a, b) => {
        var m = new Date(a.UserCreateDate).getTime();
        var n = new Date(b.UserCreateDate).getTime();
        return (m - n);
      });
    } else {
      this.copySubAdminList.sort((a, b) => {
        var m = new Date(a.UserCreateDate).getTime();
        var n = new Date(b.UserCreateDate).getTime();
        return (n - m);
      });
    }
    this.sortOnCreatedAtKey++;
  }
}




