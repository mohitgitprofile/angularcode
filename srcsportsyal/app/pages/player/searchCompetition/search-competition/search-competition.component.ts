import { Component, OnInit, MainService, Router   } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant'
@Component({
  selector: 'app-search-competition',
  templateUrl: './search-competition.component.html',
  styleUrls: ['./search-competition.component.css']
})
export class SearchCompetitionComponent implements OnInit {
  userDetails: any = {};
  bodyData: any = {};
  list: any = { sponsorList: {}, competitionList: {}, limitChangeArr: GlobalConstant.limitChangeArr, limit: GlobalConstant.paginationLimit, statusList: GlobalConstant.statusArr };
  limitChange: any = GlobalConstant.limitChangeArr[0];
  filterCompStatus: any;
  filtersport: any;
  filterfollowStatus: any;
  sportsList: any = [];
  dropdownSettings: any = GlobalConstant.multidropDownSettings

  constructor(private service: MainService, public router: Router) { }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.bodyData = {
      'userId': this.userDetails._id,
      'filterFields': {},
      'page': 1,
      'limit': this.list.limit
    }
    this.filterCompStatus = ""
    this.filterfollowStatus = ""
    this.filtersport = ""
    this.getCompetitionApi();
    this.sportsList = [
      { item_id: 1, item_text: 'Basketball' },
      { item_id: 2, item_text: 'Badminton' },
      { item_id: 3, item_text: 'Generic' },
      { item_id: 4, item_text: 'Cricket' },
      { item_id: 5, item_text: 'Swimming' },
      { item_id: 6, item_text: 'Volleyball' },
      { item_id: 7, item_text: 'Table Tennis' },
      { item_id: 8, item_text: 'Soccer' }
    ]
  }

  // ************ get competition list Api **************************************************************************************** //
  getCompetitionApi() {
    return new Promise((resolve, reject) => {
      this.service.postApi('player/competition/filterCompetitions', this.bodyData, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 200) {
          this.list.competitionList = Response[`result`]
          resolve(true)
        }
      })
    })
  }
  // ************ End get competition list Api **************************************************************************************** //

  applyFilter() {
    this.bodyData.filterFields = {
      'status': this.filterCompStatus,
      'sports': this.filtersport.length ? this.filtersport.map(item => item.item_text) : '',
      'followStatus': this.filterfollowStatus
    }
    this.getCompetitionApi();
  }

  // ************ Unfollow competition Api **************************************************************************************** //
  unfollow(data) {
    let unfollowData = {
      "userId": this.userDetails._id,
      "competitionId": data._id
    }
    return new Promise((resolve, reject) => {
      this.service.postApi('player/competition/unFollowCompetition', unfollowData, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 204) {
          this.service.toastrSucc(responseList.responseMessage)
          this.getCompetitionApi();
          resolve(true)
        }
      })
    })
  }
  // ************ End unfollow competition Api **************************************************************************************** //

  // ************ Follow competition Api **************************************************************************************** //
  follow(data) {
    let unfollowData = {
      'userId': this.userDetails._id,
      'competitionId': data._id
    };
    return new Promise((resolve, reject) => {
      this.service.postApi('player/competition/followCompetition', unfollowData, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] === 200) {
          this.service.toastrSucc(responseList.responseMessage);
          this.getCompetitionApi();
          resolve(true);
        }
      });
    });
  }
  // ************ End follow competition Api **************************************************************************************** //

  // ************ competition detail **************************************************************************************** //
  competitionDetail(data) {
    var compId = data._id
    var orgId = data.organizer._id
    if (data.playerFollow == 'APPROVED') {
      this.router.navigate(['/player/summary', compId, orgId])
    }
  }
  // ************ End competition detail **************************************************************************************** //

  changePage(data) {
    this.bodyData.page = data
    this.bodyData.limit = this.list.limit
    this.getCompetitionApi();
  }

  changeLimit() {
    this.bodyData.limit = Math.floor(this.limitChange)
    this.bodyData.page = 1
    this.getCompetitionApi();
  }

  onSearch(val, event) {
    this.bodyData.page = 1
    if (val === 1) {
      if (!this.bodyData.filterFields.search || event.keyCode == 13)
        this.getCompetitionApi()
    } else if (val === 2)
      this.getCompetitionApi()
  }
}
