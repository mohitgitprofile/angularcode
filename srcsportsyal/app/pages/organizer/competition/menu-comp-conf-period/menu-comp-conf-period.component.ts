import { Component, OnInit, MainService, FormGroup, FormBuilder, Validators } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';

declare var $: any;
@Component({
  selector: 'app-menu-comp-conf-period',
  templateUrl: './menu-comp-conf-period.component.html',
  styleUrls: ['./menu-comp-conf-period.component.css']
})

export class MenuCompConfPeriodComponent implements OnInit {
  userDetails: any = {};
  addPeriodForm: FormGroup;
  editFormPeriodName: any;
  editPeriodForm: FormGroup;
  periodList: any = {docs: []};
  periodData: any = {};
  userId: any = {};
  limitChange: any = GlobalConstant.limitChangeArr[0];
  list: any = {limitChangeArr: GlobalConstant.limitChangeArr, limit: GlobalConstant.paginationLimit };

  constructor(private service: MainService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.addPeriodForm = this.fb.group({
      'periodName': ['', Validators.compose([Validators.required])],
    })
    this.editPeriodForm = this.fb.group({
      'periodName': ['', Validators.compose([Validators.required])],
    })
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.userId = { "userId": this.userDetails._id, "page": 1, "limit": this.list.limit, 'search':'' }
    this.getPeriodList();
  }

  // ************ Get All Period Api **************************************************************************************** // 
  getPeriodList() {
    this.service.postApi(`organizer/getPeriod`, this.userId, 0).subscribe(responseList => {
      let periodListData = responseList;
      if (periodListData.responseCode == 200) {
        this.periodList = periodListData.result;
      }
    })
  }
  // ************ End Get All Period Api **************************************************************************************** //

  // ************ Add Period Api **************************************************************************************** //
  addPeriod() {
    let periodData = {
      'userId': this.userDetails._id,
      'periodName': this.addPeriodForm.value.periodName
    }
    this.service.postApi(`organizer/addPeriod`, periodData, 0).subscribe(response => {
      if (response.responseCode == 201) {
        this.service.toastrSucc(response.responseMessage)
        this.addPeriodForm.reset();
        $("#add_period").modal(`hide`);
        this.userId = { "userId": this.userDetails._id, "page": 1, "limit": this.list.limit, 'search':'' }
        this.getPeriodList();
      }
    })
  }
  // ************ End Add Period Api **************************************************************************************** //

  // ************ Edit Period Api **************************************************************************************** //
  editPeriod(data) {
    $("#edit_period").modal(`show`);
    this.editFormPeriodName = data.periodName;
    this.periodData = {
      'userId': this.userDetails._id,
      'periodId': data._id
    }
  }
  saveEditFormData() {
    this.periodData.periodName = this.editFormPeriodName;
    this.service.postApi(`organizer/editPeriod`, this.periodData, 0).subscribe(response => {
      if (response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage)
        this.editPeriodForm.reset();
        $("#edit_period").modal(`hide`);
        this.getPeriodList();
      }
    })
  }
  // ************ End Edit Period Api **************************************************************************************** //

  // ************ Delete Period Api **************************************************************************************** //
  deletePeriod(data) {
    $("#delete-period").modal(`show`);
    this.periodData = {
      'userId': this.userDetails._id,
      'periodId': data._id
    }
  }

  confirmDeletePeriod() {
    this.service.postApi(`organizer/deletePeriod`, this.periodData, 0).subscribe(response => {
      if (response.responseCode == 204) {
        this.service.toastrSucc(response.responseMessage)
        $("#delete-period").modal(`hide`);
        this.getPeriodList();
      }
    })
  }
  // ************ End Delete Period Api **************************************************************************************** //

  changePage(data) {
    this.userId = { "userId": this.userDetails._id, "page": data, "limit": this.list.limit, 'search':'' }
    this.getPeriodList();
  }

  changeLimit() {
    this.userId = { "userId": this.userDetails._id, "page": 1, "limit": Math.floor(this.limitChange), 'search':'' }
    this.getPeriodList();
  }

  onSearch(val, event) {
    this.userId.page = 1
    if(val === 1) {
      if(!this.userId.search || event.keyCode == 13)
        this.getPeriodList()
    } else if(val === 2)
      this.getPeriodList()
  }
}
