import { FormGroup, FormControl, Validators } from '@angular/forms';

export class forms {

  // login component

  LoginForm = new FormGroup({
    email : new FormControl('', [ Validators.required ]),
    password : new FormControl('', [ Validators.required, Validators.minLength(8), Validators.maxLength(256) ])
  });

  loginEmailVerificationForm = new FormGroup({
    verificationCode : new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
  });

  // security question component

  securityQuestionForm = new FormGroup({
    answer : new FormControl('', [Validators.required, Validators.maxLength(256)])
  });

  // reset password component

  resetPassword = new FormGroup({
    code: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  // forgot password component

  forgotPassword = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i),Validators.maxLength(256)])
  });

  // edit static content form

  staticForm = new FormGroup({
    title : new FormControl('', [Validators.required]),
    content : new FormControl('', [Validators.required])
  });

  //storage type

  addStorageForm = new FormGroup({
    storageType : new FormControl('', [Validators.required]),
  });

  // add subadmin

  addSubAdmin = new FormGroup({
    name : new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]),
    contactNumber : new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(16)]),
    countryCode : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i),Validators.maxLength(256)]),
    address : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(256)]),
    confirmPassword : new FormControl('', [Validators.required]),
    dashboard : new FormControl(false, ),
    subAdminMgmt : new FormControl(false, ),
    reportMgmt : new FormControl(false, ),
    siteSetting : new FormControl(false, ),
    staticContent : new FormControl(false, ),
    feeMgmt : new FormControl(false, ),
    referalMgmt : new FormControl(false, ),
    listingMgmt : new FormControl(false, ),
    bookingMgmt : new FormControl(false, ),
    bannerMgmt : new FormControl(false, ),
    userMgmt : new FormControl(false, ),
    masterSetUpScreen : new FormControl(false, )
  });

  editSubAdmin = new FormGroup({
    name : new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]),
    contactNumber : new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(16)]),
    countryCode : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i),Validators.maxLength(256)]),
    address : new FormControl('', [Validators.required]),
    dashboard : new FormControl(false, ),
    subAdminMgmt : new FormControl(false, ),
    reportMgmt : new FormControl(false, ),
    siteSetting : new FormControl(false, ),
    staticContent : new FormControl(false, ),
    feeMgmt : new FormControl(false, ),
    referalMgmt : new FormControl(false, ),
    listingMgmt : new FormControl(false, ),
    bookingMgmt : new FormControl(false, ),
    bannerMgmt : new FormControl(false, ),
    userMgmt : new FormControl(false, ),
    masterSetUpScreen : new FormControl(false, )
  });

  // user management search form

  searchForm = new FormGroup({
    search : new FormControl(''),
    fromDate : new FormControl(''),
    toDate : new FormControl('')
  });

  // edit FAQ form

  updateAnswerForm = new FormGroup({
    question: new FormControl('', [Validators.required]),
    answer: new FormControl('', [Validators.required])
  });

  // change password form

  changePasswordForm = new FormGroup({
    oldPassword : new FormControl('',  [Validators.required, Validators.minLength(8), Validators.maxLength(256)]),
    newPassword : new FormControl('',  [Validators.required, Validators.minLength(8), Validators.maxLength(256)]),
    confirmNewPassword : new FormControl('',  [Validators.required])
  });
  
  // addFeatures: FormGroup;


  // storageFeatures

  addFeatures = new FormGroup({
    features : new FormControl('', [Validators.required]),
  });
  // addBannerForm: FormGroup;

  addBannerForm = new FormGroup({
    bannerName : new FormControl('', [Validators.required]),
  });


  addBlogForm = new FormGroup({
    blogTitle : new FormControl('', [Validators.required]),
  });

  addaccessiblityForm = new FormGroup({
    accessTime : new FormControl('', [Validators.required]),
  });
}
