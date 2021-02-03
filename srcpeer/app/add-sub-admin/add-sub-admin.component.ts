import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { forms } from '../forms';
import { validationMessage } from '../validationMessage';
import { ServiceService } from '../service/service.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sub-admin',
  templateUrl: './add-sub-admin.component.html',
  styleUrls: ['./add-sub-admin.component.css']
})
export class AddSubAdminComponent implements OnInit {

  addSubAdmin: FormGroup;
  validationMessage: any;
  permisstionErrorMessage: Boolean = false;
  image: any = {imageUrl: '', imageType: ''};
  countryList: any = [];
  file: any = [];

  constructor(
    private spinner: NgxSpinnerService,
    public form: forms,
    public router: Router,
    public validation: validationMessage,
    public service: ServiceService,
    public http: HttpClient
  ) {
    window.scrollTo(0, 0);
    this.validationMessage = this.validation.message;
    this.addSubAdmin = this.form.addSubAdmin;
    this.addSubAdmin.reset();
   }

  ngOnInit() {
    this.http.get('/assets/countryData.JSON').subscribe(list => this.countryList = list);
    this.addSubAdmin.patchValue({
      countryCode : '+91'
    });
  }

  submit () {
    if (this.addSubAdmin.value.password !== this.addSubAdmin.value.confirmPassword ||
      this.addSubAdmin.invalid || (!!(this.addSubAdmin.value.dashboard) === false &&
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
    if (this.image.imageUrl !== '') {
      if (this.image.imageType !== 'image/jpeg' && this.image.imageType !== 'image/png') {
        this.service.error('Please select either jpeg or png format images');
        return;
      }
    }
    this.spinner.show();
    var apireq = {
      email : this.addSubAdmin.value.email,
      password : this.addSubAdmin.value.password,
      username : this.addSubAdmin.value.email,
      attributes: {
        'custom:type'               : 'subAdmin',
        'custom:name'               : this.addSubAdmin.value.name,
        'custom:fullNumber'         : this.addSubAdmin.value.countryCode + this.addSubAdmin.value.contactNumber,
        'custom:address'            : this.addSubAdmin.value.address,
        'custom:countryCode'        : this.addSubAdmin.value.countryCode,
        'custom:code'               : this.addSubAdmin.value.countryCode,
        'custom:number'             : this.addSubAdmin.value.contactNumber,
        'custom:dashboard'          : !!(this.addSubAdmin.value.dashboard) ? 'true' : 'false',
        'custom:listingManagement'  : !!(this.addSubAdmin.value.listingMgmt) ? 'true' : 'false',
        'custom:bookingManagement'  : !!(this.addSubAdmin.value.bookingMgmt) ? 'true' : 'false',
        'custom:bannerManagement'   : !!(this.addSubAdmin.value.bannerMgmt) ? 'true' : 'false',
        'custom:userManagement'     : !!(this.addSubAdmin.value.userMgmt) ? 'true' : 'false',
        'custom:masterSetupScreen'  : !!(this.addSubAdmin.value.masterSetUpScreen) ? 'true' : 'false',
        'custom:subadminManagement' : !!(this.addSubAdmin.value.subAdminMgmt) ? 'true' : 'false',
        'custom:reportManagement'   : !!(this.addSubAdmin.value.reportMgmt) ? 'true' : 'false',
        'custom:siteSetting'        : !!(this.addSubAdmin.value.siteSetting) ? 'true' : 'false',
        'custom:staticContent'      : !!(this.addSubAdmin.value.staticContent) ? 'true' : 'false',
        'custom:feeManagement'      : !!(this.addSubAdmin.value.feeMgmt) ? 'true' : 'false',
        'custom:referalManagement'  : !!(this.addSubAdmin.value.feeMgmt) ? 'true' : 'false',
      },
      validationData: []
    };
    if (this.file.length) {
      const params = {
        Bucket: 'p2p2p',
        Key: this.file[0].name,
        Body: this.file[0]
      };
      this.service.bucket.upload(params, (err, data) => {
        if (err) {
          console.log('There was an error uploading your file: ', err);
          return false;
        }
        console.log('Successfully uploaded file.', data);
        apireq.attributes['custom:imageurl'] = data.Location;
        this.signUpWithoutImage(apireq);
        return true;
      });
      // this.service.uploadfile(this.file.length ? this.file[0] : '', this.file.length ? this.file[0].name : '', apireq);
    } else {
      apireq.attributes['custom:imageurl'] = 'noImage';
      this.signUpWithoutImage(apireq);
    }
  }

  signUpWithoutImage(apireq) {
    this.service.signUp(apireq).then(success => {
      console.log('success logout ==>>', success);
      this.service.success(this.addSubAdmin.value.name + ' added successfully');
      this.router.navigate(['/header/subadmin']);
      this.spinner.hide();
    }).catch(error => {
      console.log('error logout ===>>>', error);
      this.service.error(error.message);
      this.spinner.hide();
    });
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

  selectImages(event) {
    this.file = event.target.files;
    if (this.file[0]) {
      console.log(this.file[0]);
      this.image.imageType = this.file[0].type;
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.image.imageUrl = e.target.result;
        console.log('this.image ===>>>', this.image);
        // this.service.uploadfile(event.target.files[0], event.target.files[0].name);
      };
      reader.readAsDataURL(this.file[0]);
    }
  }

}
