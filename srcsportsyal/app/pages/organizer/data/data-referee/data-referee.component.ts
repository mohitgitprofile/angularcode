import { Component, OnInit, FormGroup, FormBuilder, MainService, Validators, INgxMyDpOptions } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';

declare var $: any;
@Component({
  selector: 'app-data-referee',
  templateUrl: './data-referee.component.html',
  styleUrls: ['./data-referee.component.css']
})
export class DataRefereeComponent implements OnInit {
  addRefereeForm: FormGroup;
  userDetails: any = {};
  ImageBase64: any = "assets/images/user-img.png";
  limitChange: any = GlobalConstant.limitChangeArr[0];
  list: any = { sportsList: [], refereeList: {}, limitChangeArr: GlobalConstant.limitChangeArr, limit: GlobalConstant.paginationLimit };
  bodyData: any = {};
  modalType: any;
  refereeId: any;
  myOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };
  filter: any = { activities: [] };
  dropdownSettings: any = GlobalConstant.multidropDownSettings

  constructor(private service: MainService, private fb: FormBuilder) {
    window.scrollTo(0, 0)
  }

  ngOnInit() {
    this.myOptions.disableSince = {
      year: new Date().getFullYear(),
      month: (new Date().getMonth() + 1),
      day: new Date().getDate()
    }
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.addRefereeForm = this.fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(/^[^\s][a-zA-Z ]*$/)])],
      'mobileNumber': ['', Validators.compose([Validators.required, Validators.pattern(/^[1-9][0-9]{7,15}$/)])],
      'email': ['', Validators.compose([Validators.required, , Validators.pattern(/^[A-Z0-9_-]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,3})+$/i)])],
      'gender': ['', Validators.compose([Validators.required])],
      // 'activities': ['', Validators.compose([Validators.required])],
      'dob': ['', Validators.compose([Validators.required])]
    })
    this.getSportsListApi();
    this.bodyData = { 'page': 1, 'limit': this.list.limit }
    this.getRefereeListApi();
  }

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

  // ************ get sports list Api **************************************************************************************** //
  getSportsListApi() {
    return new Promise((resolve, reject) => {
      this.service.getApi('organizer/selectSport?userId=' + this.userDetails._id, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 200) {
          // this.list.sportsList = Response[`result`]
          console.log('response=>' + JSON.stringify(Response));
          this.list.sportsList = Response['result'].map(item => {

            // return { item_id: item._id, item_text: item.sportName }

            return item.sportName
          })
          resolve(true)
        }
      })
    })
  }
  // ************ End get sports list Api **************************************************************************************** //

  // ************ get referee list Api **************************************************************************************** //
  getRefereeListApi() {
    return new Promise((resolve, reject) => {
      this.service.postApi('data/getListOfReferee?userId=' + this.userDetails._id, this.bodyData, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 200) {
          this.list.refereeList = Response[`result`]
          resolve(true)
        }
      })
    })
  }
  // ************ End get referee list Api **************************************************************************************** //

  // ************ Add Referee Api **************************************************************************************** //
  addRefereeModal() {
    this.modalType = 'addRefereeModal';
    this.addRefereeForm.reset();
    this.filter.activities = []
    this.addRefereeForm.setValue({ name: '', mobileNumber: '', email: '', dob: '', gender: '' })
    this.ImageBase64 = "assets/images/user-img.png"
    $("#add_Referee").modal(`show`);
  }
  addRefere() {
    var refereeData = {}
    if (this.ImageBase64 == "assets/images/user-img.png") {
      refereeData = {
        'name': this.addRefereeForm.value.name,
        'mobileNumber': this.addRefereeForm.value.mobileNumber,
        'email': this.addRefereeForm.value.email,
        'dob': this.addRefereeForm.value.dob.formatted,
        'gender': this.addRefereeForm.value.gender,
        'activities': this.filter.activities,
      }
    } else {
      refereeData = {
        'name': this.addRefereeForm.value.name,
        'mobileNumber': this.addRefereeForm.value.mobileNumber,
        'email': this.addRefereeForm.value.email,
        'dob': this.addRefereeForm.value.dob.formatted,
        'gender': this.addRefereeForm.value.gender,
        'activities': this.filter.activities,
        'image': this.ImageBase64
      }
    }
    this.service.postApi(`data/addReferee?userId=` + this.userDetails._id, refereeData, 1).subscribe(response => {
      if (response.responseCode == 201) {
        this.service.toastrSucc(response.responseMessage)
        this.addRefereeForm.reset();
        $("#add_Referee").modal(`hide`);
        this.bodyData = { 'page': 1, 'limit': this.list.limit }
        this.getRefereeListApi();
      }
    })
  }
  // ************ End Add Referee Api **************************************************************************************** //

  // ************ Edit Referee Api **************************************************************************************** //

  editRefereeModal(data) {
    this.modalType = 'editRefereeModal';
    this.refereeId = data._id;
    let date = new Date(data.dob)
    this.addRefereeForm.setValue({
      name: data.name,
      mobileNumber: data.mobileNumber,
      email: data.email,
      dob: {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        },
        formatted: data.dob
      },
      gender: data.gender,
      // activities: data.activities 
    })
    this.filter.activities = data.activities
    if (data.image) {
      this.ImageBase64 = data.image;
    }
    $("#add_Referee").modal(`show`);
  }
  editRefere() {
    var refereeData = {}
    if (this.ImageBase64 == "assets/images/user-img.png") {
      refereeData = {
        'name': this.addRefereeForm.value.name,
        'mobileNumber': this.addRefereeForm.value.mobileNumber,
        'email': this.addRefereeForm.value.email,
        'dob': this.addRefereeForm.value.dob.formatted,
        'gender': this.addRefereeForm.value.gender,
        'activities': this.filter.activities,
      }
    } else {
      refereeData = {
        'name': this.addRefereeForm.value.name,
        'mobileNumber': this.addRefereeForm.value.mobileNumber,
        'email': this.addRefereeForm.value.email,
        'dob': this.addRefereeForm.value.dob.formatted,
        'gender': this.addRefereeForm.value.gender,
        'activities': this.filter.activities,
        'image': this.ImageBase64
      }
    }
    this.service.postApi(`data/editReferee?userId=` + this.userDetails._id + `&refereeId=` + this.refereeId, refereeData, 1).subscribe(response => {
      if (response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage)
        this.addRefereeForm.reset();
        $("#add_Referee").modal(`hide`);
        this.bodyData = { 'page': 1, 'limit': this.list.limit }
        this.getRefereeListApi();
      }
    })
  }
  // ************ End edit Referee Api **************************************************************************************** //

  // ************ Delete Referee Api **************************************************************************************** //
  deleteRefereeModal(data) {
    this.refereeId = data._id;
    $("#delete-referee").modal(`show`);
  }

  deleteReferee() {
    this.service.getApi(`data/deleteReferee?userId=` + this.userDetails._id + `&refereeId=` + this.refereeId, 1).subscribe(response => {
      if (response.responseCode == 204) {
        this.service.toastrSucc(response.responseMessage)
        this.addRefereeForm.reset();
        $("#delete-referee").modal(`hide`);
        this.bodyData = { 'page': 1, 'limit': this.list.limit }
        this.getRefereeListApi();
      }
    })
  }
  // ************ End delete Referee Api **************************************************************************************** //

  changePage(data) {
    this.bodyData = { "page": data, "limit": this.list.limit }
    this.getRefereeListApi();
  }

  changeLimit() {
    this.bodyData = { "page": 1, "limit": Math.floor(this.limitChange) }
    this.getRefereeListApi();
  }

  onSearch(val, event) {
    this.bodyData.page = 1
    if (val === 1) {
      if (!this.bodyData.search || event.keyCode == 13)
        this.getRefereeListApi()
    } else if (val === 2)
      this.getRefereeListApi()
  }

}
