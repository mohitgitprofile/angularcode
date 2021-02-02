import { Component, OnInit, FormGroup, FormBuilder, Validators, MainService, Router, ActivatedRoute } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
declare var $: any;

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.css']
})
export class VenueDetailsComponent implements OnInit {

  venueId: any;
  userDetails: any = {};
  venueDetail: any = {};
  userDetail: any = {};
  constructor(private fb: FormBuilder, private service: MainService, private route: ActivatedRoute, private router: Router) { }
  page: any = { currPage: 1, limit: GlobalConstant.paginationLimit, search: '', limitChangeArr: GlobalConstant.limitChangeArr, entryLimit: GlobalConstant.limitChangeArr[0] };

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.route.params.subscribe(async params => {
      this.venueId = params['id']
    })
    this.getVenueDetailApi()
  }

  getVenueDetailApi() {
    let venueData = {
      "playerId": this.userDetail._id
    }
    this.service.postApi('venue/getDetailOfAVenue?venueId=' + this.venueId, venueData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.venueDetail = response.result
      }
    })
  }

}
