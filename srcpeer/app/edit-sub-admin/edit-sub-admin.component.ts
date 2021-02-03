import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { forms } from '../forms';
import { Router, ActivatedRoute } from '@angular/router';
import { validationMessage } from '../validationMessage';
import { ServiceService } from '../service/service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-sub-admin',
  templateUrl: './edit-sub-admin.component.html',
  styleUrls: ['./edit-sub-admin.component.css']
})
export class EditSubAdminComponent implements OnInit {

  addSubAdmin: FormGroup;
  data = {
    email                 : [{Name: '', Value: ''}],
    name                  : [{Name: '', Value: ''}],
    countryCode           : [{Name: '', Value: ''}],
    mobNo                 : [{Name: '', Value: ''}], address: [{Name: '', Value: ''}],
    imageUrl              : [{Name: 'custom:imageurl', Value: 'noImage'}],
    permission            : {
      dashborard          : [{Name: '', Value: ''}],
      subadminManagement  : [{Name: '', Value: ''}],
      userManagement      : [{Name: '', Value: ''}],
      masterSetUp         : [{Name: '', Value: ''}],
      bookingManagement   : [{Name: '', Value: ''}],
      listingManagement   : [{Name: '', Value: ''}],
      reportManagement    : [{Name: '', Value: ''}],
      siteSetting         : [{Name: '', Value: ''}],
      staticContent       : [{Name: '', Value: ''}],
      bannerManagement    : [{Name: '', Value: ''}],
      feeManagement       : [{Name: '', Value: ''}],
      referalManagement   : [{Name: '', Value: ''}]
    }
  };
  imageType: any;
  file: any = [];
  validationMessage: any;
  countryList: any;
  permisstionErrorMessage: boolean;
  paramData: any;
  userData: any;

  constructor(
    private spinner: NgxSpinnerService,
    public form: forms,
    public router: Router,
    public validation: validationMessage,
    public service: ServiceService,
    public http: HttpClient,
    public activatedRoute: ActivatedRoute,
  ) {
    window.scrollTo(0, 0);
    this.validationMessage = this.validation.message;
    this.addSubAdmin = this.form.editSubAdmin;
    this.addSubAdmin.reset();
  }

  ngOnInit() {
    this.getParamData();
    console.log('hello edit subadmin');
    this.http.get('/assets/countryData.JSON').subscribe(list => this.countryList = list);
  }

  getParamData() {
    this.activatedRoute.params.subscribe(params => {
      this.paramData = params;
      console.log('this.paramData ==>>', this.paramData);
      this.getUserData();
    });
  }

  getUserData() {
    this.spinner.show();
    this.service.getParticularUserData(this.paramData.id).then((success: any) => {
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
          return item.Name === 'custom:number';
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
        this.data.countryCode = this.userData.filter(item => {
          return item.Name === 'custom:code';
        });
        console.log('this.data', this.data);
        this.spinner.hide();
        this.addSubAdmin.patchValue({
          name                  : this.data.name[0].Value,
          contactNumber         : this.data.mobNo[0].Value,
          countryCode           : this.data.countryCode[0].Value,
          email                 : this.data.email[0].Value,
          address               : this.data.address[0].Value,
          dashboard             : this.data.permission.dashborard[0].Value === 'true' ? true : false,
          subAdminMgmt          : this.data.permission.subadminManagement[0].Value === 'true' ? true : false,
          userMgmt              : this.data.permission.userManagement[0].Value === 'true' ? true : false,
          masterSetUpScreen     : this.data.permission.masterSetUp[0].Value === 'true' ? true : false,
          bookingMgmt           : this.data.permission.bookingManagement[0].Value === 'true' ? true : false,
          listingMgmt           : this.data.permission.listingManagement[0].Value === 'true' ? true : false,
          reportMgmt            : this.data.permission.reportManagement[0].Value === 'true' ? true : false,
          siteSetting           : this.data.permission.siteSetting[0].Value === 'true' ? true : false,
          staticContent         : this.data.permission.staticContent[0].Value === 'true' ? true : false,
          bannerMgmt            : this.data.permission.bannerManagement[0].Value === 'true' ? true : false,
          feeMgmt               : this.data.permission.feeManagement[0].Value === 'true' ? true : false,
          referalMgmt           : this.data.permission.referalManagement[0].Value === 'true' ? true : false,
        });
      } else {
        this.service.error('User does not exist');
        this.spinner.hide();
      }
    }).catch(error => {
      this.spinner.hide();
      this.service.error('User does not exist');
    });
  }

  selectImages(event) {
    this.file = event.target.files;
    if (this.file[0]) {
      console.log(this.file[0]);
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.data.imageUrl[0].Value = e.target.result;
        this.imageType = this.file[0].type;
      };
      reader.readAsDataURL(this.file[0]);
    }
  }

  checkboxPermission() {
    if (( !!(this.addSubAdmin.value.dashboard) === true || !!(this.addSubAdmin.value.subAdminMgmt) === true ||
          !!(this.addSubAdmin.value.reportMgmt) === true || !!(this.addSubAdmin.value.siteSetting) === true ||
          !!(this.addSubAdmin.value.staticContent) === true || !!(this.addSubAdmin.value.feeMgmt) === true ||
          !!(this.addSubAdmin.value.listingMgmt) === true || !!(this.addSubAdmin.value.bookingMgmt) === true ||
          !!(this.addSubAdmin.value.bannerMgmt) === true || !!(this.addSubAdmin.value.userMgmt) === true ||
          !!(this.addSubAdmin.value.referalMgmt) === true ||
          !!(this.addSubAdmin.value.masterSetUpScreen) === true)) {
      this.permisstionErrorMessage = false;
    } else {
      this.permisstionErrorMessage = true;
    }
  }

  updateProfile() {
    if (this.addSubAdmin.invalid) {
      return;
    }
    if (this.addSubAdmin.invalid || (!!(this.addSubAdmin.value.dashboard) === false &&
      !!(this.addSubAdmin.value.siteSetting) === false && !!(this.addSubAdmin.value.staticContent) === false &&
      !!(this.addSubAdmin.value.feeMgmt) === false && !!(this.addSubAdmin.value.referalMgmt) === false &&
      !!(this.addSubAdmin.value.subAdminMgmt) === false && !!(this.addSubAdmin.value.reportMgmt) === false &&
      !!(this.addSubAdmin.value.listingMgmt) === false && !!(this.addSubAdmin.value.bookingMgmt) === false &&
      !!(this.addSubAdmin.value.bannerMgmt) === false && !!(this.addSubAdmin.value.userMgmt) === false &&
      !!(this.addSubAdmin.value.masterSetUpScreen) === false)
    ) {
      this.permisstionErrorMessage = true;
      return;
    } else {
      this.permisstionErrorMessage = false;
    }
    console.log('this.data ===>>', this.data);
    if (this.data.imageUrl[0].Value !== 'noImage' && this.data.imageUrl[0].Value !== (this.userData.filter(item => {
      return item.Name === 'custom:imageurl';
    })[0].Value)) {
      if (this.imageType !== 'image/jpeg' && this.imageType !== 'image/png') {
        this.service.error('Please select either jpeg or png format images');
        return;
      }
    }
    this.spinner.show();
    console.log('this.addSubAdmin.value.countryCode', this.addSubAdmin.value.countryCode);
    var attributes = [
      {Name: 'custom:name',                 Value: this.addSubAdmin.value.name},
      {Name: 'custom:code',                 Value: this.addSubAdmin.value.countryCode},
      {Name: 'custom:number',               Value: this.addSubAdmin.value.contactNumber},
      {Name: 'custom:fullNumber',           Value: (this.addSubAdmin.value.countryCode + this.addSubAdmin.value.contactNumber)},
      {Name: 'email',                       Value: this.addSubAdmin.value.email},
      {Name: 'custom:address',              Value: this.addSubAdmin.value.address},
      {Name: 'custom:dashboard',            Value: this.addSubAdmin.value.dashboard ? 'true' : 'false'},
      {Name: 'custom:subadminManagement',   Value: this.addSubAdmin.value.subAdminMgmt ? 'true' : 'false'},
      {Name: 'custom:userManagement',       Value: this.addSubAdmin.value.userMgmt ? 'true' : 'false'},
      {Name: 'custom:masterSetupScreen',    Value: this.addSubAdmin.value.masterSetUpScreen ? 'true' : 'false'},
      {Name: 'custom:bookingManagement',    Value: this.addSubAdmin.value.bookingMgmt ? 'true' : 'false'},
      {Name: 'custom:listingManagement',    Value: this.addSubAdmin.value.listingMgmt ? 'true' : 'false'},
      {Name: 'custom:reportManagement',     Value: this.addSubAdmin.value.reportMgmt ? 'true' : 'false'},
      {Name: 'custom:siteSetting',          Value: this.addSubAdmin.value.siteSetting ? 'true' : 'false'},
      {Name: 'custom:staticContent',        Value: this.addSubAdmin.value.staticContent ? 'true' : 'false'},
      {Name: 'custom:bannerManagement',     Value: this.addSubAdmin.value.bannerMgmt ? 'true' : 'false'},
      {Name: 'custom:feeManagement',        Value: this.addSubAdmin.value.feeMgmt ? 'true' : 'false'},
      {Name: 'custom:referalManagement',    Value: this.addSubAdmin.value.referalMgmt ? 'true' : 'false'},
    ];

    if (this.file.length) {
      const params = {
        Bucket    : 'p2p2p',
        Key       : this.file[0].name,
        Body      : this.file[0]
      };
      this.service.bucket.upload(params, (err, data) => {
        if (err) {
          console.log('There was an error uploading your file: ', err);
          return false;
        }
        console.log('Successfully uploaded file.', data);
        attributes.push({Name: 'custom:imageurl', Value: data.Location});
        // this.signUpWithoutImage(apireq);
        this.update(attributes);
        return true;
      });
    } else {
      this.update(attributes);
    }
    console.log('this.addSubAdmin.value ===>>', this.addSubAdmin.value);
  }

  update(attributes) {
    this.service.updateParticularUserData(this.paramData.id, attributes).then(success => {
      console.log('success ==>>', success);
      this.service.success('Data updated successfully');
      this.router.navigate(['/header/subadmin']);
      this.spinner.hide();
    }).catch(error => {
      this.service.error('Something went wrong');
      this.spinner.hide();
      console.log('error ==>>', error);
    });
  }
}
