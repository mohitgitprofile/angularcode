import { Component, OnInit, FormGroup, FormBuilder, Validators, MainService, Router, ActivatedRoute } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
declare var $: any;

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css']
})
export class VenuesComponent implements OnInit {

  distance: any = "";
  filterfollowStatus: any = "";
  currentLong: any;
  currentLat: any;
  venueList: any = { docs: [] };
  venueDetail: any;
  currency: any;
  constructor(private fb: FormBuilder, private service: MainService, private router: Router, private route: ActivatedRoute) { }
  userDetails: any = {};
  page: any = { currPage: 1, limit: GlobalConstant.paginationLimit, search: '', limitChangeArr: GlobalConstant.limitChangeArr, entryLimit: GlobalConstant.limitChangeArr[0] };
  ngOnInit() {
    this.service.setStorage('venueAverageRating', JSON.stringify({ averageRating: '' }))
    this.service.setStorage('venueUserRating', JSON.stringify({ userRating: '' }))
    this.currency = this.service.currencyLogo
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.getVenueListApi()
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      this.service.toastrErr("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;
  }

  selectDistance() {
    this.findMe()
  }

  /*********************************************** API INTEGRATION TO GET SLOT LIST ********************************************/
  getVenueListApi() {
    let venueData = {
      "playerId": this.userDetails._id,
      "page": this.page.currPage,
      "limit": this.page.limit,
      "search": this.page.search,
      "lng": this.currentLong,
      "lat": this.currentLat,
      "maxDistance": this.distance,
      "followStatus": this.filterfollowStatus
    }

    this.service.postApi('venue/getAllVenueWithPagination', venueData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.venueList = response.result
      }
    })
  }
  /********************************************************** END ******************************************************************/


  applyFilter() {
    this.page.currPage = 1
    this.getVenueListApi();
  }

  // ***************************************** Follow competition Api *********************************************************** //
  follow(data) {
    let followData = {
      "playerId": this.userDetails._id,
      "venueId": data._id
    }
    return new Promise((resolve, reject) => {
      this.service.postApi('venue/followVenue', followData, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 200) {
          this.service.toastrSucc(responseList.responseMessage)
          this.getVenueListApi();
          resolve(true)
        }
      })
    })
  }
  // ***************************************** End follow competition Api *************************************************** //


  // ************************************************* Unfollow competition Api ********************************************* //
  unfollow(data) {
    let unfollowData = {
      "playerId": this.userDetails._id,
      "venueId": data._id
    }
    return new Promise((resolve, reject) => {
      this.service.postApi('venue/unFollowVenue', unfollowData, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 200) {
          this.service.toastrSucc(responseList.responseMessage)
          this.getVenueListApi();
          resolve(true)
        }
      })
    })
  }
  // ************************************************* End unfollow competition Api ******************************************** //

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

  venueDetailFun(data) {
    if (data.playerFollowStatus.followStatus == 'APPROVED') {
      this.router.navigate(['player/venueDetail/' + data._id]);
    }
  }
}
