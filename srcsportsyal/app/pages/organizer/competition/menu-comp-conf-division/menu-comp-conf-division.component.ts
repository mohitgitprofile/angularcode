import { Component, OnInit, FormGroup, FormBuilder, Validators, MainService, INgxMyDpOptions } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';

declare var $: any;
@Component({
  selector: 'app-menu-comp-conf-division',
  templateUrl: './menu-comp-conf-division.component.html',
  styleUrls: ['./menu-comp-conf-division.component.css']
})
export class MenuCompConfDivisionComponent implements OnInit {
  addDivisionForm: FormGroup;
  list: any = { sportsListArr: [], genderListArr: GlobalConstant.genderArr };
  page: any = { currPage: 1, limit: GlobalConstant.paginationLimit, search: '', limitChangeArr: GlobalConstant.limitChangeArr, entryLimit: GlobalConstant.limitChangeArr[0] };
  divisionData: any = {docs: []}
  updateData: any = {isAddDivision: false, currId: ''}
  userDetails: any = {};
  myOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };
  constructor(private fb: FormBuilder, private service: MainService) { }

  ngOnInit() {
    let currDate = new Date()
    currDate.setDate(currDate.getDate() + 1)
    this.myOptions.disableSince = {
      year: new Date().getFullYear(),
      month: (new Date().getMonth() + 1),
      day: currDate.getDate()
    }
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.getDivisionListApi() // Division List Api
    this.getSportsListApi()
    
    this.addDivisionForm = this.fb.group({
      divisionName: [ '', Validators.required ],
      sports: ['', Validators.required],
      gender: ['', Validators.required],
      minAge: ['', Validators.required],
      maxAge: ['', Validators.required],
      date: [null, Validators.required]
    })
  }
  getSportsListApi() {
    this.service.getApi(`organizer/selectSport?userId=${this.userDetails._id}`, 1).subscribe(response => {
      if(response.responseCode == 200) {
        this.list.sportsListArr = response.result
      }
    })
  }
  addDivisionModal() {
    this.updateData.isAddDivision = true
    this.addDivisionForm.reset()
    this.addDivisionForm.patchValue({
      gender: '',
      sports: ''
    })
    $(`#orgMenuCompAddDivision`).modal({backdrop: 'static'})
  }

  get gDivisionF() {
    return this.addDivisionForm.controls;
  }
  getNumber(val) {
    return Number(val);
  }
  onAddDivision(isAdd) {
    let currUrl = ''
    let formVal = this.addDivisionForm.value
    console.log(JSON.stringify(formVal))
    let addData = {
      userId: this.userDetails._id,
      divisionName: formVal.divisionName.trim(),
      sports: formVal.sports,
      gender: formVal.gender,
      minAge: formVal.minAge,
      maxAge: formVal.maxAge,
      date: formVal.date.formatted
    }
    if(isAdd === 1) {
      currUrl = 'organizer/addDivision'
    } else if(isAdd === 2) {
      currUrl = 'organizer/editDivision'
      addData['divisionId'] = this.updateData.currId
    }
    this.service.postApi(currUrl, addData, 1).subscribe(response => {
      if(response.responseCode == 201 || response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage)
        $(`#orgMenuCompAddDivision`).modal('hide')
        this.getDivisionListApi()
      }
    })
  }

  goBack() {
    $(`#orgMenuCompAddDivision`).modal('hide')
    window.history.back()
  }

  getDivisionListApi() {
    let data = {
      userId: this.userDetails._id,
      page: this.page.currPage,
      limit: this.page.limit,
      search: this.page.search
    }
    this.service.postApi(`organizer/getDivision`, data, 1).subscribe(response => {
      if(response.responseCode == 200) {
        this.divisionData = response.result
      }
    })
  }

  onPageChange(pageNo) {
    this.page.currPage = pageNo;
    this.getDivisionListApi()
  }
  onSearch(val, event) {
    this.page.currPage = 1
    if(val === 1) {
      if(!this.page.search || event.keyCode == 13)
        this.getDivisionListApi()
    } else if(val === 2)
    this.getDivisionListApi()
  }

  onLimitChange() {
    this.page.currPage = 1
    this.page.limit = Number(this.page.entryLimit);
    this.getDivisionListApi()
  }

  deleteDivisionModal(currId) {
    this.updateData.currId = currId
    $(`#orgMenuCompDeleteDivision`).modal({backdrop: 'static'})
  }
  onDeleteDivision() {
    let data = {
      userId: this.userDetails._id,
      divisionId: this.updateData.currId
     }
    this.service.postApi(`organizer/deleteDivision`, data, 1).subscribe(response => {
      if(response.responseCode == 204) {
        this.service.toastrSucc(response.responseMessage)
        $(`#orgMenuCompDeleteDivision`).modal('hide')
        this.getDivisionListApi()
      }
    })
  }

  editDivisionModal(currId) {
    this.updateData = Object.assign({}, { isAddDivision: false, currId: currId })
    let data = {
      userId: this.userDetails._id,
      divisionId: this.updateData.currId
    }
    this.service.postApi(`organizer/getADivision`, data, 1).subscribe(response => {
      if(response.responseCode == 200) {
        let divisionData = response.result
        let date = new Date(divisionData.date)
        this.addDivisionForm.patchValue({
          divisionName: divisionData.divisionName,
          sports: divisionData.sports,
          gender: divisionData.gender,
          minAge: divisionData.minAge,
          maxAge: divisionData.maxAge,
          date:  {
            date: {
              year: date.getFullYear(),
              month: date.getMonth() + 1,
              day: date.getDate()
            },
            formatted: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
          }
          
        })
        $(`#orgMenuCompAddDivision`).modal({backdrop: 'static'})
      }
    })
    
    
  }
}
