import { Component, OnInit, FormGroup, FormBuilder, Validators, MainService, Router, ActivatedRoute } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
declare var $: any;

@Component({
  selector: 'app-ven-list',
  templateUrl: './ven-list.component.html',
  styleUrls: ['./ven-list.component.css']
})
export class VenListComponent implements OnInit {
  sportsVal: boolean = false;
  venueId: any;
  userDetails: any = {};
  venueList: any = { docs: [] };
  constructor(private fb: FormBuilder, private service: MainService, private route: ActivatedRoute, private router: Router) { }
  page: any = { currPage: 1, limit: GlobalConstant.paginationLimit, search: '', limitChangeArr: GlobalConstant.limitChangeArr, entryLimit: GlobalConstant.limitChangeArr[0] };

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.getVenueListApi()
    this.getSportsList()
  }

  // *************************************** API TO GET SPORTS LIST ********************************************** //
  getSportsList() {

    let sportsData = {
      "organizerId": this.userDetails._id
    }

    this.service.postApi('organizer/getVenueSportWithoutPagination', sportsData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        if (!response.result.length) {
          this.sportsVal = true
        }
      }
    })
  }
  // ************************************************ END ********************************************************* //

  getVenueListApi() {
    let venueData = {
      "organizerId": this.userDetails._id,
      "page": this.page.currPage,
      "limit": this.page.limit,
      "search": this.page.search
    }
    this.service.postApi('venue/getVenueWithPagination', venueData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.venueList = response.result
      }
    })
  }

  venueDetailFun() {
    this.router.navigate(['organizer/venueDetail']);
  }

  deleteVenueModal(currId) {
    this.venueId = currId
    $(`#deleteVenue`).modal({ backdrop: 'static' })
  }

  // ********************************* Delete Venue on modal******************************************************* //
  onDeleteVenue() {
    this.service.getApi('venue/deleteVenue?venueId=' + this.venueId, 1).subscribe(response => {
      if (response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage)
        $(`#deleteVenue`).modal('hide')
        this.getVenueListApi()
      }
    })
  }
  // **************************************** END ******************************************************** //

  onPageChange(pageNo) {
    this.page.currPage = pageNo;
    this.getVenueListApi()
  }

  onLimitChange() {
    this.page.currPage = 1
    this.page.limit = Number(this.page.entryLimit);
    this.getVenueListApi()
  }

  onSearch(val, event) {
    this.page.currPage = 1
    if (val === 1) {
      if (!this.page.search || event.keyCode == 13)
        this.getVenueListApi()
    } else if (val === 2)
      this.getVenueListApi()
  }

}
