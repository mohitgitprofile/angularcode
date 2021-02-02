import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;

@Component({
  selector: 'app-edit-subadmin',
  templateUrl: './edit-subadmin.component.html',
  styleUrls: ['./edit-subadmin.component.css']
})
export class EditSubadminComponent implements OnInit {
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
  paramData: any;
  copyUserList: any=[];
  email: any;
  id: any;
  number: any;
  editdata: any=[];
  profilePic: any;
  eventdata: any;
  boolData: boolean= false;

  constructor(
    // public http: HttpClient,
    private active: ActivatedRoute,
    private service: ServiceService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.active.queryParams.subscribe((params)=>{
      this.id=params.id
      this.number=params.number
      this.email=params.email
    })
  }

  ngOnInit() {
    this.form()
   this.editSubAdmin()
  }

  editSubAdmin(){
    let data={
      subAdminId:this.id,
      email: this.email,
      mobileNumber: this.number,
    }
    console.log("g", data);
    this.service.postApii('admin/editSubAdmin',data,1).subscribe((res)=>{
      console.log("f",res);
      this.editdata=res.result[0],
      console.log("fghdw857yt4i589ghjdfb",this.editdata);
      
      this.imageUrl=res.result[0].profilePic
      this.addSubadminForm.patchValue({
      image:this.editdata.profilePic,
      name:this.editdata.name,
      email:this.editdata.email,
      password:this.editdata.password,
      confirmPassword:this.editdata.password,
      number:this.editdata.mobileNumber,
      })
      
    })
  }

  updateSubAdmin(){
    let data={
      subAdminId: this.id,
      name:this.addSubadminForm.value.name,
      mobileNumber:this.addSubadminForm.value.number,
      email:this.addSubadminForm.value.email,
      password:this.addSubadminForm.value.password,
      image:this.imageUrl,
      confirmPassword:this.addSubadminForm.value.confirmPassword,
      dashboard : this.addSubadminForm.value.dashboard || this.editdata.permission.dashboard,
      subAdminManagement : this.addSubadminForm.value.subadmin || this.editdata.permission.subAdminManagement,
      userManagement : this.addSubadminForm.value.user || this.editdata.permission.userManagement,
      eventManagement : this.addSubadminForm.value.event || this.editdata.permission.eventManagement,
      reportManagement : this.addSubadminForm.value.report || this.editdata.permission.reportManagement,
      communityManagement : this.addSubadminForm.value.community || this.editdata.permission.communityManagement,
      categoryManagement : this.addSubadminForm.value.category || this.editdata.permission.categoryManagement,
      transactionManagement : this.addSubadminForm.value.transaction || this.editdata.permission.transactionManagement,
      staticContentManagement : this.addSubadminForm.value.static || this.editdata.permission.staticContentManagement,
    }
    this.service.postApii('admin/editSubAdmin',data,1).subscribe((res)=>{
    console.log("hjyfgjhf",res);
    this.router.navigate(['/sub-admin'])
    })
  }



  form() {
    this.addSubadminForm = new FormGroup({
      name             : new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(30)]),
      password         : new FormControl('', [Validators.required, Validators.pattern(/^(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{7,30}$/) ,Validators.minLength(8), Validators.maxLength(16)]),
      confirmPassword  : new FormControl('', [Validators.required]),
      email              : new FormControl('', [Validators.required,Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i)]),
      number           : new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/),Validators.maxLength(18)]),
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


  checkboxPermission(e) {
    this.eventdata = e.target.checked;
    console.log("sdfgsdfgsdf",this.eventdata)
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

  toCheckSpaceChar() {
    this.isValidNumber = $('#phoneNumber').intlTelInput('isValidNumber');
    const countryData = $('#phoneNumber').intlTelInput('getSelectedCountryData');
    this.myCode = "+" + countryData.dialCode;

  }

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
