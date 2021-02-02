import { NgxSpinnerService } from 'ngx-spinner';
import { Component } from '@angular/core';
import { ServiceService } from './service.service';
import { Router } from '@angular/router';
const hasCORS = require('has-cors');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'socialX';
  permissionArr: any = [];
  constructor(
    private service: ServiceService,
    private spinner: NgxSpinnerService,
  ) {
    // if (localStorage.getItem('CognitoIdentityServiceProvider.7j5jrsiv5prvi3ep29mg72m5ri.LastAuthUser')) {
    //   this.getUserData(localStorage.getItem('CognitoIdentityServiceProvider.7j5jrsiv5prvi3ep29mg72m5ri.LastAuthUser'));
    // }
  }

  getUserData(param) {
    this.spinner.show();
    this.service.getParticularUserData(param).then((success: any) => {
      const roleId = this.filterData(success.UserAttributes, 'custom:masterRoleId');
      this.getPermission(roleId.length ? roleId[0].Value : '');
      this.spinner.hide();
    }).catch(error => {
      this.spinner.hide();
    });
  }
  filterData(value, key) {
    const data = value.filter(item => {
      return item.Name === key;
    });
    return data;
  }

  getPermission(success) {
    this.spinner.show();
    const apireq = {
      master_id : success
    };
    this.service.postApi('/particular-master-role', apireq).subscribe((success: any) => {
      this.spinner.hide();
      this.permissionArr = success.body ? (success.body.data ? (success.body.data.length ? JSON.parse(success.body.data[0].permission) : []) : []) : [];
      this.getMainPermissions();
    }, error => {
      this.spinner.hide();
      this.service.success('Oops ! Something went wrong please try again.');
    });
  }

  getMainPermissions() {
    const permissionForLocalStorage = [];
    const servicePermissionArr = this.service.permissionsArr;
    this.permissionArr.forEach((element, i) => {
      servicePermissionArr.forEach(serviceElement => {
        if (element === serviceElement.index) {
          permissionForLocalStorage.push(serviceElement.permissionName);
        }
      });
    });
    localStorage.setItem('permission', JSON.stringify(permissionForLocalStorage));
  }
}

