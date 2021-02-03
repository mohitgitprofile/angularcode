import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-sub-admin-profile',
  templateUrl: './view-sub-admin-profile.component.html',
  styleUrls: ['./view-sub-admin-profile.component.css']
})
export class ViewSubAdminProfileComponent implements OnInit {

  paramData: any;
  userData: any = [];
  data = {
    email : [{Name: '', Value: ''}],
    name: [{Name: '', Value: ''}],
    mobNo: [{Name: '', Value: ''}],
    address: [{Name: '', Value: ''}],
    imageUrl: [{Name: 'custom:imageurl', Value: 'noImage'}],
    permission : {
    dashborard: [{Name: '', Value: ''}],
    subadminManagement: [{Name: '', Value: ''}],
    userManagement: [{Name: '', Value: ''}],
    masterSetUp: [{Name: '', Value: ''}],
    bookingManagement: [{Name: '', Value: ''}],
    listingManagement: [{Name: '', Value: ''}],
    reportManagement: [{Name: '', Value: ''}],
    siteSetting: [{Name: '', Value: ''}],
    staticContent: [{Name: '', Value: ''}],
    bannerManagement: [{Name: '', Value: ''}],
    feeManagement: [{Name: '', Value: ''}],
    referalManagement: [{Name: '', Value: ''}]
  }};

  constructor(
    private spinner: NgxSpinnerService,
    public activatedRoute: ActivatedRoute,
    public service: ServiceService
  ) {

  }

  ngOnInit() {
    this.getParamData();
  }

  getParamData() {
    this.activatedRoute.params.subscribe(params => {
      this.paramData = params;
      this.getUserData();
    });
  }

  getUserData() {
    this.spinner.show();
    this.service.getParticularUserData(this.paramData.data).then((success: any) => {
      if (success.Username !== '') {
        this.userData = success.UserAttributes;
        console.log('this.userData ==>>', success);
        this.data.imageUrl = this.userData.filter(item => {
          return item.Name === 'custom:imageurl';
        });
        this.data.email = this.userData.filter(item => {
          return item.Name === 'email';
        });
        this.data.name = this.userData.filter(item => {
          return item.Name === 'custom:name';
        });
        this.data.mobNo = this.userData.filter(item => {
          return item.Name === 'custom:fullNumber';
        });
        this.data.address = this.userData.filter(item => {
          return item.Name === 'custom:address';
        });
        this.data.permission.dashborard = this.userData.filter(item => {
          return item.Name === 'custom:dashboard';
        });
        this.data.permission.subadminManagement = this.userData.filter(item => {
          return item.Name === 'custom:subadminManagement';
        });
        this.data.permission.userManagement = this.userData.filter(item => {
          return item.Name === 'custom:userManagement';
        });
        this.data.permission.masterSetUp = this.userData.filter(item => {
          return item.Name === 'custom:masterSetupScreen';
        });
        this.data.permission.bookingManagement = this.userData.filter(item => {
          return item.Name === 'custom:bookingManagement';
        });
        this.data.permission.listingManagement = this.userData.filter(item => {
          return item.Name === 'custom:listingManagement';
        });
        this.data.permission.reportManagement = this.userData.filter(item => {
          return item.Name === 'custom:reportManagement';
        });
        this.data.permission.siteSetting = this.userData.filter(item => {
          return item.Name === 'custom:siteSetting';
        });
        this.data.permission.staticContent = this.userData.filter(item => {
          return item.Name === 'custom:staticContent';
        });
        this.data.permission.bannerManagement = this.userData.filter(item => {
          return item.Name === 'custom:bannerManagement';
        });
        this.data.permission.feeManagement = this.userData.filter(item => {
          return item.Name === 'custom:feeManagement';
        });
        this.data.permission.referalManagement = this.userData.filter(item => {
          return item.Name === 'custom:referalManagement';
        });
        this.spinner.hide();
      } else {
        this.service.error('User does not exist');
        this.spinner.hide();
      }
    }).catch(error => {
      this.spinner.hide();
      this.service.error('User does not exist');
    });
  }

}
