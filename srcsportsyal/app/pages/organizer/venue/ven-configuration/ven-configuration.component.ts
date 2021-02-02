import { GlobalConstant } from '../../../../global/global.constant';
import { Component, OnInit, FormGroup, FormBuilder, Validators, MainService, Router } from '../../../../index';

declare var $: any;
@Component({
  selector: 'app-ven-configuration',
  templateUrl: './ven-configuration.component.html',
  styleUrls: ['./ven-configuration.component.css']
})
export class VenConfigurationComponent implements OnInit {
  addSportForm: FormGroup;
  sportId: any;
  status: any = '';
  currUrl: string;
  sportsList: any = { docs: [] };
  currTab: string;
  constructor(private fb: FormBuilder, private service: MainService) { }
  userDetails: any = {};
  ImageBase64 = "assets/images/user-img.png";
  page: any = { currPage: 1, limit: GlobalConstant.paginationLimit, search: '', limitChangeArr: GlobalConstant.limitChangeArr, entryLimit: GlobalConstant.limitChangeArr[0] };
  ngOnInit() {
    this.addSportForm = this.fb.group({
      sportName: ['', Validators.required],
      sportsType: ['', Validators.required]
    })
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.currUrl = 'organizer/getSportVenue'
    this.currTab = 'Sports'
    this.getSportsListApi()
  }
  get gSportF() {
    return this.addSportForm.controls;
  }

  /*********************************************** API INTEGRATION TO GET SPORTS LIST ********************************************/
  getSportsListApi() {
    let sportsData = {
      "organizerId": this.userDetails._id,
      "status": '',
      "page": this.page.currPage,
      "limit": this.page.limit,
      "search": this.page.search
    }

    this.service.postApi(this.currUrl, sportsData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.sportsList = response.result
      }
    })
  }
  /*********************************************************** END ****************************************************************/

  onPageChange(pageNo) {
    this.page.currPage = pageNo;
    this.getSportsListApi()
  }

  onLimitChange() {
    this.page.currPage = 1
    this.page.limit = Number(this.page.entryLimit);
    this.getSportsListApi()
  }

  filterSportFun(filterVal) {
    this.page.currPage = 1
    this.status = filterVal
    this.getSportsListApi()
  }

  onSearch(val, event) {
    this.page.currPage = 1
    if (val === 1) {
      if (!this.page.search || event.keyCode == 13)
        this.getSportsListApi()
    } else if (val === 2)
      this.getSportsListApi()
  }

  tabChangeFun(tab) {
    this.currTab = tab
  }

  deleteSportsModal(currId) {
    this.sportId = currId
    $(`#editVenueSports`).modal({ backdrop: 'static' })
  }

  // ********************************* Delete Sport on modal******************************************************* //
  onDeleteSport() {
    let sportsData = {
      "organizerId": this.userDetails._id,
      "venueSportId": this.sportId
    }

    this.service.postApi('organizer/deleteSports', sportsData, 1).subscribe(response => {
      if (response.responseCode == 204) {
        this.service.toastrSucc(response.responseMessage)
        $(`#editVenueSports`).modal('hide')
        this.getSportsListApi()
      } else {
        this.service.toastrErr(response.responseMessage)
        $(`#editVenueSports`).modal('hide')
      }
    })
  }
  // **************************************** END ******************************************************** //

  // ************************************** Get a particular Sport detail for edit on modal ********************************* //
  editSportsModal(id) {
    this.sportId = id
    $(`#edit_sport`).modal({ backdrop: 'static' })
    let sportsData = {
      "organizerId": this.userDetails._id,
      "venueSportId": this.sportId
    }

    this.service.postApi('organizer/getParticularSport', sportsData, 1).subscribe(response => {
      if (response.responseCode == 200) {
        let sportData = response.result[0]
        this.addSportForm.patchValue({
          sportName: sportData.sportName,
          sportsType: sportData.status,
        })
        this.ImageBase64 = sportData.sportIcon
        $(`#edit_sport`).modal({ backdrop: 'static' })
      }
    })
  }
  // **************************************** END ******************************************************** //

  // ********************************* Update Sport on modal******************************************************* //
  updateSportsModal() {
    $(`#edit_sport`).modal({ backdrop: 'static' })
    let sportsData = {
      "organizerId": this.userDetails._id,
      "venueSportId": this.sportId,
      "sportIcon": this.ImageBase64,
      "sportName": this.addSportForm.value.sportName,
      "status": this.addSportForm.value.sportsType
    }

    if (!this.ImageBase64.length) {
      this.service.toastrErr('Please upload Sports Icon')
    } else {
      this.service.postApi('organizer/editVenueSport', sportsData, 1).subscribe(response => {
        if (response.responseCode == 201) {
          this.service.toastrSucc(response.responseMessage)
          $(`#edit_sport`).modal('hide')
          this.getSportsListApi()
        }
      })
    }
  }
  // **************************************** END ******************************************************** //


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


}
