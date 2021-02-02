import { Component, OnInit, FormGroup, FormBuilder, Validators, MainService, Router, ActivatedRoute } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
@Component({
  selector: 'app-venue-player-header',
  templateUrl: './venue-player-header.component.html',
  styleUrls: ['./venue-player-header.component.css']
})
export class VenuePlayerHeaderComponent implements OnInit {

  items: any = [];
  venueImages: any = [];
  currUrl: string;
  venueId: any;
  organizerId: any;
  userDetails: any;
  constructor(private fb: FormBuilder, private service: MainService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {

    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    let currRoute = this.router.url
    let currPage = currRoute.split("/");
    this.currUrl = currPage[2]
    this.organizerId = this.userDetails._id;
    this.route.params.subscribe(async params => {
      this.venueId = params['id']
    })
    this.getVenueDetailApi()
  }

  /************************************************** GET VENUE DETAIL  API ********************************************************/
  getVenueDetailApi() {
    let venueData = {
      "playerId":this.userDetails._id
    }
    this.service.postApi('venue/getDetailOfAVenue?venueId=' + this.venueId, venueData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        let venueDetail = response.result
        this.venueImages = venueDetail.images
      }
    })
  }
  /********************************************************** END ******************************************************************/

}
