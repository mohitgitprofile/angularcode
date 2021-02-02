import { Component, OnInit, FormGroup, FormBuilder, Validators, MainService } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';

declare var $: any;
@Component({
  selector: 'app-menu-comp-conf-sports',
  templateUrl: './menu-comp-conf-sports.component.html',
  styleUrls: ['./menu-comp-conf-sports.component.css']
})
export class MenuCompConfSportsComponent implements OnInit {
  list: any = { sportsTypeArr: GlobalConstant.sportsTypeArr, sportsNameArr: GlobalConstant.sportsNameArr };
  sportsData: any = {docs: []};
  addSportForm: FormGroup;
  userDetails: any = {};
  page: any = { currPage: 1, limit: GlobalConstant.paginationLimit, search: '', limitChangeArr: GlobalConstant.limitChangeArr, entryLimit: GlobalConstant.limitChangeArr[0] }
  updateData: any = {isAddSport: false, currId: ''}
  constructor(private fb: FormBuilder, private service: MainService) { }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.addSportForm = this.fb.group({
      sportsName: ['', Validators.required],
      sportsType: ['', Validators.required]
    })
    this.getSportsListApi()

  }

  getSportsListApi() {
    let data = {
      userId: this.userDetails._id,
      page: this.page.currPage,
      limit: this.page.limit,
      search: this.page.search
    }
    this.service.postApi(`organizer/getSport`, data, 1).subscribe(response => {
      if(response.responseCode == 200) {
        this.sportsData = response.result
      }
    })
  }
  addSportModal() {
    this.updateData.isAddSport = true
    this.addSportForm.reset()
    this.addSportForm.patchValue({
      sportsType: '',
      sportsName: ''
    })
    $(`#orgMenuCompAddSport`).modal({backdrop: 'static'});
  }
  
  onAddSport(isAdd) {
    let currUrl = ''
    let addData = {
      userId: this.userDetails._id,
      sportName: this.addSportForm.value.sportsName,
      sportType: this.addSportForm.value.sportsType
    }
    if(isAdd === 1) 
      currUrl = 'organizer/addSport'
    if(isAdd === 2) {
      addData['sportId'] =  this.updateData.currId
      currUrl = 'organizer/editSport'
    }  
    this.service.postApi(currUrl, addData, 1).subscribe(response => {
      if(response.responseCode == 201 || response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage)
        $(`#orgMenuCompAddSport`).modal('hide');
        this.getSportsListApi()
      }
    })
  }
  get gSportF() {
    return this.addSportForm.controls;
  }
  onPageChange(pageNo) {
    this.page.currPage = pageNo;
    this.getSportsListApi()
  }
  onSearch(val, event) {
    this.page.currPage = 1
    if(val === 1) {
      if(!this.page.search || event.keyCode == 13)
        this.getSportsListApi();
    } else if(val === 2)
      this.getSportsListApi()
  }
  editSportModal(sportId) {
    this.updateData = Object.assign({}, { isAddSport: false, currId: sportId })
    let data = {
     sportId: sportId,
     userId: this.userDetails._id
    }
    this.service.postApi(`organizer/getASport`, data, 1).subscribe(response => {
      if(response.responseCode == 200) {
        let sportDet = response.result
        this.addSportForm.patchValue({
          sportsName: sportDet.sportName,
          sportsType: sportDet.sportType
        })
        $(`#orgMenuCompAddSport`).modal({backdrop: 'static'});
      }
    })
  }

  deleteSportModal(currId) {
    this.updateData.currId = currId
    $(`#orgMenuCompDeleteSport`).modal({backdrop: 'static'})
  }

  // ************  Delete Sport Api ************** //
  onDeleteSport() {
    let data = {
      sportId: this.updateData.currId,
      userId: this.userDetails._id
     }
    this.service.postApi(`organizer/deleteSport`, data, 1).subscribe(response => {
      if(response.responseCode == 204) {
        this.service.toastrSucc(response.responseMessage)
        $(`#orgMenuCompDeleteSport`).modal('hide')
        this.getSportsListApi()
      }
    })
  }
  // ************  End Delete Sport Api ************** //
  onLimitChange() {
    this.page.currPage = 1
    this.page.limit = Number(this.page.entryLimit);
    this.getSportsListApi()
  }
}
