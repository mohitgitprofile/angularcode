import { Component, OnInit, MainService, ActivatedRoute, FormGroup, Validators, FormBuilder } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ven-dashboard',
  templateUrl: './ven-dashboard.component.html',
  styleUrls: ['./ven-dashboard.component.css']
})
export class VenDashboardComponent implements OnInit {
  upcomingBooking: any = [];
  latestBooking: any = [];
  bookingToday: any = {};
  bookingNextWeek: any = {};
  venueList: any = [];
  organizerId: any;
  currency: any;
  venueId: any;
  userDetail: any = {};
  venueDetail: any = {};
  bookingStatus: any = [];
  constructor(private service: MainService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.userDetail = JSON.parse(this.service.getStorage('userDetailYala'))
    this.currency = this.service.currencyLogo
    window.scrollTo(0, 0)
  }

  ngOnInit() {
    this.getVenueListApi();
  }

  onVenueSelect() {
    this.getDashboardDataApi();
  }


  /*********************************************** API INTEGRATION TO GET VENUE LIST ********************************************/
  getVenueListApi() {
    this.service.getApi('venue/getVenueWithoutPagination?organizerId=' + this.userDetail._id, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.venueList = response.result
        if (this.venueList.length) {
          this.venueId = this.venueList[0]._id;
          this.getDashboardDataApi()
        }
      }
    })
  }
  /**************************************************************** END *********************************************************/

  /******************************************* API INTEGRATION TO GET DASHBOARD DATA ********************************************/
  getDashboardDataApi() {
    this.bookingNextWeek = {};
    this.upcomingBooking = [];
    this.latestBooking = [];
    this.service.getApi('venue/getDashboardData?venueId=' + this.venueId + '&organizerId=' + this.userDetail._id, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.bookingToday = response.result[0].bookingToday
        this.bookingNextWeek = response.result[1].bookingNextWeek
        this.latestBooking = response.result[2].latestBooking.data
        let array = []
        if (this.bookingNextWeek.data.length > 0) {
          array = this.bookingNextWeek.data
          if (array.length > 5) {
            array.length = 5;
          }
          this.upcomingBooking = array
        }
      }
    })
  }
  /**************************************************************** END *********************************************************/

}
