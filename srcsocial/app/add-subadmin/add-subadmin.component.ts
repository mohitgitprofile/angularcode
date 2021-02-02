import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-add-subadmin',
  templateUrl: './add-subadmin.component.html',
  styleUrls: ['./add-subadmin.component.css']
})
export class AddSubadminComponent implements OnInit {

  imageUrl = 'assets/img/profile-img.jpg';
  file: any = [];
  imageType: any = '';
  addSubadminForm: FormGroup;
  masterRoleList: any = [];
  permission: any = [];
  countryList: any=[];
  isValidNumbers: any;
  myCode: string;
  isValidNumber: any;
  permisstionErrorMessage: Boolean = false;
  kycUrl: any;
  eventdata: any;
  boolData: boolean = false;

  constructor(
    // public http: HttpClient,
    private service: ServiceService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    // this.permission = !!JSON.parse(localStorage.getItem('permission')) ? (JSON.parse(localStorage.getItem('permission')).length ? JSON.parse(localStorage.getItem('permission')) : [] ) : [];
    // if (!this.permission.includes('addSubadmin')) {
    //   this.router.navigate(['/pageNotFound']);
    // }
  }

  ngOnInit() {
 
    // this.phoneCheckCountry();
    // this.phoneCheckCountrys();
    // this.http.get('/assets/json/countries.json').subscribe(list =>{
    //   this.countryList = list 
    // });

    this.form();
    // this.getMasterRoleList();
   
  }

  form() {
    this.addSubadminForm = new FormGroup({
      name             : new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(30)]),
      password         : new FormControl('', [Validators.required, Validators.pattern(/^(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{7,30}$/) ,Validators.minLength(8), Validators.maxLength(16)]),
      confirmPassword  : new FormControl('', [Validators.required]),
      // subAdminID       : new FormControl('', [Validators.required]),
      email            : new FormControl('', [Validators.required,Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i)]),
      number           : new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]{8,13}$/),Validators.maxLength(18)]),
      dashboard : new FormControl(),
      subadmin : new FormControl(),
      user : new FormControl(),
      event : new FormControl(),
      report : new FormControl(),
      community : new FormControl(),
      category : new FormControl(),
      transaction : new FormControl(),
      static : new FormControl()
    
    });
  }

  // checkboxPermission() {
  //   if (( !!(this.addSubadminForm.value.dashboard) === true || !!(this.addSubadminForm.value.subAdminMgmt) === true ||
  //         !!(this.addSubadminForm.value.reportMgmt) === true || !!(this.addSubadminForm.value.siteSetting) === true ||
  //         !!(this.addSubadminForm.value.staticContent) === true || !!(this.addSubadminForm.value.feeMgmt) === true ||
  //         !!(this.addSubadminForm.value.listingMgmt) === true || !!(this.addSubadminForm.value.bookingMgmt) === true ||
  //         !!(this.addSubadminForm.value.bannerMgmt) === true || !!(this.addSubadminForm.value.userMgmt) === true ||
  //         !!(this.addSubadminForm.value.referalMgmt) === true ||
  //         !!(this.addSubadminForm.value.masterSetUpScreen) === true)) {
  //     this.permisstionErrorMessage = false;
  //     console.log("gh", this.permisstionErrorMessage);
      
  //   } else {
  //     this.permisstionErrorMessage = true;
  //     console.log("gh", this.permisstionErrorMessage);

  //   }
  // }

  checkboxPermission(e) {
    this.eventdata = e.target.checked;
    console.log("sdfgsdfgsdf",this.eventdata)
  }

  getMasterRoleList() {
    this.spinner.show();
    this.service.getApi('/master-role').subscribe((success: any) => {
      if (success.statusCode === 200) {
        this.masterRoleList = success.data;
      } else {
        this.masterRoleList = [];
      }
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.masterRoleList = [];
    })
  }

  addSubadmin() {
    let data = {
      name : this.addSubadminForm.value.name,
      password : this.addSubadminForm.value.password,
      confirmPassword : this.addSubadminForm.value.confirmPassword,
      // kycImage: this.imageUrl,
      email: this.addSubadminForm.value.email,
      mobileNumber: this.addSubadminForm.value.number,
      image:this.imageUrl,
      dashboard : this.addSubadminForm.value.dashboard || this.boolData,
      subAdminManagement : this.addSubadminForm.value.subadmin || this.boolData,
      userManagement : this.addSubadminForm.value.user || this.boolData,
      eventManagement : this.addSubadminForm.value.event || this.boolData,
      reportManagement : this.addSubadminForm.value.report || this.boolData,
      communityManagement : this.addSubadminForm.value.community || this.boolData,
      categoryManagement : this.addSubadminForm.value.category || this.boolData,
      transactionManagement : this.addSubadminForm.value.transaction || this.boolData,
      staticContentManagement : this.addSubadminForm.value.static || this.boolData,
      
    }
    console.log("hgfhjgfhngfhjgfhjngfhngf",data);
    
    this.service.postApii('admin/addSubAdmin', data,  1).subscribe(success => {
      if(success.response_code == 200) {
        // this.service.success(success.response_message)
        this.router.navigate(['/sub-admin'])
      }
      else {
        this.spinner.hide();
      }
    })
  }

  // addSubadmin() {
  //   console.log('mobilenUMBER===>>>',this.myCode+this.addSubadminForm.value.number)
  //   if (this.addSubadminForm.invalid || (this.addSubadminForm.value.password !== this.addSubadminForm.value.confirmPassword)) {
  //     return;
  //   }
  //   if (this.imageUrl !== 'assets/img/profile-img.jpg') {
  //     if (this.imageType !== 'image/jpeg' && this.imageType !== 'image/jpg' && this.imageType !== 'image/png') {
  //       // this.service.error('Please select either jpeg or png format images');
  //       return;
  //     }
  //   }
  //   this.spinner.show();
  //   const masterRoleData = this.masterRoleList.filter(item => {
  //     return item.uuid === this.addSubadminForm.value.masterRole;
  //   });
  //   var apireq = {
  //     email        : this.addSubadminForm.value.email,
  //     password     : this.addSubadminForm.value.password,
  //     username     :  this.myCode + this.addSubadminForm.value.number,
  //     // phone_number : this.addSubadminForm.value.countryCode + this.addSubadminForm.value.number,
  //     phone_number : this.myCode + this.addSubadminForm.value.number,
  //     attributes: {
  //       'custom:userType'               : 'subAdmin',
  //       'custom:emailAddress'           : this.addSubadminForm.value.email,
  //       'custom:name'                   : this.addSubadminForm.value.name,
  //       'custom:masterRole'             : masterRoleData.length ? masterRoleData[0].role_name : '',
  //       'custom:masterRoleId'           : this.addSubadminForm.value.masterRole,
  //       // 'custom:countryCode'            : this.addSubadminForm.value.countryCode
  //       'custom:countryCode'            : this.myCode 
  //     },
  //     validationData: []
  //   };
  //   if (this.file.length) {
  //     const params = {
  //       Bucket: 'stage1admin',
  //       Key: this.file[0].name,
  //       Body: this.file[0]
  //     };
  //     this.service.bucket.upload(params, (err, data) => {
  //       if (err) {
  //         this.spinner.hide();
  //         return false;
  //       }
  //       apireq.attributes['custom:image'] = data.Location;
  //       this.signUp(apireq);
  //       return true;
  //     });
  //     // this.service.uploadfile(this.file.length ? this.file[0] : '', this.file.length ? this.file[0].name : '', apireq);
  //   } else {
  //     apireq.attributes['custom:image'] = 'assets/img/profile-img.jpg';
  //     this.signUp(apireq);
  //   }
  // }

  signUp(apireq) {
    this.service.signUp(apireq).then(success => {
      // this.service.success(this.addSubAdmin.value.name + ' added successfully');
      this.service.success('Sub admin have been added successfully.');
      this.router.navigate(['subadmin-management']);
      this.spinner.hide();
    }).catch(error => {
      this.service.error(error.message);
      this.spinner.hide();
    });
  }

  ValidateFileUpload(event) {
    this.file = event.target.files;
    if (this.file[0]) {
      this.imageType = this.file[0].type;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.file[0]);
    }
  }
  ValidateFileUploadkyc(event) {
    this.file = event.target.files;
    if (this.file[0]) {
      this.imageType = this.file[0].type;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.kycUrl = e.target.result;
      };
      reader.readAsDataURL(this.file[0]);
    }
  }

  phoneCheckCountry() {
    $("#phoneNumber").intlTelInput({
      autoPlaceholder: false,
      autoFormat: false,
      autoHideDialCode: false,
      initialCountry: 'in',
      nationalMode: false,
      onlyCountries: [],
      // preferredCountries: ["us"],
      formatOnInit: true,
      separateDialCode: true,
      formatOnDisplay: false
    });
  }
  toCheckSpaceChar() {
    this.isValidNumber = $('#phoneNumber').intlTelInput('isValidNumber');
    const countryData = $('#phoneNumber').intlTelInput('getSelectedCountryData');
    this.myCode = "+" + countryData.dialCode;

  }

  // phoneCheckCountrys() {
  //   $("#phoneNumber1").intlTelInput({
  //     autoPlaceholder: false,
  //     autoFormat: false,
  //     autoHideDialCode: false,
     
  //     nationalMode: false,
  //     onlyCountries: [],
    
  //     formatOnInit: true,
  //     separateDialCode: true,
  //     formatOnDisplay: false
  //   });
  // }
  // toCheckSpaceChars() {
  //   this.isValidNumbers = $('#phoneNumber1').intlTelInput('isValidNumber');
  //   const countryData = $('#phoneNumber1').intlTelInput('getSelectedCountryData');
  //   this.myCode = "+" + countryData.dialCode;
   
  // }
  phoneCheckCountrys() {
    $("#loginPhoneNumber").intlTelInput({
      autoPlaceholder: false,
      autoFormat: false,
      // autoHideDialCode: false,
    initialCountry: 'in',
      nationalMode: false,
      onlyCountries: [],
      // preferredCountries: ["us"],
      formatOnInit: true,
      separateDialCode: true,
      formatOnDisplay: false
    });
  }
  toCheckSpaceChars() {
    this.isValidNumbers = $('#loginPhoneNumber').intlTelInput('isValidNumber');
    const countryData = $('#loginPhoneNumber').intlTelInput('getSelectedCountryData');
    this.myCode = "+" + countryData.dialCode;
 console.log('check vent -=-=-', this.isValidNumbers)
  }

}
