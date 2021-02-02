import { Component, OnInit, FormGroup, FormBuilder, MainService, Validators, INgxMyDpOptions } from '../../../index';
import { GlobalConstant } from '../../../global/global.constant';

declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  myOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };
  editProfileForm: FormGroup;
  list: any = { countryList: [], cardList: [] };
  ImageBase64 = "assets/images/user-img.png";
  userDetails: any = {};
  profileData: any = {};
  changePasswordForm: FormGroup;
  cardId: any;
  addCardForm: FormGroup;
  modalType: any;

  constructor(private service: MainService, private fb: FormBuilder) { }


  ngOnInit() {
    this.myOptions.disableSince = {
      year: new Date().getFullYear(),
      month: (new Date().getMonth() + 1),
      day: new Date().getDate()
    }
    this.editProfileForm = this.fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(/^[^\s][a-zA-Z ]*$/)])],
      'phone': [{ value: '', disabled: true }, Validators.compose([Validators.required, Validators.pattern(/^[1-9][0-9]{7,15}$/)])],
      'email': [{ value: '', disabled: true }, Validators.compose([Validators.required, , Validators.pattern(/^[A-Z0-9_-]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,3})+$/i)])],
      'dob': ['', Validators.compose([Validators.required])],
      'gender': ['', Validators.compose([Validators.required])],
      'nationality': ['', Validators.compose([Validators.required])]
    })
    this.changePasswordForm = this.fb.group({
      'oldPassword': ['', Validators.compose([Validators.required, Validators.pattern(/^[^\s]*$/), Validators.minLength(8)])],
      'newPassword': ['', Validators.compose([Validators.required, Validators.pattern(/^[^\s]*$/), Validators.minLength(8)])],
      'confirmPassword': ['', Validators.compose([Validators.required, Validators.pattern(/^[^\s]*$/), Validators.minLength(8)])]
    })
    this.addCardForm = this.fb.group({
      'expiryDate': ['', Validators.compose([Validators.required, Validators.pattern(/^[2][0][1-9][0-9][-]0[1-9]|1[012]$/)])],
      'cardNumber': ['', Validators.compose([Validators.required, Validators.pattern(/^[1-9][0-9]{7,15}$/)])],
    })
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.getCountryListApi();
    this.getProfileApi();
  }

  //****************************************************  Api to get country list ***************************************************//
  getCountryListApi() {
    return new Promise((resolve, reject) => {
      this.service.getApi('users/code', 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 200) {
          this.list.countryList = Response[`result`]
          resolve(true)
        }
      })
    })
  }
  //********************************************* End *******************************************************************************//

  //****************************************************  Api to get profile details ***************************************************//
  getProfileApi() {
    this.service.getApi(`users/getDetail?_id=${this.userDetails._id}`, 1).subscribe(response => {
      if (response.responseCode == 200) {
        this.profileData = response.result;
        if(this.profileData.image) {
          this.ImageBase64 = this.profileData.image;
        }
        this.list.cardList = this.profileData.cardDetails;
        let date = new Date(this.profileData.dob)
        this.editProfileForm.patchValue({
          name: this.profileData.firstName + " " + this.profileData.lastName,
          phone: this.profileData.mobileNumber,
          email: this.profileData.email,
          dob: {
            date: {
              year: date.getFullYear(),
              month: date.getMonth() + 1,
              day: date.getDate()
            }, formatted: this.profileData.dob
          },
          gender: this.profileData.gender,
          nationality: this.profileData.nationality
        })
      }
    })
  }
  //****************************************** End **********************************************************************************//

  //****************************************************  Api to update profile details ***************************************************//
  updateProfile() {
    var firstName = this.editProfileForm.value.name.split(" ");
    if (firstName[1] == undefined) {
      firstName[1] = ''
    }
    var updateData = {}
    if(this.ImageBase64 == "assets/images/user-img.png") {
      updateData = {
        "_id": this.userDetails._id,
        "firstName": firstName[0],
        "lastName": firstName[1],
        "mobileNumber": this.editProfileForm.value.phone,
        "email": this.editProfileForm.value.email,
        "dob": this.editProfileForm.value.dob.formatted,
        "gender": this.editProfileForm.value.gender,
        "nationality": this.editProfileForm.value.nationality,
      }
    } else {
      updateData = {
        "_id": this.userDetails._id,
        "firstName": firstName[0],
        "lastName": firstName[1],
        "mobileNumber": this.editProfileForm.value.phone,
        "email": this.editProfileForm.value.email,
        "dob": this.editProfileForm.value.dob.formatted,
        "gender": this.editProfileForm.value.gender,
        "nationality": this.editProfileForm.value.nationality,
        "image": this.ImageBase64
      }
    }
    this.service.postApi(`users/updateUser`, updateData, 1).subscribe(response => {
      if (response.responseCode == 200) {
        this.profileData = response.result;
        this.service.toastrSucc(response.responseMessage)
        this.service.headerSubChange(1)
        // window.location.reload();
      } else {
        this.service.toastrErr(response.responseMessage)
      }
    })
  }
  //****************************************** End **********************************************************************************//

  

  // ************ File upload **************************************************************************************** //
  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      let self = this
      reader.onload = function (e: any) {
        $('#preview').attr('src', e.target.result);
        self.ImageBase64 = e.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  // ************ End File upload **************************************************************************************** //

  // ************ Change password Api **************************************************************************************** //
  changePasswordApi() {
    var updateData = {
      '_id': this.userDetails._id,
      'password': this.changePasswordForm.value.oldPassword,
      'newPassword': this.changePasswordForm.value.confirmPassword
    }
    this.service.postApi(`users/changePassword`, updateData, 1).subscribe(response => {
      if (response.responseCode == 200) {
        this.profileData = response.result;
        this.service.toastrSucc(response.responseMessage)
        this.changePasswordForm.reset();
      } else {
        this.service.toastrErr(response.responseMessage)
      }
    })
  }
  //****************************************** End **********************************************************************************//

  // ************ Add card Api **************************************************************************************** //
  addCard() {
    this.modalType = 'addCardModal';
    $("#addCard_Modal").modal(`show`);
    this.addCardForm.reset();
  }

  saveAddCard() {
    var cardData = {
      '_id': this.userDetails._id,
      'cardDetails': {
        'cardNumber': this.addCardForm.value.cardNumber,
        'expiryDate': this.addCardForm.value.expiryDate
      }
    }
    this.service.postApi(`users/addCard`, cardData, 1).subscribe(response => {
      if (response.responseCode == 201) {
        $("#addCard_Modal").modal(`hide`);
        this.getProfileApi();
        this.service.toastrSucc(response.responseMessage)
      } else {
        this.service.toastrErr(response.responseMessage)
      }
    })
  }
  //****************************************** End **********************************************************************************//

  // ************ edit card Api **************************************************************************************** //
  editCard(data) {
    this.modalType = 'editCardModal';
    this.cardId = data._id;
    this.addCardForm.setValue({
      'cardNumber': data.cardNumber,
      'expiryDate': data.expiryDate
    })
    $("#addCard_Modal").modal(`show`);
  }

  saveEditCard() {
    var cardData = {
      '_id': this.userDetails._id,
      'cardDetails': {
        '_id': this.cardId,
        'cardNumber': this.addCardForm.value.cardNumber,
        'expiryDate': this.addCardForm.value.expiryDate
      }
    }
    this.service.postApi(`users/editCardDetails`, cardData, 1).subscribe(response => {
      if (response.responseCode == 200) {
        $("#addCard_Modal").modal(`hide`);
        this.getProfileApi();
        this.service.toastrSucc(response.responseMessage)
      } else {
        this.service.toastrErr(response.responseMessage)
      }
    })
  }
  //****************************************** End **********************************************************************************//

    // ************ Delete card Api **************************************************************************************** //
    deleteCard(data) {
      $("#delete-card").modal(`show`);
      this.cardId = data._id;
    }

    deleteCardApi() {
      var cardData = {
        '_id': this.userDetails._id,
        'cardDetails': {
          '_id': this.cardId
        }
      }
      this.service.postApi(`users/deleteCard`, cardData, 1).subscribe(response => {
        if (response.responseCode == 204) {
          $("#delete-card").modal(`hide`);
          this.profileData = response.result;
          this.service.toastrSucc(response.responseMessage)
          this.getProfileApi();
        } else {
          this.service.toastrErr(response.responseMessage)
        }
      })
    }
    //****************************************** End **********************************************************************************//
}
